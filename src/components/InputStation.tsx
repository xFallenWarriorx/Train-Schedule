// Компонент Ввода Станций Отправления и Назначения
import "../styles/InputStation.css";

type InputStationProps = {
  label: string;
  value: string;
  invalid: boolean;
  errorText: string;
  onChange: (value: string) => void;
};

export function InputStation({
  label,
  value,
  invalid,
  errorText,
  onChange,
}: InputStationProps) {
  return (
    <div>
      <div className="station-label">{label}</div>
      <input
        className="station-input"
        style={{ borderColor: invalid ? "#ff0000" : undefined }}
        type="text"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {invalid && (
        <div style={{ fontSize: "18pt", color: "red" }}>{errorText}</div>
      )}
    </div>
  );
}
