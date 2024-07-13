import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainFrame from "./components/MainFrame";
import LoginPage from "./Pages/LoginPage";
import LoginHeader from "./components/LoginHeader";
import SignPage from "./Pages/SignPage";


function App() {
  const [login, setLogin] = React.useState(false)
  return (
    <BrowserRouter>
      {
        login ?
          <MainFrame />
        :
          <>
            <LoginHeader />
            <Routes>
              <Route exact path="/" element={<LoginPage />} />
              <Route exact path="/sign" element={<SignPage />} />
            </Routes>
          </>
      }
      
    </BrowserRouter>
  );
}

export default App;
