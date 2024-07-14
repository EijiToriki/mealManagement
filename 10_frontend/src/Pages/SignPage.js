import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from '@mui/material';
import { URL } from '../data/constants';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authorizeSlice';

const defaultTheme = createTheme();

const SignPage = () => {
  const [userName, setUserName] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [passwordAlertFlag, setPasswordAlertFlag] = React.useState(false)
  const [blankAlertFlag, setBlankAlertFlag] = React.useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (setFunction) => (event) => {
    setFunction(event.target.value)
  }

  const handleSubmit = async() => {

    if(userName === "" || password === ""){
      setBlankAlertFlag(true)
    }else if(password !== confirmPassword){
      setPasswordAlertFlag(true)
    }else{
      const params = {
        name: userName,
        password: password,
      };

      try {
        const res = await axios.post(URL + "/register_user", params)
        const action = login(res.data)
        dispatch(action)
        navigate('/top')
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };



  const clickNewRegister = () => {
    navigate('/')
  }
  return (
    <ThemeProvider theme={defaultTheme}>
        {
        blankAlertFlag &&
          <Alert severity="error" sx={{marginTop: "60px"}} onClose={() => {setBlankAlertFlag(false)}}>
            ユーザ名・パスワードは必須入力です
          </Alert>
        }
        {
        passwordAlertFlag &&
          <Alert severity="error" sx={{marginTop: "60px"}} onClose={() => {setPasswordAlertFlag(false)}}>
            パスワードが一致しません
          </Alert>
        }
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            新規ユーザ登録
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="ユーザ名"
              name="userName"
              autoComplete="ユーザ名"
              autoFocus
              onChange={handleChange(setUserName)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange(setPassword)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password2"
              label="Password（確認用）"
              type="password"
              id="password2"
              autoComplete="current-password"
              onChange={handleChange(setConfirmPassword)}
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登録
            </Button>
            <Grid container justifyContent="right">
              <Grid item>
                <Button onClick={clickNewRegister} variant="text">
                  {"ログイン画面へ"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignPage