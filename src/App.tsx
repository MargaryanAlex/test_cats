import "./App.scss";
import MainPage from "./pages/main";
import SideBar from "./components/sideBar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <SideBar />
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route path="/category:id" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
