import { useForm } from 'react-hook-form';
import axiosInstance from '../../context/axiosInstance';
import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post('/student/createStudent', data);
      alert('Alumno creado exitosamente');
      reset();
      navigate('/admin'); // Redirige al Dashboard o donde quieras
    } catch (error) {
      console.error('Error al crear alumno:', error);
      alert('Hubo un error al crear el alumno');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Agregar Alumno</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>DNI:</label>
          <input type="text" {...register('dni')} required />
        </div>
        <div>
          <label>Nombre:</label>
          <input type="text" {...register('name')} required />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" {...register('lastName')} required />
        </div>
        <div>
          <label>Fecha de nacimiento:</label>
          <input type="date" {...register('dateOfBirth')} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" {...register('phone')} required />
        </div>
        <div>
          <label>Dirección:</label>
          <input type="text" {...register('address')} required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>
          Crear Alumno
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
