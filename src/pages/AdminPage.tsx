import { onAuthStateChanged } from "firebase/auth";
import DataTable from "../components/DataTable";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { config } from "../config";

export default function AdminPage () {
const navigate = useNavigate();
const baseUrl = config.baseUrl;

    onAuthStateChanged(auth, (user) => {
        if (user) {
          const currentUserEmail = user.email;
          console.log("usereeemmail", currentUserEmail)
          if (currentUserEmail !== "admin@gmail.com"){
            return navigate(`/${baseUrl}/camping/admin/login`)
          }
          
          // ...
        } else {
          // User is signed out
          // ...
          return navigate(`/${baseUrl}/camping/admin/login`)

        }
      });

     
        
    return(
        <div className="container-admin">
             <h1> Camping Users</h1>
             <DataTable />
        </div>
    )
}