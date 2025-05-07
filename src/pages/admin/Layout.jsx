import Footer from '../../components/admin/Footer'
import Navbar from '../../components/admin/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return(
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout