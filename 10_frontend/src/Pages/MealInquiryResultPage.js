import React from 'react'
import { Button, Grid } from '@mui/material'
import MealInquiryGraph from '../components/MealInquiryGraph'
import MealInquiryTable from '../components/MealInquiryTable'
import axios from 'axios'
import { URL } from '../data/constants'

const MealInquiryResultPage = ({handleReturnBtn, checkedItems, startDate, endDate}) => {
  const [dates, setDates] = React.useState([])
  const [mealHistory, setMealHistory] = React.useState([])
  const [calories, setCalories] = React.useState([])
  const [protein, setProteins] = React.useState([])
  const [carbs, setCarbs] = React.useState([])
  const [fat, setFat] = React.useState([])
  const [salt, setSalt] = React.useState([])

  React.useEffect(() => {
    const get_dairy_data = async() => {
      console.log(startDate)

      const formattedStartDate = `${startDate.$y}-${(startDate.$M+1).toString().padStart(2, '0')}-${startDate.$D.toString().padStart(2, '0')}`
      const formattedEndDate = `${endDate.$y}-${(endDate.$M+1).toString().padStart(2, '0')}-${endDate.$D.toString().padStart(2, '0')}`

      const params = {
        startDate: formattedStartDate,
        endDate: formattedEndDate
      }
      const res = await axios.get(URL + "/get_dairy_data", {params})
      setDates(res.data.dates)
      setMealHistory(res.data.mealHistory)
      setCalories(res.data.calories)
      setProteins(res.data.proteins)
      setCarbs(res.data.carbs)
      setFat(res.data.fats)
      setSalt(res.data.salts)
    }
    get_dairy_data()
   }, [])


  return (
    <>
      <h3 style={{marginLeft: "2%"}}>食事照会結果</h3>
      <MealInquiryTable flag={checkedItems.mealHistory} mealHistory={mealHistory} />
      <MealInquiryGraph flag={checkedItems.calories} title={"熱量"} xData={dates} yData={calories} />
      <MealInquiryGraph flag={checkedItems.protein} title={"タンパク質"} xData={dates} yData={protein} />
      <MealInquiryGraph flag={checkedItems.carbs} title={"炭水化物"} xData={dates} yData={carbs} />
      <MealInquiryGraph flag={checkedItems.fat} title={"脂質"} xData={dates} yData={fat} />
      <MealInquiryGraph flag={checkedItems.salt} title={"食塩相当量"} xData={dates} yData={salt} />
      <Grid container alignItems="center" spacing={2} width="90%" marginLeft="5%">
        <Grid item xs={12} container justifyContent="center" marginTop="1%" >
          <Button variant='contained' sx={{ width: '15%', marginBottom: '10px' }} color='error' onClick={handleReturnBtn}>戻る</Button>
        </Grid>
      </Grid>
    </>
  )
}

export default MealInquiryResultPage


