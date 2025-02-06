import HomePage from "./pages/Home/Home";
import Template from "./pages/Template/Template";
import Control from "./components/Control/Control";
import TemplateDetail from "./pages/TemplateDetail/TemplateDetail";

import "./style/GlobalStyle.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [templateDetail, setTemplateDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/powerpoint.json");
        if (!response.ok) throw new Error("Failed to fetch data");
        setTemplateDetail(await response.json());
      } catch (err) {
        console.log(err);
      } finally {
        console.log("loadding");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <Link to={"/"}>
          <img src="/logo.png" alt="logo" />
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/template" element={<Template />} />
        {templateDetail.map((e, index) => (
          <Route
            key={index}
            path={`/template/${e.code}`}
            element={<TemplateDetail data={e} />}
          />
        ))}
        {/* <Route path="/guide" element={<PricingPage />} /> */}
        {/* <Route path="/info" element={<GuidePage />} /> */}
      </Routes>

      <Control />
    </div>
  );
}

export default App;
