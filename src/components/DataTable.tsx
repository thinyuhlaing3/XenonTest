import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import {  UserData } from '../type/user';


interface Props{
  data:UserData[]
}


export default function DataTable({ data } :Props) {
const [rowsData, setRowsData] = useState<any>({...data})
console.log("data" ,data)
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20, align:"center", headerAlign:"center",  },
    { field: 'username', headerName: 'Name', width: 180, },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'code', headerName: 'Code', width: 250 },
  ];
// const datakey = 
  // let rows = [{...data, }];
  const updatedData = data.map(da => {
    // Extract the third part of the code and concatenate it with the current id
    const newId = da.code.split("-")[2] +"-"+ da.id;
    
    // Return a new object with the updated id
    return { ...da, id: newId };
});

  
  return (
    <div className="dataGrid">
      <DataGrid
        rows={updatedData} // Use userData as rows
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