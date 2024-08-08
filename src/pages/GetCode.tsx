import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function GetCode() {
    const [open,setOpen] = useState(false)
  const navigate = useNavigate()
  const user = auth.currentUser
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const currentUser =  user.email  ;
          console.log("currentuser", currentUser)
          return currentUser;
          
          // ...
        } else {
          // User is signed out
          // ...
          return navigate("/BC/register")

        }
      });
     
    return(
        <>
        <button className="get-code-button">Get Code Button</button>
     {open && 
        <div> xenon-fL8jO-BC0001 </div>
    
     }
     </>
    )
}