import React,{useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Gingerbread', 356, 16.0, 49, 3.9), createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Eclair', 262, 16.0, 24, 6.0),createData('Eclair', 262, 16.0, 24, 6.0),createData('Eclair', 262, 16.0, 24, 6.0),
  ];


function DataTableUser( ) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

  
  return (

    <div >
      <TableContainer component={Paper} style={{ maxHeight: 400 }}>
      <Table stickyHeader  sx={{ maxWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
        <TableRow>
             <TableCell align="center" colSpan={3}>Search by email</TableCell>
                <TableCell align="center" colSpan={3}>By Role</TableCell>
        </TableRow >
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Dernier Modification</TableCell>
            <TableCell align="right">Date Creation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody  style={{overflow:'auto'}}> 
        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  )
}

export default DataTableUser