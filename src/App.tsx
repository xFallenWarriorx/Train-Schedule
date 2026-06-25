import { useEffect, useState } from "react";
import "./styles/App.css";
import "./styles/InputStation.css";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { InputStation } from "./components/InputStation";
import TrainsList from "./components/TrainsList";
import CalendarComp from "./components/CalendarComp";

function App() {
  const [dep, setDep] = useState("");
  const [arr, setArr] = useState("");
  const [errors, setErrors] = useState({ dep: false, arr: false });
  const location = useLocation();

  useEffect(() => {
    const [, depFromUrl, arrFromUrl] = location.pathname.split("/");

    if (depFromUrl) setDep(decodeURIComponent(depFromUrl));
    if (arrFromUrl) setArr(decodeURIComponent(arrFromUrl));
  }, [location.pathname]);
  const navigate = useNavigate();
  // Фильтрация символов при поиске
  const handleSubmit = () => {
    const regexp = /^[A-Za-zА-Яа-яЁё\s]+$/;
    const depResult = regexp.test(dep);
    const arrResult = regexp.test(arr);
    setErrors({ dep: !depResult, arr: !arrResult });
    if (!depResult || !arrResult) {
      return;
    }
    navigate(`/${dep}/${arr}`);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="station-card" style={{ display: "flex", gap: "12px" }}>
          <InputStation
            label="Станция отправления"
            value={dep}
            invalid={errors.dep}
            errorText="Только буквы"
            onChange={setDep}
          />
          <span style={{ fontSize: "24px", color: "black" }}>⇆</span>
          <InputStation
            label="Станция назначения"
            value={arr}
            invalid={errors.arr}
            errorText="Только буквы"
            onChange={setArr}
          />
        </div>
        <CalendarComp />
        <button onClick={handleSubmit}>Поиск</button>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/:dep/:arr" element={<TrainsList />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
