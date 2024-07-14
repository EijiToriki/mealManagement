import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../data/constants';
import { useDispatch } from 'react-redux'
import { login } from '../redux/authorizeSlice';
import { Alert } from '@mui/material';

const defaultTheme = createTheme();

export default function LoginPage() {
  const [userName, setUserName] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loginAlertFlag, setLoginAlertFlag] = React.useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const changeUserName = (event) => {
    setUserName(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async() => {
    const params = {
      name: userName,
      password: password,
    };

    try {
      const res = await axios.get(URL + "/get_user", {params})
      if(res.data > 0){
        const action = login(res.data)
        dispatch(action)
        navigate('/top')
      }else{
        setLoginAlertFlag(true)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clickNewRegister = () => {
    navigate('/sign')
  }

  return (
    <ThemeProvider theme={defaultTheme}>
        {
        loginAlertFlag &&
          <Alert severity="error" sx={{marginTop: "60px"}} onClose={() => {setLoginAlertFlag(false)}}>
            ユーザ名・パスワードのいずれかが誤っています。
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="ユーザ名"
              name="userName"
              autoComplete="ユーザ名"
              autoFocus
              onChange={changeUserName}
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
              onChange={changePassword}
            />
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ログイン
            </Button>
            <Grid container justifyContent="right">
              <Grid item>
                <Button onClick={clickNewRegister} variant="text">
                  {"新規登録はこちらから"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}