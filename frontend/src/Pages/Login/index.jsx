import { useState } from "react";
import "./styles.css";
import 'react-toastify/dist/ReactToastify.css';

import { Button, CardTitle, Spinner } from "reactstrap";
import { useAuth } from "../../context/AuthContext/useAuth";

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const { signIn, loading } = useAuth()

    function handleSubmit(event) {
        event.preventDefault();
        // Validate the login credentials and send a request to the server
        const data = {
            login,
            password,
            rememberMe
        }


        signIn(data)
    }


    return (
        <div className="login-container">
            {loading && <Spinner color="primary" />}
            <CardTitle className="mb-1.5">Login</CardTitle>
            <form onSubmit={handleSubmit}
            >
                <CardTitle>Usuário</CardTitle>

                <input
                    type="text"
                    id="username"
                    name="username"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                    required

                />
                <CardTitle>Senha</CardTitle>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <label htmlFor="remember-me">
                    <input
                        type="checkbox"
                        id="remember-me"
                        name="remember-me"
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    Lembrar-me
                </label>
                <Button type="submit" outline color="info">Entrar</Button>
            </form>
            <p>
                Não tem uma conta? <a href="/signup">Cadastrar</a>
            </p>
        </div>
    )
}

export default Login