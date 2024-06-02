import React from 'react'
import { Box, Button, Checkbox, FormControlLabel, Grid, Paper, Typography } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider'

import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import MealInquiryResultPage from './MealInquiryResultPage'

dayjs.locale('ja');


const MealInquiryPage = () => {
  const [btnStatus, setBtnStatus] = React.useState(false)
  // const [startDate, setStartDate] = React.useState()
  // const [endDate, setEndDate] = React.useState()

  const [checkedItems, setCheckedItems] = React.useState({
    mealHistory: true,
    calories: true,
    protein: true,
    carbs: true,
    fat: true,
    salt: true,
  });

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const handleInquiryBtn = () => {
    setBtnStatus(true)
  }

  const handleReturnBtn = () => {
    setBtnStatus(false)
  }

  return (
    <>
    {
      !btnStatus ?
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ja'>
          <h3 style={{marginLeft: "2%"}}>食事照会</h3>
          <Paper sx={{marginLeft: "30px", marginRight: "30px"}} >
            <Grid container alignItems="center" spacing={2} width="90%" marginLeft="5%">
              <Grid item xs={2}>
                照会日
              </Grid>
              <Grid item xs={10}>
              <Box display="flex" alignItems="center">
                  <DatePicker 
                    sx={{ width: "210px"}}
                    inputFormat="yyyy年MM月dd日"
                    locale='ja'
                    mask='____年__月__日'
                  />
                  <Typography sx={{marginLeft: "10px", marginRight: "10px"}}>
                    ～
                  </Typography>
                  <DatePicker 
                    sx={{ width: "210px"}}
                    inputFormat="yyyy年MM月dd日"
                    locale='ja'
                    mask='____年__月__日'
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                照会対象
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox checked={checkedItems.mealHistory} />} onChange={handleCheckboxChange} label="食事履歴" sx={{marginLeft:"10px"}}  name="mealHistory" />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox checked={checkedItems.calories} />} onChange={handleCheckboxChange} label="熱量" sx={{marginLeft:"10px"}} name="calories" />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox checked={checkedItems.protein} />} onChange={handleCheckboxChange} label="タンパク質" sx={{marginLeft:"10px"}} name="protein" />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox checked={checkedItems.carbs} />} onChange={handleCheckboxChange} label="炭水化物" sx={{marginLeft:"10px"}} name="carbs" />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox checked={checkedItems.fat} />} onChange={handleCheckboxChange} label="脂質" sx={{marginLeft:"10px"}} name="fat" />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel control={<Checkbox checked={checkedItems.salt} />} onChange={handleCheckboxChange} label="食塩相当量" sx={{marginLeft:"10px"}} name="salt" />
              </Grid>
              <Grid item xs={12} container justifyContent="center" marginTop="1%" >
                <Button variant='contained' sx={{ width: '15%', marginBottom: '10px' }} color='success' onClick={handleInquiryBtn}>照会</Button>
              </Grid>
            </Grid>
          </Paper>
        </LocalizationProvider>
        :
        <MealInquiryResultPage handleReturnBtn={handleReturnBtn} checkedItems={checkedItems} />

    }
    </>
  )
}

export default MealInquiryPage