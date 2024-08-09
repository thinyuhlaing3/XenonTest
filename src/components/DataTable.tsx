import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { UserData } from '../type/user';


interface Props{
  data:any
}


export default function DataTable({ data } :Props) {


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 20, align:"center", headerAlign:"center",  },
    { field: 'name', headerName: 'Name', width: 180, },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'code', headerName: 'Code', width: 250 },
  ];
  
  let rows = [
    { id: 1, name: 'Snow', email: 'snow@gmail.com',code:" xenon-fL8jO-BC0001", recieved:"Done" },
    { id: 2, name: 'Jack', email: 'jack@gmail.com',code: "xenon-LjO3u-BC0002", recieved:"Done" },
    { id: 3, name: 'GaGa', email: 'gaga@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
    { id: 4, name: 'PuPu', email: 'pupu@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
    { id: 5, name: 'Snow', email: 'snow@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
    { id: 7, name: 'SuSu', email: 'susu@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
    { id: 8, name: 'PuPu', email: 'pupu@gmail.com',code: "xenon-Uc1V2-PF0001", recieved:"Done" },
    { id: 9, name: 'Snow', email: 'snow@gmail.com',code:  "xenon-Uc1V2-PF0001", recieved:"Done" },
   
  ];
  return (
    <div className="dataGrid">
      <DataGrid
        rows={data } // Use userData as rows
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