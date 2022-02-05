import "./Type.css";

export default function Type({ type }) {
  return <div className={["type", "type-" + type].join(" ")}>{type}</div>;
}
