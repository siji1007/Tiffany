import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        if (username === "admin" && password === "admin") {
            navigate("/admin/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#5EB7E5]">
            <h1 className="text-5xl font-bold font-serif text-black mb-10">tiffany</h1>
            <form className="flex flex-col items-center space-y-4" onSubmit={handleLogin}>
                <div className="flex flex-col items-start w-64">
                    <label htmlFor="username" className="text-white text-xs font-bold tracking-wide mb-1">
                        USERNAME
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-3 py-2 rounded border outline-none"
                    />
                </div>

                <div className="flex flex-col items-start w-64">
                    <label htmlFor="password" className="text-white text-xs font-bold tracking-wide mb-1">
                        PASSWORD
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded border outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-48 py-2 bg-[#0B2B50] text-white font-bold rounded border border-white hover:bg-[#133b6a]"
                >
                    LOG IN
                </button>

                <p className="text-white font-medium">or</p>

                <button
                    type="button"
                    className="w-48 py-2 bg-[#0B2B50] text-white font-bold rounded border border-white hover:bg-[#133b6a]"
                >
                    SIGN UP
                </button>
            </form>
        </div>
    );
};

export default Login;
