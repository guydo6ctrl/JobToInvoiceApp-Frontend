import { Navigate, useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/clients")}>Clients</button>
      <button onClick={() => navigate("/jobs")}>Jobs</button>
    </div>
  );
}

export default Home;
