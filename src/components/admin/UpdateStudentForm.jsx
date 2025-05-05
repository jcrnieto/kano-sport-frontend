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
    <form onSubmit={handleSubmit}>
      <p>
        <label>Nombre: </label>
        <input name="name" value={formData.name} onChange={handleChange} />
      </p>
      <p>
        <label>Apellido: </label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} />
      </p>
      <p>
        <label>Teléfono: </label>
        <input name="phone" value={formData.phone} onChange={handleChange} />
      </p>
      <p>
        <label>Dirección: </label>
        <input name="address" value={formData.address} onChange={handleChange} />
      </p>
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default UpdateStudentForm;
