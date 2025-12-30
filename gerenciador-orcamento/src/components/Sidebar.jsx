import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChartPie,
    faMedal,
    faUser,
    faSignOutAlt,
    faWallet,
    faMoon,
    faSun
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

export default function Sidebar() {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        toast.success("Você saiu com sucesso!");
        navigate("/login");
    };

    const NavItem = ({ to, icon, label }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                }`
            }
        >
            <FontAwesomeIcon icon={icon} className="text-lg" />
            <span className="font-medium">{label}</span>
        </NavLink>
    );

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col h-screen sticky top-0 font-sans">
            {/* Logo */}
            <div className="p-8 pb-4">
                <div className="flex items-center gap-3 text-blue-600 mb-8">
                    <div className="bg-blue-100 p-2 rounded-lg">
                        <FontAwesomeIcon icon={faWallet} className="text-2xl" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Minhas<span className="text-blue-600">Finanças</span>
                    </h1>
                </div>

                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                    Menu Principal
                </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 space-y-2">
                <NavItem to="/" icon={faChartPie} label="Dashboard" />
                <NavItem to="/badges" icon={faMedal} label="Conquistas" />
                <NavItem to="/profile" icon={faUser} label="Meu Perfil" />
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-50 dark:border-gray-700 space-y-2">
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-gray-500 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                >
                    <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} className="text-lg" />
                    <span className="font-medium">
                        {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
                    </span>
                </button>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
                    <span className="font-medium">Sair</span>
                </button>
            </div>
        </aside>
    );
}
