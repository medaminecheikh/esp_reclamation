import React from 'react'
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'role', headerName: 'Role', width: 90},
    {
      field: 'status',
      headerName: 'Status',
    
      width: 90,
    },
      {
        field: 'dateU',
        headerName: 'Dernier Modification',
       
        width: 150,
      },
   
  ];
  
  const rows = [
    { id: 1, email: 'Snow', role: 'Jon', status: 35 },
    { id: 2, email: 'Lannister', role: 'Cersei', status: 42 },
    { id: 3, email: 'Lannister', role: 'Jaime', status: 45 },
    { id: 4, email: 'Stark', role: 'Arya', status: 16 },
    { id: 5, email: 'Targaryen', role: 'Daenerys', status: null },
    { id: 6, email: 'Melisandre', role: null, status: 150 },
    { id: 7, email: 'Clifford', role: 'Ferrara', status: 44 },
    { id: 8, email: 'Frances', role: 'Rossini', status: 36 },
    { id: 9, email: 'Roxie', role: 'Harvey', age: 65 },
  ];


function DataTableUser({Users}) {

    console.log(Users.length);
  return (

    <div style={{ height: 400 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        rowSelection
    
      />
    </div>
  )
}

export default DataTableUser