import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/CalendarComp.css";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setSelectedDate } from "../Date.store";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function CalendarComp() {
  const dispatch = useAppDispatch();
  const selectedDate = useAppSelector((state) => state.date.selectedDate);

  return (
    <Calendar
      value={new Date(selectedDate)}
      onChange={(value) => {
        if (value instanceof Date) {
          dispatch(setSelectedDate(value.toISOString()));
        }
      }}
    />
  );
}
