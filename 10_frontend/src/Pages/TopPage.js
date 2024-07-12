import React from 'react'
import { Box, Grid, Paper } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import axios from 'axios';
import { URL } from '../data/constants';



const TopPage = () => {
  const [x, setX] = React.useState([])
  const [y, setY] = React.useState([])
  const [topPageTableData, setTopPageTableData] = React.useState([])
  const [achieveDay, setAchieveDay] = React.useState(0)

  React.useEffect(() => {
    const get_oneweek_calories = async() => {
      const res = await axios.get(URL + "/get_oneweek_calories")
      setX(res.data.dates)
      setY(res.data.calories)
    }
    const get_today_nutrition = async() => {
      const res = await axios.get(URL + "/get_today_nutrition")
      setTopPageTableData(res.data)
    }
    const get_achievement_day = async() => {
      const res = await axios.get(URL + "/get_achievement_day")
      setAchieveDay(res.data)
    }
    get_oneweek_calories()
    get_today_nutrition()
    get_achievement_day()
   }, [])

  return (
    <Grid container alignItems="center" spacing={2} width="95%" marginLeft="2.5%">
      <Grid item xs={8}>
        <Paper sx={{marginTop: "20px", height: "330px"}}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h6">
              直近の摂取カロリー
            </Typography>
            <LineChart
              xAxis={[{ scaleType: 'point', data: x }]}
              series={[
                {
                  data: y,
                },
              ]}
              width={500}
              height={300}
            />
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper sx={{marginTop: "20px", height: "330px"}}>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
            <Typography variant="h6">
              連続目標達成記録
            </Typography>
            <Typography variant="h3" color="blue" fontWeight="bold">
              {achieveDay}日
            </Typography>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{margin: "0 auto", marginBottom: "20px"}}>
            <Typography variant="h6" sx={{padding: "10px"}}>
              本日の栄養摂取量
            </Typography>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>成分</TableCell>
                <TableCell align="right">摂取量</TableCell>
                <TableCell align="right">目標差分</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topPageTableData.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.element}</TableCell>
                  <TableCell align="right">{row.quantity}</TableCell>
                  <TableCell align="right">
                    {
                      row.border === "high" ?
                        <Typography color="red">
                          {row.diff}
                        </Typography>
                      :
                      row.border === "row" ?
                      <Typography color="blue">
                        {row.diff}
                      </Typography>
                      :
                      <Typography color="black">
                          {row.diff}
                      </Typography>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default TopPage