import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import LoadingIndicator from "./LoadingIndicator";
import "../../styles/Form.css";

type Props = {
  route: string;
  method: "login" | "register";
};

function Form({ route, method }: Props) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (method === "register") {
        if (password !== password2) {
          alert("Passwords do not match");
          setLoading(false);
          return;
        }

        await api.post(route, {
          email,
          first_name: firstName,
          last_name: lastName,
          password,
          password2,
        });

        navigate("/login");
      } else {
        const res = await api.post(route, { email, password });

        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

        navigate("/home");
      }
    } catch (error: any) {
      alert(error.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>

      <input
        className="form-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      {method === "register" && (
        <>
          <input
            className="form-input"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />

          <input
            className="form-input"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </>
      )}

      <input
        className="form-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      {method === "register" && (
        <input
          className="form-input"
          type="password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm Password"
          required
        />
      )}

      {loading && <LoadingIndicator />}

      <button className="form-button" type="submit">
        {name}
      </button>

      {method === "login" && (
        <p style={{ marginTop: "1rem" }}>
          Haven’t got an account?{" "}
          <Link to="/register" style={{ color: "#3182ce" }}>
            Register
          </Link>
        </p>
      )}
    </form>
  );
}

export default Form;
