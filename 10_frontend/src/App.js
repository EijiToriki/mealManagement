import { BrowserRouter } from "react-router-dom";
import "./App.css";
import MainFrame from "./components/MainFrame";

function App() {
  return (
    <BrowserRouter>
      <MainFrame />
    </BrowserRouter>
  );
}

export default App;
