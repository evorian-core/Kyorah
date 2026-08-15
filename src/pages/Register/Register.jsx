import "./Register.css";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
    FiArrowRight,
    FiUser,
    FiMail,
    FiLock,
} from "react-icons/fi";

import { useAuth } from "../../contexts/AuthContext";

export default function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [form, setForm] = useState({

        name: "",

        email: "",

        password: "",

        confirmPassword: "",

        ageGroup: "18+",

    });

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        if (form.password !== form.confirmPassword) {

            setError("As senhas não coincidem.");

            return;

        }

        setLoading(true);

        try {

            await register({

                name: form.name,

                email: form.email,

                password: form.password,

                ageGroup: form.ageGroup,

            });

            navigate("/login");

        }

        catch (err) {

            setError(

                err.message ||

                "Erro ao criar conta."

            );

        }

        finally {

            setLoading(false);

        }

    }

    return (

        <main className="register-page">

            <div className="register-background"></div>

            <div className="register-card">

                <img

                    src="/favicon.png"

                    alt="Kyorah"

                    className="register-logo"

                />

                <h1>

                    Criar conta

                </h1>

                <p>

                    Crie sua conta e comece a conversar com a Kyorah.

                </p>

                <form

                    className="register-form"

                    onSubmit={handleSubmit}

                >

                    <div className="input-group">

                        <FiUser />

                        <input

                            type="text"

                            name="name"

                            placeholder="Nome completo"

                            value={form.name}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="input-group">

                        <FiMail />

                        <input

                            type="email"

                            name="email"

                            placeholder="E-mail"

                            value={form.email}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="input-group">

                        <FiLock />

                        <input

                            type="password"

                            name="password"

                            placeholder="Senha"

                            value={form.password}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="input-group">

                        <FiLock />

                        <input

                            type="password"

                            name="confirmPassword"

                            placeholder="Confirmar senha"

                            value={form.confirmPassword}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="input-group">

                        <select

                            name="ageGroup"

                            value={form.ageGroup}

                            onChange={handleChange}

                        >

                            <option value="13-17">

                                13–17 anos

                            </option>

                            <option value="18+">

                                18 anos ou mais

                            </option>

                        </select>

                    </div>

                    {error && (

                        <div className="register-error">

                            {error}

                        </div>

                    )}

                    <button

                        type="submit"

                        className="register-button"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Criando..."

                                : "Criar conta"

                        }

                        <FiArrowRight />

                    </button>

                </form>

                <div className="register-links">

                    <Link to="/login">

                        Já tenho uma conta

                    </Link>

                    <Link to="/">

                        Voltar

                    </Link>

                </div>

            </div>

        </main>

    );

}