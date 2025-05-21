import LogoutButton from "./LogoutButton";
import SearchByName from "./SearchByName";
import Logo from '../../images/logo-kano-sport.PNG';
import { Link } from 'react-router-dom';
import { useSearch } from "../../context/SearchContext";

const Navbar = () => {

    const { setSearchResults } = useSearch(); // acá accedés al setter

    const handleLogoClick = () => {
        setSearchResults(null); // limpia la búsqueda
    };

    return (
        <nav className="bg-gray-300 shadow-md p-4">
            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
            
            <div className="flex items-center flex-shrink-0 text-black text-xl font-bold">
                <Link to="/admin" onClick={handleLogoClick}>
                <img src={Logo} alt="Logo Kano" className="h-18 w-auto cursor-pointer" />
                </Link>
            </div>

            <div className="w-full md:w-auto flex justify-center md:mt-0">
                <SearchByName />
            </div>

            <div className="flex justify-center w-full md:justify-end md:w-auto">
                <LogoutButton />
            </div>
            
            </div>
        </nav>
);
}

export default Navbar