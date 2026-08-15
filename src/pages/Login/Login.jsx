import "./Login.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        setLoading(true);

        try {

            await login(email, password);

            navigate("/");

        }

        catch (err) {

            setError(

                err.message ||

                "Não foi possível entrar."

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <div className="login-page">

            <div className="login-glow"></div>

            <div className="login-card">

                <img

                    src="/favicon.png"

                    alt="Kyorah"

                    className="login-logo"

                />

                <span className="login-badge">

                    OMNIA • EVORIAN

                </span>

                <h1>

                    Bem-vindo

                </h1>

                <p>

                    Entre para continuar usando a Kyorah.

                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <label>Email</label>

                        <input

                            type="email"

                            placeholder="voce@email.com"

                            value={email}

                            onChange={(e)=>

                                setEmail(e.target.value)

                            }

                            required

                        />

                    </div>

                    <div className="input-group">

                        <label>Senha</label>

                        <input

                            type="password"

                            placeholder="••••••••••"

                            value={password}

                            onChange={(e)=>

                                setPassword(e.target.value)

                            }

                            required

                        />

                    </div>

                    {

                        error &&

                        <div className="login-error">

                            {error}

                        </div>

                    }

                    <button

                        type="submit"

                        className="login-button"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Entrando..."

                                : "Entrar"

                        }

                    </button>

                </form>

                <div className="login-divider">

                    <span>

                        ou

                    </span>

                </div>

                <button

                    className="create-account"

                    onClick={()=>

                        navigate("/register")

                    }

                >

                    Criar conta

                </button>

            </div>

        </div>

    );

}