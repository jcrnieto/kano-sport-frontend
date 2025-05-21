import Swal from 'sweetalert2';
import axiosInstance from '../../instance/axiosInstance';
import { useNavigate } from 'react-router-dom';

const DeleteStudentButton = ({ studentId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al alumno permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      try {
        await axiosInstance.delete(`/student/deleteId?deleteId=${studentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire('Eliminado', 'El alumno fue eliminado exitosamente.', 'success');
        navigate('/admin'); 
      } catch (error) {
        console.error('Error al eliminar alumno:', error);
        Swal.fire('Error', 'Hubo un problema al eliminar el alumno.', 'error');
      }
    }
  };

  return <button 
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
          >Eliminar
          </button>;
};

export default DeleteStudentButton;
