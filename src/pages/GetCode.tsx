import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { auth, db } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../config";
import { collection, getDocs, query, where } from "firebase/firestore";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Card1 from "../img/Card(1).png";
import Card2 from "../img/Card(2).png";

import PhotoFrame from "../img/Frame.png";
export default function GetCode() {
    const [click,setClick] = useState(false)
   const {key} = useParams();
   const [bc,setBc] = useState(key == "Bc" ? true : false)
// const bc = key == "Bc" ? true : false;
    const [userCode, setUserCode] = useState("")
    const baseUrl = config.baseUrl;
  const navigate = useNavigate()
 
      onAuthStateChanged(auth, async(user) => {
        if (user) {
          const currentUser =  user.email  ;
          console.log("currentuser", currentUser)
          const currentUserEmail = auth.currentUser && auth.currentUser.email

          const usersCollectionRef = collection(db, "user");
          const userQuery = query(usersCollectionRef, where("email", "==", currentUserEmail));
          const querySnapshot = await getDocs(userQuery);
          querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const codeOfUser = userData.code;
            const registerKey = userData.code.split("-")[2] 
            setBc(registerKey == "BC" ? true : false)
            console.log(`Found user:`,codeOfUser);
            setUserCode(codeOfUser)
            if (registerKey !== key?.toUpperCase()) return alert(`This User is already registered to ${registerKey}`) 
              // Do something with the user data
      
      
          });
          
          
          
          // ...
        } else {
          // User is signed out
          // ...
          return navigate(`/${baseUrl}/camping`)

        }
      });
  //     const getUserCode = async() => {
  //       const currentUser = auth.currentUser

  //       const usersCollectionRef = collection(db, "user");



  //       const data = await getDocs(usersCollectionRef);
  //       const user = data.docs.map(
  //         (doc) =>
  //           ({
  //             ...doc.data(),
  //           })
  //       ).find((user) =>  user.email === currentUser?.email)
    
  //       user && setUserCode(user.code)
  //       console.log("user",  user && user.code)
  //   return user;
  //  }
  //  getUserCode();

   const getUserCode = async() => {
    const currentUserEmail = auth.currentUser && auth.currentUser.email

    const usersCollectionRef = collection(db, "user");
    const userQuery = query(usersCollectionRef, where("email", "==", currentUserEmail));
    const querySnapshot = await getDocs(userQuery);
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      const codeOfUser = userData.code;
        console.log(`Found user:`,codeOfUser);
        setUserCode(codeOfUser)
        // Do something with the user data


    });

}

   const handleCopy = () => {
    navigator.clipboard.writeText(userCode).then(() => {
      alert(`Copied to clipboard: ${userCode}`);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };
    return(
      <div className="App">
      <div className="business-card">
        {/* <div className="image-placeholder">
          <div className="image" >640 X 420</div>

        </div> */}
        <img className="image-placeholder" src={bc ? Card2 :PhotoFrame  }/>

        <div className="content">
        {bc ?  <h2>Business Card</h2> :
        <h2>Photo Frame</h2>
        }
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget pharetra mauris. Vestibulum posuere, nulla quis auctor ullamcorper, nisi lorem gravida sapien.</p>
          <div className="buttons">
            <button className="learn-more">Learn More</button>
           {click  ?<> <button className="get-code" >{userCode}</button> <ContentCopyIcon sx={{height:"100%"}} onClick={handleCopy}/></>
          :  <button className="get-code" onClick={() => setClick(true)}>Get Code</button> 
}
          </div>
        </div>
      </div>
    </div>
  );
}
