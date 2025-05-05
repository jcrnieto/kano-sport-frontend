import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../context/axiosInstance';
import PayOfQuota from '../../components/admin/PayOfQuota';
import DeleteStudentButton from '../../components/admin/DeleteStudentButton';
import UpdateStudentForm from '../../components/admin/UpdateStudentForm';

const StudentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);


  const fetchStudent = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.token;

    try {
      const response = await axiosInstance.get(`http://localhost:3000/api/student/id?id=${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent(response.data.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('user');
        navigate('/login');
      } else {
        console.error('Error al obtener alumno:', error);
      }
    }
  };

  useEffect(() => {
    fetchStudent();
  }, [id]);

  if (!student) return <p>Cargando datos del alumno...</p>;

  return (
    <div>
      <h2>Detalle del Alumno</h2>
      <p>Nombre: {student.name}</p>
      <p>Apellido: {student.lastName}</p>
      <p>DNI: {student.dni}</p>
      <p>Telefono: {student.phone}</p>
      <p>Direccion: {student.address}</p>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Registrar cuota'}
      </button>

      <DeleteStudentButton studentId={student.id} />

      <button onClick={() => setShowUpdateForm(!showUpdateForm)}>
        {showUpdateForm ? 'Cancelar Edición' : 'Actualizar Datos'}
      </button>

      {showUpdateForm && (
        <UpdateStudentForm
          student={student}
          onSuccess={() => {
            setShowUpdateForm(false);
            fetchStudent();
          }}
        />
      )}



      {showForm && (
        <PayOfQuota
          studentId={student.id}
          onSuccess={() => {
            setShowForm(false);
            fetchStudent(); // recarga cuotas
          }}
        />
      )}

      <hr style={{ margin: '20px 0' }} />
      <h3>Historial de Cuotas</h3>
      {student.Quota && student.Quota.length > 0 ? (
        <ul>
          {student.Quota.map((q) => (
            <li key={q.id}>
              Pago: {q.paymentDate} | Vencimiento: {q.expirationDate} | Monto: ${q.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>Este alumno no tiene cuotas registradas.</p>
      )}
    </div>
  );
};

export default StudentDetail;
