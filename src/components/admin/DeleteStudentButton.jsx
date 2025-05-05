import Swal from 'sweetalert2';
import axiosInstance from '../../context/axiosInstance';
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
        await axiosInstance.delete(`http://localhost:3000/api/student/deleteId?deleteId=${studentId}`, {
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

  return <button onClick={handleDelete}>Eliminar</button>;
};

export default DeleteStudentButton;
