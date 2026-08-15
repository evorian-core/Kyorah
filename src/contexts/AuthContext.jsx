
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        fetch("http://localhost:3001/api/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Sessão inválida."
                    );
                }

                return data;
            })
            .then((data) => {
                if (data.success) {
                    setUser(data.user);
                } else {
                    localStorage.removeItem("token");
                    setUser(null);
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    async function login(email, password) {
        const response = await fetch(
            "http://localhost:3001/api/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Não foi possível fazer login."
            );
        }

        localStorage.setItem("token", data.token);

        setUser(data.user);

        return data;
    }

    async function register(userData) {
        const response = await fetch(
            "http://localhost:3001/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message || "Não foi possível criar a conta."
            );
        }

        return data;
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
    }

    function getToken() {
        return localStorage.getItem("token");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                getToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
