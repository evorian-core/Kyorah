import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

import Layout from "../components/Layout/Layout";
import BetaAccess from "../components/BetaAccess/BetaAccess";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Settings from "../pages/Settings/Settings";


export default function AppRouter() {

    const {
        user,
        loading,
    } = useAuth();

    const navigate = useNavigate();


    if (loading) {
        return null;
    }


    const betaUser =
        sessionStorage.getItem("kyorah_beta_user");

    const isBeta =
        Boolean(betaUser);


    function handleBetaComplete(betaUser) {

        console.log(
            "🧬 Beta identificado:",
            betaUser
        );


        sessionStorage.setItem(
            "kyorah_beta_user",
            JSON.stringify(betaUser)
        );


        navigate("/");

    }


    return (

        <Routes>


            {/* =========================
                ACESSO BETA
            ========================= */}

            <Route
                path="/beta"
                element={
                    <BetaAccess
                        onComplete={handleBetaComplete}
                    />
                }
            />


            {/* =========================
                USUÁRIO NORMAL OU BETA
            ========================= */}

            {user || isBeta ? (

                <>

                    <Route
                        path="/"
                        element={<Layout />}
                    />


                    <Route
                        path="/settings"
                        element={<Settings />}
                    />

                </>

            ) : (

                /* =========================
                   VISITANTE
                ========================= */

                <>

                    <Route
                        path="/"
                        element={<Landing />}
                    />


                    <Route
                        path="/login"
                        element={<Login />}
                    />


                    <Route
                        path="/register"
                        element={<Register />}
                    />

                </>

            )}


            {/* =========================
                ROTA PADRÃO
            ========================= */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/"
                        replace
                    />
                }
            />

        </Routes>

    );

}
