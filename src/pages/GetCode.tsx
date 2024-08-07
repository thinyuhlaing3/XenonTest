import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react"
import { auth } from "../config/firebase";

export default function GetCode() {
    const [open,setOpen] = useState(false)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          console.log("currentuser",user?.email);
        });
        return unsubscribe;
      }, []);
if (!unsubscribe) return null;


    return(
        <>
        <button className="get-code-button">Get Code Button</button>
     {open && 
        <div> xenon-fL8jO-BC0001 </div>
    
     }
     </>
    )
}