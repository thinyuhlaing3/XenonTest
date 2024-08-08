import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { UserData } from '../type/user';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 20, align:"center", headerAlign:"center",  },
  { field: 'username', headerName: 'Name', width: 180, },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'code', headerName: 'Code', width: 250 },
];

let rows = [
  { id: 1, username: 'Snow', email: 'snow@gmail.com',code:" xenon-fL8jO-BC0001", recieved:"Done" },
  { id: 2, username: 'Jack', email: 'jack@gmail.com',code: "xenon-LjO3u-BC0002", recieved:"Done" },
  { id: 3, username: 'GaGa', email: 'gaga@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
  { id: 4, username: 'PuPu', email: 'pupu@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
  { id: 5, username: 'Snow', email: 'snow@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
  { id: 7, username: 'SuSu', email: 'susu@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
  { id: 8, username: 'PuPu', email: 'pupu@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
  { id: 9, username: 'Snow', email: 'snow@gmail.com',code:  "xenon-Uc1V2-PF0001", recieved:"Done" },
 
];



export default function DataTable() {
  const [userData, setUserData] = useState();

  const getUser = async () => {
    const usersCollectionRef = collection(db, "user");
    const data = await getDocs(usersCollectionRef);
    
    const users = data.docs.map((doc) => ({
      id: doc.id,      // Ensure each row has a unique id
      ...doc.data()    // Spread the document data
    })) as any
    
    setUserData(users);
    console.log("Fetched users:", users);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="dataGrid">
      <DataGrid
        rows={rows } // Use userData as rows
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}