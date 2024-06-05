import React from "react";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SelectModal from "../components/SelectModal";
import dayjs from "dayjs";
import "dayjs/locale/ja";

dayjs.locale("ja");

const MealRegisterPage = () => {
  const [selectedMeal, setSelectedMeal] = React.useState({});
  const [date, setDate] = React.useState(dayjs())
  const [time, setTime] = React.useState("");

  const handleDate = (newDate) => {
    setDate(newDate)
  }

  const handleTime = (e) => {
    setTime(e.target.value)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <h3 style={{ marginLeft: "2%" }}>食事登録</h3>
      <Paper sx={{ marginLeft: "30px", marginRight: "30px" }}>
        <Grid
          container
          alignItems="center"
          spacing={2}
          width="90%"
          marginLeft="5%"
        >
          <Grid item xs={2}>
            摂取日
          </Grid>
          <Grid item xs={10}>
            <Box display="flex" alignItems="center">
              <DatePicker
                sx={{ width: "210px" }}
                inputFormat="yyyy年MM月dd日"
                value={date}
                locale="ja"
                mask="____年__月__日"
                onChange={handleDate}
              />
              <FormControl sx={{ width: "80px", marginLeft: "10px" }}>
                <InputLabel id="demo-simple-select-label">時間</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={time}
                  label="time"
                  onChange={handleTime}
                >
                  <MenuItem value={"朝"}>朝</MenuItem>
                  <MenuItem value={"昼"}>昼</MenuItem>
                  <MenuItem value={"夜"}>夕</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={2}>
            料理名
          </Grid>
          <Grid item xs={10}>
            <Box display="flex" alignItems="center">
              <TextField
                id="mealName"
                label="料理名"
                variant="outlined"
                sx={{ width: "300px" }}
                value={selectedMeal.mealName ?? ""}
              />
              <SelectModal setSelectedMeal={setSelectedMeal} />
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
                value={selectedMeal.calories ?? ""}
              />
              <Typography sx={{ marginLeft: "1%", marginTop: "30px" }}>
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
                value={selectedMeal.protein ?? ""}
              />
              <Typography sx={{ marginLeft: "1%", marginTop: "30px" }}>
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
                value={selectedMeal.fat ?? ""}
              />
              <Typography sx={{ marginLeft: "1%", marginTop: "30px" }}>
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
                value={selectedMeal.carbs ?? ""}
              />
              <Typography sx={{ marginLeft: "1%", marginTop: "30px" }}>
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
                value={selectedMeal.salt ?? ""}
              />
              <Typography sx={{ marginLeft: "1%", marginTop: "30px" }}>
                g
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} container justifyContent="center" marginTop="1%">
            <Button
              variant="contained"
              sx={{ width: "15%", marginBottom: "10px" }}
              color="success"
            >
              登録
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default MealRegisterPage;
