import React,{useState} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip, TablePagination, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import { green, grey } from '@mui/material/colors';



function DataTableUser( props) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

  console.log("props data",props)
  return (

    <div >
      <TableContainer component={Paper} style={{ maxHeight: 400 }}>
      <Table stickyHeader  sx={{ maxWidth: 650 }} size="small" aria-label="simple table">
        <TableHead>
        <TableRow>
             <TableCell align="center" colSpan={3}><TextField id="standard-basic" label="Search by Email" variant="standard" /></TableCell>
             <TableCell align="center" sx={{ marginBottom:'30px'}} colSpan={3}> <TextField id="Role-basic" label="Search by Role" variant="standard" /></TableCell>
        </TableRow >
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Dernier Modification</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody  style={{overflow:'auto'}}> 
        {props.Users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="right">{row.role.name}</TableCell>
              <TableCell align="right">{row.enabled ?
              <Chip label="Activer" sx={{color:green[900]}} size="small"  deleteIcon={<DoneIcon />}/> : 
              <Chip label="Desactiver" sx={{color:grey[900]}} size="small" variant="outlined"  deleteIcon={<DoneIcon />}/>}</TableCell>
              <TableCell align="right">{row.updatedAt}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={props.Users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  )
}

export default DataTableUser