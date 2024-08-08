import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { config } from "../config";
import { collection, getDocs, query, where } from "firebase/firestore";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
export default function GetCode() {
    const [click,setClick] = useState(false)
    const [userCode, setUserCode] = useState("")
    const baseUrl = config.baseUrl;
  const navigate = useNavigate()
 
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const currentUser =  user.email  ;
          console.log("currentuser", currentUser)
          return currentUser;
          
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
getUserCode();

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
        <div className="image-placeholder">
          <div className="image">640 X 420</div>
        </div>
        <div className="content">
          <h2>Business Card</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget pharetra mauris. Vestibulum posuere, nulla quis auctor ullamcorper, nisi lorem gravida sapien, vitae accumsan dui dolor in urna. Suspendisse non leo ipsum.</p>
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
