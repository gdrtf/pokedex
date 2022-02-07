import { useEffect, useState } from "react";
import Strategy from "../components/strategies/Strategy";

export default function Login() {
  const [strategies, setStrategies] = useState(null);

  useEffect(() => {
    const getStrategies = () => {
      fetch(`/api/auth/strategies`, {
        method: "GET",
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Error on server!");
        })
        .then((strategies) => {
          setStrategies(strategies);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getStrategies();
  }, []);

  return strategies ? (
    <div className="login">
      <Strategy strategies={strategies} strategy="auth0" />
      <Strategy strategies={strategies} strategy="google" />
      <Strategy strategies={strategies} strategy="github" />
      <Strategy strategies={strategies} strategy="mock" />
    </div>
  ) : (
    <div />
  );
}
