import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import MainFrame from "./components/MainFrame";
import LoginPage from "./Pages/LoginPage";
import LoginHeader from "./components/LoginHeader";
import SignPage from "./Pages/SignPage";
import { useSelector } from "react-redux";


function App() {
  const userId = useSelector(state => state.authorize.user_id)
  return (
    <BrowserRouter>
      {
        userId > 0 ?
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
