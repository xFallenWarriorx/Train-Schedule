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
  const selectedDate = useAppSelector((state) => state.date.selectedDate);
  const trains = useAppSelector((state) => state.trains.list);
  return (
    <div>
      {showTable ? (
        <>
          {trains.filter(
            (train) =>
              new Date(train.date).toDateString() ===
              new Date(selectedDate).toDateString(),
          ).length > 0 ? (
            <table>
              <caption>Список поездов</caption>
              <thead>
                <tr>
                  <th>Поезд</th>
                  <th>Маршрут поезда</th>
                  <th>Время отправления</th>
                  <th>Цена</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {trains
                  .filter(
                    (train) =>
                      new Date(train.date).toDateString() ===
                      new Date(selectedDate).toDateString(),
                  )
                  .map((train) => (
                    <tr key={train.id}>
                      <td>{train.name}</td>
                      <td>{train.route}</td>
                      <td>{train.time}</td>
                      <td>{train.price}</td>
                      <td>{train.date}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <p>Поезда с такой датой не найдены</p>
          )}
        </>
      ) : (
        <p>Поезда с таким маршрутом не найдены</p>
      )}
    </div>
  );
};

export default TrainsList;
