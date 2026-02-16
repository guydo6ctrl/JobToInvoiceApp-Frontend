import { Navigate, useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home(): JSX.Element {
  const navigate = useNavigate();
  return <button onClick={() => navigate("/clients")}>Clients</button>;
}

export default Home;
