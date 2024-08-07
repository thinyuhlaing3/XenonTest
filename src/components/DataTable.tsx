import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { collection, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 20, align:"center", headerAlign:"center",  },
  { field: 'name', headerName: 'Name', width: 180, },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'code', headerName: 'Code', width: 250 },
  { field: 'recieved', headerName: 'Recieved', width: 130 },
];

const rows = [
  { id: 1, name: 'Snow', email: 'snow@gmail.com',code:" xenon-fL8jO-BC0001", recieved:"Done" },
  { id: 2, name: 'Jack', email: 'jack@gmail.com',code: "xenon-LjO3u-BC0002", recieved:"Done" },
  { id: 3, name: 'GaGa', email: 'gaga@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
  { id: 4, name: 'PuPu', email: 'pupu@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
  { id: 5, name: 'Snow', email: 'snow@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
  { id: 7, name: 'SuSu', email: 'susu@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
  { id: 8, name: 'PuPu', email: 'pupu@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
  { id: 9, name: 'Snow', email: 'snow@gmail.com',code:  "xenon-Uc1V2-PF0001", recieved:"Done" },
 
];

export default function DataTable() {
  const [data, setData] = useState();

// async function getDataFromFirebase(){
//   const usersCollectionRef = collection(db, "users");
//     const docSnap = await getDoc(usersCollectionRef);
//     if (docSnap.exists()) {
//       console.log("Document data:", docSnap.data());
//     } else {
//       // docSnap.data() will be undefined in this case
//       console.log("No such document!");
//     }
// }

//   useEffect(() => {
//     getDataFromFirebase()
//     // onValue(usersCollectionRef, (snapshot) => {
//     //   const fetchedData = snapshot.val();
//     //   setData(fetchedData);
//     // });

//   }, []);

  return (
    <div className="dataGrid">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>

  );
}