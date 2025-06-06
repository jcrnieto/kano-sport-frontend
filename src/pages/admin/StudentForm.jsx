import { useForm } from 'react-hook-form';
import axiosInstance from '../../instance/axiosInstance';
import { useNavigate } from 'react-router-dom';

const StudentForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
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
    <div className="text-black bg-[radial-gradient(circle_at_bottom_left,_#a09d9d,_#f3b3b3,_transparent_60%),radial-gradient(circle_at_bottom_right,_#ff9999,_#cc0000,_transparent_60%),radial-gradient(circle_at_top_left,_#cc3333,_#990000,_transparent_60%),radial-gradient(circle_at_top_right,_#660000,_#330000)] flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h2 className="text-4xl font-bold mb-6 mt-4">Agregar Alumno</h2>
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4 bg-white bg-opacity-20 p-6 rounded-lg shadow-md mb-5"
      >
        <div className="flex flex-col text-left">
          <label className="font-medium mb-1"> DNI:</label>
          <input
             type="text"
             {...register('dni', {
                required: true,
                pattern: {
                  value: /^\d+$/,
                  message: "Solo se permiten números",
                }
            })} 
             required
             className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dni && <p className="text-red-500 text-sm">{errors.dni.message}</p>}
        </div>

        <div className="flex flex-col text-left">
          <label className="font-medium mb-1">Nombre:</label>
          <input
             type="text"
             {...register('name', {
                required: true,
                pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                message: "Solo se permiten letras",
              }
              })}
             required 
             className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col text-left">
          <label className="font-medium mb-1">Apellido:</label>
          <input
             type="text"
             {...register('lastName', {
                required: true,
                pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                message: "Solo se permiten letras",
              }
             })}
             required
             className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div className="flex flex-col text-left">
          <label className="font-medium mb-1">Fecha de nacimiento:</label>
          <input
             type="date"
             {...register("dateOfBirth", { required: "La fecha es obligatoria" })}
             required
             className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
        </div>

        <div className="flex flex-col text-left">
          <label className="font-medium mb-1">Teléfono:</label>
          <input
             type="text"
             {...register('phone', {
                required: true,
                pattern: {
                value: /^\d+$/,
                message: "Solo se permiten números",
              }
             })}
             required
             className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
        </div>

        <div className="flex flex-col text-left">
          <label className="font-medium mb-1">Dirección:</label>
          <input
             type="text"
             {...register("address", { required: "La dirección es obligatoria" })}
             required
             className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
        </div>

        <button type="submit" className="px-5 py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition">
          Crear Alumno
        </button>
        
      </form>
    </div>
  );
};

export default StudentForm;
