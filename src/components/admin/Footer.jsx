const Footer = () => {
    return (
        <footer className="bg-white text-black py-6">
            <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm">&copy; 2025 Kano Sport. Todos los derechos reservados.</p>
                <div className="flex gap-4 mt-4 sm:mt-0">
                    <a href="#" className="hover:underline">Términos</a>
                    <a href="#" className="hover:underline">Privacidad</a>
                    <a href="#" className="hover:underline">Contacto</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer