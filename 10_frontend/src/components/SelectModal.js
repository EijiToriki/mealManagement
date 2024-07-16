import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Grid, Pagination, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { URL } from '../data/constants';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 480,
  height: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

const contentStyle = {
  flex: 1,
  overflowY: 'auto', // 縦方向のスクロールを有効に
  paddingRight: '8px', // スクロールバーのための余白
  marginTop: '16px', // 上の検索部分と少し間隔を空ける
};

const SelectModal = ({setMeal}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const displayCnt = 5
  const [registeredMeal, setRegisteredMeal] = React.useState([])
  const [filteredMeal, setFilteredMeal] = React.useState([])
  const [page, setPage] = React.useState(1)

  const userId = useSelector(state => state.authorize.user_id)

  React.useEffect(() => {
    const get_all_foods = async(params) => {
      const res = await axios.get(URL + "/get_all_foods", {params})
      setRegisteredMeal(res.data)
      setFilteredMeal(res.data.slice(0, displayCnt))
    }
    const params = {
      user_id : userId
    }
    get_all_foods(params)
   }, [])

  const handleSearchChange = (e) => {
    if(e.target.value === ""){
      setFilteredMeal(registeredMeal.slice(0, displayCnt))
      setPage(1)
    }else{
      setFilteredMeal(registeredMeal.filter(meal => 
        meal.name.includes(e.target.value)
      ))
    }
  }

  const handleChangePagination = (e, page) => {
    setPage(page)
    setFilteredMeal(registeredMeal.slice(displayCnt*(page-1), displayCnt*page))
  }

  const handleDecision = (meal) => {
    handleClose()
    setMeal(meal)
  }

  return (
    <>
      <Button onClick={handleOpen} variant='outlined' sx={{marginLeft: "10px", height: "50px"}} > 選択 </Button>
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          登録済み料理の選択
        </Typography>
        <Grid container alignItems="center" spacing={2} marginTop="3px">
          <Grid item xs={3} >
            <Typography sx={{marginLeft: "20px"}}>
              料理名
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <TextField id="mealName" label="料理名" variant="outlined" sx={{marginLeft: "20px"}} onChange={handleSearchChange} />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>

        <Box sx={contentStyle}>
            <Grid container alignItems="center" spacing={2}>

          {
            filteredMeal.map((meal, index) => {
              return (
                <React.Fragment key={index}>
                  <Grid item xs={9}>
                    <Typography sx={{ marginLeft: '30px' }}>{meal.name}</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="outlined" color="success" onClick={() => handleDecision(meal)} >
                      決定
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                </React.Fragment>
              )
            })}
        
          </Grid>
          {
            filteredMeal.length !== 0 ?
              <Stack direction="row" spacing={2} justifyContent="center" marginTop="10px" marginBottom="10px" >
                <Pagination count={Math.ceil(registeredMeal.length / displayCnt)} variant="outlined" shape="rounded" page={page} onChange={handleChangePagination} />
              </Stack>
            :
            <Typography id="noResult" marginTop="20px">
              検索結果がありません
            </Typography>
          }
        </Box>
      </Box>
    </Modal>
  </>

  )
}

export default SelectModal