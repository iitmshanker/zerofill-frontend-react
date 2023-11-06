import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#608FBE',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories) {
  return { name, calories };
}

export default function CustomizedTables(props) {

  const {statsApiData} = props;
console.log(statsApiData?.session_stats,"statsApiData")
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User Session Selected</StyledTableCell>
            <StyledTableCell align="right">Numbers</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>

               <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                {'Total Rigids'}
              </StyledTableCell>
              <StyledTableCell align="right">{statsApiData?.session_stats?.['^Rigids/Bottles']}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                {'Total Flexibles'}
              </StyledTableCell>
              <StyledTableCell align="right">{statsApiData?.session_stats?.['^Flexibles/Sachets']}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                {'Total Tetrapacks'}
              </StyledTableCell>
              <StyledTableCell align="right">{statsApiData?.session_stats?.['^Tetra Paks/Cartons']}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                {'Objects Processed'}
              </StyledTableCell>
              <StyledTableCell align="right">{statsApiData?.session_stats?.['Objects Processed']}</StyledTableCell>
            </StyledTableRow>
            <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                {'Total Sessions'}
              </StyledTableCell>
              <StyledTableCell align="right">{statsApiData?.session_stats?.['Sessions Selected']}</StyledTableCell>
            </StyledTableRow>
           
        </TableBody>
      </Table>
    </TableContainer>
  );
}


