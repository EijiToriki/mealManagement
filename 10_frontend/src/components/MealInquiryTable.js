import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

const MealInquiryTable = ({flag, mealHistory}) => {
  return (
    <>
    {
      flag && 
      <TableContainer component={Paper} sx={{width: "90%", margin: "0 auto"}}>
          <Typography variant="h6" sx={{padding: "10px"}}>
            食事履歴
          </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>
              <TableCell>日付</TableCell>
              <TableCell>時間</TableCell>
              <TableCell>料理名</TableCell>
              <TableCell align="right">熱量&nbsp;(kacal)</TableCell>
              <TableCell align="right">タンパク質&nbsp;(g)</TableCell>
              <TableCell align="right">炭水化物&nbsp;(g)</TableCell>
              <TableCell align="right">脂質&nbsp;(g)</TableCell>
              <TableCell align="right">食塩相当量&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mealHistory.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.salt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    }
    </>
  )
}

export default MealInquiryTable