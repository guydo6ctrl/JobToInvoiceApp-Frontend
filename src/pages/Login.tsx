import Form from "../components/General/Form";

function Login(): JSX.Element {
  return <Form route="/api/token/" method="login" />;
}

export default Login;
