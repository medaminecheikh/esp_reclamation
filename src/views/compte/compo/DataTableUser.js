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



function DataTableUser( { Users, onSelect, selectedRowIndex }) {

  const stylechip = {
    backgroundColor: '#44a6c6 ', // Light blue color
    color: 'white', // White text for better contrast
    fontSize: '14px', // Adjust font size as needed (optional)
    
    '&:hover': {
      backgroundColor: '#4465c6', // Darker blue on hover
    },
  };
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
      const handleUserSelect = (user, index) => {
        onSelect(user, index);
      };

    
  
  return (

    <div style={{flexGrow:1 ,alignItems:'center'}} >
      <TableContainer component={Paper} style={{ maxHeight: 400 }} >
      <Table stickyHeader  size="small" aria-label="simple table">
        <TableHead>
        <TableRow >
             <TableCell align="center" colSpan={3}><TextField id="standard-basic" label="Search by Email" variant="standard" /></TableCell>
             <TableCell align="center"  colSpan={3}> <TextField id="Role-basic" label="Search by Role" variant="standard" /></TableCell>
        </TableRow >
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Dernier Modification</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody  style={{overflow:'auto'}}> 
        {Users?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
            <TableRow
            onDoubleClick={() => handleUserSelect(row, index)}
            style={{ cursor: 'pointer', backgroundColor: selectedRowIndex  === index ? '#cbe6ef' : 'transparent' }} // Change background color of selected row

              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell  align="center">{row.role.name==='admin' ? <Chip label="admin" sx={{ fontSize: '14px', paddingX:1}}  size="small" /> :
              <Chip label="user" sx={{fontSize: '14px',paddingX:1}} size="small" /> }</TableCell>
              <TableCell align="center">{row.enabled ?
              <Chip label="Activer" sx={stylechip}  size="small"  deleteIcon={<DoneIcon />}/> : 
              <Chip label="Désactiver" sx={stylechip} size="small"   deleteIcon={<DoneIcon />}/>}</TableCell>
              <TableCell align="right">{row.updatedAt}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={Users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </div>
  )
}

export default DataTableUser