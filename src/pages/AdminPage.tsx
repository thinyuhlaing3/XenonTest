import { onAuthStateChanged } from "firebase/auth";
import DataTable from "../components/DataTable";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export default function AdminPage () {
const navigate = useNavigate();
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const currentUser =  user.email  ;
          console.log("currentuser", currentUser)
          return currentUser;
          
          // ...
        } else {
          // User is signed out
          // ...
          return navigate("/camping/admin/login")
        }
      });
    return(
        <div className="container-admin">
             <h1> Camping Users</h1>
             <DataTable/>
        </div>
    )
}