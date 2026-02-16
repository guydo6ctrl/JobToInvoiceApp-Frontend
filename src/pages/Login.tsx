import Form from "../components/Form"

function Login(): JSX.Element {
    return <Form route="/api/token/" method="login" />
}

export default Login