import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { useState } from "react";

export default function Test (){
    const usersCollectionRef = collection(db, "user");
       
// async function createAnewUser(key : string) {
//   const [campUsers, setCampUsers] = useState<any>([]);

// //     const data = await getDocs(usersCollectionRef);
// //     const users = data.docs.map(
// //         (doc) =>
// //           ({
// //             ...doc.data(),
// //           })
// //       ).filter((user) =>  user.code.split("-")[2] === key)
// //       const newId = users[users.length - 1].id + 1
     

// //   }

// //   function generateUserCode(id :number, key: string) {
// //     if (id <= 1500){
// //     const idString = id.toString().padStart(4, '0'); // Ensures the ID is zero-padded to 4 digits
// //     const randomString = generateRandomString(); // Generates a random string
// //     const code = `xenon-${randomString}-${key}${idString}`;
// //     console.log("code", code)
// //     return code;
// // }else{
// //     console.log("can't generate code")
// // }
// //   }
  
// //   function generateRandomString(length = 5) {
// //     const chars = 'adeghijklmnoqrstuvwxyz0123456789ADEGHIJKLMNOQUSTUVWXYX';
// //     let result = '';
// //     for (let i = 0; i < length; i++) {
// //       result += chars.charAt(Math.floor(Math.random() * chars.length));
// //     }
// //     return result;
// //   }
  
// //   // Example usage:
// //   const userId = 5;
// //   const key = "BC";
// //   const userCode = generateUserCode(userId, key);
// //   console.log(userCode); // Outputs something like: "xenon-abc12-BC0005"
  

// };
const checkAdminAndFetchUsers = async () => {
   
      // Fetch all users from Firestore
      const usersCollection = collection(db, "user");
      const userSnapshot = await getDocs(usersCollection);
      const usersList = userSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("camp users", usersList)
   
  }
  checkAdminAndFetchUsers()
return(
  
  <div >CLICK</div>
)

  
  

}