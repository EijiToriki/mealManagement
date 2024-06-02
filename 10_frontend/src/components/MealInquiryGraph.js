import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts'

const MealInquiryGraph = ({flag, title, xData, yData}) => {
  return (
    <>
    {
      flag &&
      <Box display="flex" flexDirection="column" alignItems="center" marginTop="20px">
        <Paper sx={{padding: "30px"}}>
          <Typography variant="h6">
            {title}
          </Typography>
          <LineChart
            xAxis={[{ data: xData }]}
            series={[
              {
                data: yData,
              },
            ]}
            width={500}
            height={300}
          />
        </Paper>
      </Box>
      }
    </>
  )
}

export default MealInquiryGraph