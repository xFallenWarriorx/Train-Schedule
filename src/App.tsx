import { useEffect, useState } from "react";
import "./styles/App.css";
import "./styles/InputStation.css";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";
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
    const regexp = /^[A-Za-zА-Яа-яЁё]+(?:[\s-][A-Za-zА-Яа-яЁё]+)*$/;
    const depResult = regexp.test(dep);
    const arrResult = regexp.test(arr);
    setErrors({ dep: !depResult, arr: !arrResult });
    if (!depResult || !arrResult) {
      return;
    }
    navigate(`/${dep.trim()}/${arr.trim()}`);
  };
  const RedirectToHome = () => {
    useEffect(() => {
      navigate("/", { replace: true });
    }, []);

    return null;
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <header className="App-header">
              <div
                className="station-card"
                style={{ display: "flex", gap: "12px" }}
              >
                <InputStation
                  label="Станция отправления"
                  value={dep}
                  invalid={errors.dep}
                  errorText="Разрешены только буквы"
                  onChange={setDep}
                />
                <span style={{ fontSize: "24px", color: "black" }}>⇆</span>
                <InputStation
                  label="Станция назначения"
                  value={arr}
                  invalid={errors.arr}
                  errorText="Разрешены только буквы"
                  onChange={setArr}
                />
              </div>
              <CalendarComp />
              <button onClick={handleSubmit}>Поиск</button>
            </header>
          }
        />
        <Route
          path="/:dep/:arr"
          element={
            <div className="results-page">
              <Link to="/">Вернуться к поиску</Link>
              <TrainsList />
            </div>
          }
        />
        <Route path="*" element={<RedirectToHome />} />
      </Routes>
    </div>
  );
}

export default App;
