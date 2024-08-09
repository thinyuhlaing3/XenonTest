import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import DataTable from "../components/DataTable";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { config } from "../config";

export default function AdminPage() {
  const navigate = useNavigate();
  const baseUrl = config.baseUrl;
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    const checkAdminAndFetchUsers = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const currentUserEmail = user.email;
          console.log("User Email:", currentUserEmail);
          if (currentUserEmail !== "admin@gmail.com") {
            return navigate(`/${baseUrl}/camping/admin/login`);
          }

          // Fetch all users from Firestore
          const usersCollection = collection(db, "user");
          const userSnapshot = await getDocs(usersCollection);
          const usersList = userSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setUsers(usersList);
          console.log("camp users", usersList)
        } else {
          // User is signed out
          navigate(`/${baseUrl}/camping/admin/login`);
        }
      });
    };

    checkAdminAndFetchUsers();
  }, [navigate, baseUrl]);
  return (
    <div className="container-admin">
      <h1>Camping Users</h1>
      <DataTable data={users} />
    </div>
  );
}
