export default function Characteristic({ name, value, unit }) {
  return (
    <div className="label">
      <strong>{name}: </strong>
      {value}
      {unit}
    </div>
  );
}
