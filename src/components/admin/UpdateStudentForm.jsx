import { useState } from 'react';
import axiosInstance from '../../context/axiosInstance';
import Swal from 'sweetalert2';

const UpdateStudentForm = ({ student, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: student.name,
    lastName: student.lastName,
    phone: student.phone,
    address: student.address,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    try {
      await axiosInstance.put(`http://localhost:3000/api/student/${student.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire('Actualizado', 'Los datos del alumno fueron actualizados correctamente', 'success');
      onSuccess(); // actualiza los datos
    } catch (err) {
      console.error('Error al actualizar alumno', err);
      Swal.fire('Error', 'No se pudo actualizar el alumno', 'error');
    }
  };

  return (
    <div className="w-full max-w-5xl bg-white px-6 py-4 rounded-md shadow-md text-black mx-auto mt-6">
      <h3 className="text-xl font-bold mb-4 text-center">Actualizar Datos del Alumno</h3>
  
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-4 justify-center items-center">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            className="border border-gray-400 rounded px-4 py-2 min-w-[150px]"
          />
  
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Apellido"
            className="border border-gray-400 rounded px-4 py-2 min-w-[150px]"
          />
  
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            className="border border-gray-400 rounded px-4 py-2 min-w-[150px]"
          />
  
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Dirección"
            className="border border-gray-400 rounded px-4 py-2 min-w-[150px]"
          />
  
          <button
            type="submit"
            className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition min-w-[150px]"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
  
};

export default UpdateStudentForm;
