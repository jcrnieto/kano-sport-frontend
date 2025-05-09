import LogoutButton from "./LogoutButton";
import Logo from '../../images/img-logo-kano.PNG';
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="bg-gray-300 shadow-md p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">

                <div className="flex items-center flex-shrink-0 text-black text-xl font-bold">
                    <Link to="/admin">
                        <img src={Logo} alt="Logo Kano" className="h-18 w-auto cursor-pointer" />
                    </Link>
                </div>

                {/* Buscador (oculto en pantallas chicas) */}
                <div className="hidden md:flex flex-1 justify-center">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="border border-gray-300 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Login */}
                <div className="flex justify-end w-full md:w-auto">
                    <LogoutButton />
                </div>
            </div>

            {/* Buscador visible solo en pantallas pequeñas */}
            <div className="block md:hidden mt-4">
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </nav>

    )
}

export default Navbar