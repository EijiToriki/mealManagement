import React from 'react'
import { Button, Grid } from '@mui/material'
import MealInquiryGraph from '../components/MealInquiryGraph'
import { xData, yData } from '../dummyData/graphData'
import MealInquiryTable from '../components/MealInquiryTable'

const MealInquiryResultPage = ({handleReturnBtn, checkedItems}) => {
  return (
    <>
      <h3 style={{marginLeft: "2%"}}>食事照会結果</h3>
      <MealInquiryTable flag={checkedItems.mealHistory} />
      <MealInquiryGraph flag={checkedItems.calories} title={"熱量"} xData={xData} yData={yData} />
      <MealInquiryGraph flag={checkedItems.protein} title={"タンパク質"} xData={xData} yData={yData} />
      <MealInquiryGraph flag={checkedItems.carbs} title={"炭水化物"} xData={xData} yData={yData} />
      <MealInquiryGraph flag={checkedItems.fat} title={"脂質"} xData={xData} yData={yData} />
      <MealInquiryGraph flag={checkedItems.salt} title={"食塩相当量"} xData={xData} yData={yData} />
      <Grid container alignItems="center" spacing={2} width="90%" marginLeft="5%">
        <Grid item xs={12} container justifyContent="center" marginTop="1%" >
          <Button variant='contained' sx={{ width: '15%', marginBottom: '10px' }} color='error' onClick={handleReturnBtn}>戻る</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default MealInquiryResultPage


