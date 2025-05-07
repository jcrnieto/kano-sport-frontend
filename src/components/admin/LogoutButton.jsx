import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: '¿Cerrar sesión?',
      text: 'Tu sesión actual se cerrará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      // Borra usuario del localStorage
      localStorage.removeItem('user');
      
      navigate('/login');

      Swal.fire('¡Sesión cerrada!', '', 'success');
    }
  };

  return (
    <button
       onClick={handleLogout}
       className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
    >
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
