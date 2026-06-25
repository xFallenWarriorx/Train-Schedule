import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/CalendarComp.css";
import { useState } from "react";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarComp() {
  const [date, setDate] = useState<Value>(new Date());

  return (
    <Calendar
      onChange={(value) => {
        setDate(value);
      }}
      value={date}
    />
  );
}
