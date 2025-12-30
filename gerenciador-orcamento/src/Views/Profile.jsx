import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faEnvelope, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    return (
        <div className="space-y-6 animate__animated animate__fadeIn">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meu Perfil</h1>
                <p className="text-gray-500 dark:text-gray-400">Gerencie suas informações pessoais</p>
            </header>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl">
                <div className="flex items-center gap-6 mb-8">
                    <div className="h-24 w-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-500 dark:text-blue-400">
                        <FontAwesomeIcon icon={faUserCircle} className="text-5xl" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name || "Usuário"}</h2>
                        <p className="text-gray-500 dark:text-gray-400">Membro do Minhas Finanças</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center gap-4">
                        <div className="h-10 w-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm text-gray-400">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">E-mail</p>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{user.email || "email@exemplo.com"}</p>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center gap-4">
                        <div className="h-10 w-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center shadow-sm text-gray-400">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase">ID da Conta</p>
                            <p className="font-medium text-gray-900 dark:text-gray-100 font-mono text-sm">{user.id || "..."}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
