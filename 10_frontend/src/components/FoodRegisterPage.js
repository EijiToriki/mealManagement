import React from 'react'
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'

const FoodRegisterPage = () => {
  const [food, setFood] = React.useState({
    mealName: '',
    calories: '',
    protein: '',
    fat: '',
    carbs: '',
    salt: ''
  });

  const handleChange = (e) => {
    const {id, value} = e.target
    setFood((preFood) => ({
      ...preFood,
      [id]: value
    }))
  }

  const handleSubmit = () => {
    console.log(food)
  }
  
  return (
    <>
      <h3 style={{marginLeft: "2%"}}>料理登録</h3>
      <Paper sx={{marginLeft: "30px", marginRight: "30px"}} >
        <Grid container alignItems="center" spacing={2} width="90%" marginLeft="5%">
          <Grid item xs={2}>
            料理名
          </Grid>
          <Grid item xs={10}>
            <Box display="flex" alignItems="center">
              <TextField 
                id="mealName" 
                label="料理名" 
                variant="outlined" 
                sx={{ width: "300px"}} 
                value={food.mealName}
                onChange={handleChange}
              />
            </Box>
          </Grid>
          <Grid item xs={2}>
            熱量
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField 
                id="calories" 
                label="熱量" 
                variant="outlined" 
                value={food.calories}
                onChange={handleChange}
              />
              <Typography sx={{marginLeft: "1%", marginTop: "30px"}}>
                kcal
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            タンパク質
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField 
                id="protein" 
                label="タンパク質" 
                variant="outlined"
                value={food.protein}
                onChange={handleChange}
              />
              <Typography sx={{marginLeft: "1%", marginTop: "30px"}}>
                g
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            脂質
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField 
                id="fat" 
                label="脂質" 
                variant="outlined"
                value={food.fat}
                onChange={handleChange}
              />
              <Typography sx={{marginLeft: "1%", marginTop: "30px"}}>
                g
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            炭水化物
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField 
                id="carbs" 
                label="炭水化物" 
                variant="outlined"
                value={food.carbs}
                onChange={handleChange}
              />
              <Typography sx={{marginLeft: "1%", marginTop: "30px"}}>
                g
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            食塩相当量
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <TextField 
                id="salt" 
                label="食塩相当量" 
                variant="outlined"
                value={food.salt}
                onChange={handleChange}
              />
              <Typography sx={{marginLeft: "1%", marginTop: "30px"}}>
                g
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} container justifyContent="center" marginTop="1%" >
            <Button variant='contained' sx={{ width: '15%', marginBottom: '10px' }} color='success' onClick={handleSubmit}>登録</Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

export default FoodRegisterPage