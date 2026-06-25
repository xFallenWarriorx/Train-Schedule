// Форма таблицы с использованием Redux
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store";
import "../styles/TrainsList.css";

const TrainsList = () => {
  let showTable = false;
  const params = useParams();

  showTable =
    params.dep?.toLowerCase().trim() === "москва" &&
    params.arr?.toLowerCase().trim() === "самара";

  const trains = useAppSelector((state) => state.trains.list);
  return (
    <div>
      {showTable ? (
        <table>
          <caption>Список поездов</caption>
          <thead>
            <tr>
              <th>Поезд</th>
              <th>Маршрут поезда</th>
              <th>Время отправления</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {trains.map((train) => (
              <tr key={train.id}>
                <td>{train.name}</td>
                <td>{train.route}</td>
                <td>{train.time}</td>
                <td>{train.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Поезда не найдены</p>
      )}
    </div>
  );
};

export default TrainsList;
