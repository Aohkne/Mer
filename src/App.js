import Control from "./components/Control/Control";
import HomePage from "./pages/Home/Home";

import "./style/GlobalStyle.scss";

import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header>
        <img src="/logo.png" alt="logo" />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/template" element={<QuizPage />} /> */}
        {/* <Route path="/guide" element={<PricingPage />} /> */}
        {/* <Route path="/info" element={<GuidePage />} /> */}
      </Routes>

      <Control />
    </div>
  );
}

export default App;
