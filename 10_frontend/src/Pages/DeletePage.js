import { Alert, Box, Button, FormControl, FormControlLabel, Pagination, Paper, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { URL } from '../data/constants';
import { useSelector } from 'react-redux';

const DeletePage = () => {
  const displayCnt = 5
  const [registeredMeal, setRegisteredMeal] = React.useState([])
  const [registeredFood, setRegisteredFood] = React.useState([])
  const [filteredMeal, setFilteredMeal] = React.useState([])
  const [filteredFood, setFilteredFood] = React.useState([])
  const [radio, setRadio] = React.useState("food")
  const [deleteInfo, setDeleteInfo] = React.useState({})
  const [page, setPage] = React.useState(1)

  const userId = useSelector(state => state.authorize.user_id)

  React.useEffect(() => {
    const get_all_meal_food = async() => {
      const params = {
        user_id: userId
      }
      const res = await axios.get(URL + "/get_all_meal_food", {params})
      setRegisteredMeal(res.data.mealEntities)
      setRegisteredFood(res.data.foodEntities)
      setFilteredFood(res.data.foodEntities.slice(0, displayCnt))
      setFilteredMeal(res.data.mealEntities.slice(0, displayCnt))
    }
    get_all_meal_food()
   }, [])

  const handleRadioChange = (e) => {
    setRadio(e.target.value)
    setPage(1)
  }

  const handleDeleteFood = async(id, name) => {
    try{
      const params = {
        id: id
      }
      await axios.delete(URL + "/delete_one_food", {params})  
      setRegisteredFood(prevRegisteredFood => prevRegisteredFood.filter(food => food.id !== id));

      const newRegisteredFood = registeredFood.filter(food => food.id !== id);
      const newPage = page > Math.ceil(newRegisteredFood.length / displayCnt) ? page - 1 : page;
      
      setFilteredFood(newRegisteredFood.slice(displayCnt * (newPage - 1), displayCnt * newPage));
      setDeleteInfo({ id: id, name: name });
      setPage(newPage);
      setDeleteInfo({
        id: id,
        name: name
      })
    }catch(error){
      console.error(error)
    }
  }

  const handleDeleteMeal = async(id, name) => {
    try{
      const params = {
        id: id
      }
      await axios.delete(URL + "/delete_one_meal", {params})  
      setRegisteredMeal(prevRegisteredMeal => prevRegisteredMeal.filter(meal => meal.id !== id));
      const newRegisteredMeal = registeredMeal.filter(meal => meal.id !== id);
      const newPage = page > Math.ceil(newRegisteredMeal.length / displayCnt) ? page - 1 : page;
      
      setFilteredMeal(newRegisteredMeal.slice(displayCnt * (newPage - 1), displayCnt * newPage));
      setDeleteInfo({ id: id, name: name });
      setPage(newPage);
      setDeleteInfo({
        id: id,
        name: name
      })
    }catch(error){
      console.error(error)
    }
  }

  const handleChangePagination = (e, page) => {
    if(radio === "food"){
      setFilteredFood(registeredFood.slice(displayCnt*(page-1), displayCnt*page))
    }else{
      setFilteredMeal(registeredMeal.slice(displayCnt*(page-1), displayCnt*page))
    }
    setPage(page)
    
  }

  return (
    <>
      {
        deleteInfo.id &&
          <Alert severity="info" onClose={() => {setDeleteInfo({})}}>{`ID: ${deleteInfo.id}、名前：${deleteInfo.name} を削除しました。`}</Alert>
      }
      <Box display="flex" alignItems="center">
        <h3 style={{ marginLeft: "2%" }}>削除</h3>
        <p>：登録済みの食事や料理を削除できます。</p>
      </Box>
      <FormControl sx={{marginLeft: "3%"}}>
        <RadioGroup
          row
          defaultValue="food"
          aria-labelledby="delete-target"
          name="delete-target-radio-buttons-group"
          value={radio}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="food" control={<Radio />} label="料理"  />
          <FormControlLabel value="meal" control={<Radio />} label="食事" />
        </RadioGroup>
      </FormControl>

      {
        radio === 'food' ?
        <Paper sx={{ marginLeft: "45px", marginRight: "30px", marginTop: "5px" }}>
          <TableContainer component={Paper} sx={{margin: "0 auto", marginBottom: "20px"}}>
              <Typography variant="h6" sx={{padding: "10px"}}>
                料理一覧
              </Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>料理名</TableCell>
                  <TableCell align="right">熱量</TableCell>
                  <TableCell align="right">タンパク質</TableCell>
                  <TableCell align="right">脂質</TableCell>
                  <TableCell align="right">炭水化物</TableCell>
                  <TableCell align="right">食塩相当量</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredFood.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.salt}</TableCell>
                    <TableCell align="right"><Button variant="text" color='error' onClick={() => handleDeleteFood(row.id, row.name)}>削除</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        :
        <Paper sx={{ marginLeft: "45px", marginRight: "30px", marginTop: "5px" }}>
          <TableContainer component={Paper} sx={{margin: "0 auto", marginBottom: "20px"}}>
              <Typography variant="h6" sx={{padding: "10px"}}>
                食事一覧
              </Typography>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>摂取日</TableCell>
                  <TableCell>時間</TableCell>
                  <TableCell>料理名</TableCell>
                  <TableCell align="right">熱量</TableCell>
                  <TableCell align="right">タンパク質</TableCell>
                  <TableCell align="right">脂質</TableCell>
                  <TableCell align="right">炭水化物</TableCell>
                  <TableCell align="right">食塩相当量</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMeal.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.date}</TableCell>
                    <TableCell component="th" scope="row">{row.time}</TableCell>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.salt}</TableCell>
                    <TableCell align="right"><Button variant="text" color='error' onClick={() => handleDeleteMeal(row.id, row.name)}>削除</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      }
      {
        radio === 'food' ?
          filteredFood.length !== 0 ?
            <Stack direction="row" spacing={2} justifyContent="center" marginTop="10px" marginBottom="30px" >
              <Pagination count={Math.ceil(registeredFood.length / displayCnt)} variant="outlined" shape="rounded" page={page} onChange={handleChangePagination} />
            </Stack>
          :
          <Typography id="noResult" marginTop="20px" marginLeft="55px" fontWeight="bold">
            データがありません
          </Typography>
        :
          filteredMeal.length !== 0 ?
            <Stack direction="row" spacing={2} justifyContent="center" marginTop="10px" marginBottom="30px" >
              <Pagination count={Math.ceil(registeredMeal.length / displayCnt)} variant="outlined" shape="rounded" page={page} onChange={handleChangePagination} />
            </Stack>
          :
          <Typography id="noResult" marginTop="20px" marginLeft="55px" fontWeight="bold">
            データがありません
          </Typography>
      }


    </>
  )
}

export default DeletePage