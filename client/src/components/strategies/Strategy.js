import Images from "./../../images/index";
import "./Strategy.css";

export default function Strategy({ strategies, strategy }) {
  const login = () => {
    window.open(`/api/auth/${strategy}`, "_self");
  };

  return strategies.includes(strategy) ? (
    <div
      className={["button", "strategy-" + strategy].join(" ")}
      onClick={login}
    >
      <img src={Images.auth[strategy]} alt="" className="icon" />
      <span className="strategy-label">{strategy}</span>
    </div>
  ) : (
    <div />
  );
}
