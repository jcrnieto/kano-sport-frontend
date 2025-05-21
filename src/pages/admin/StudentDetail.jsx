import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../instance/axiosInstance';
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
      const response = await axiosInstance.get(`/student/id?id=${id}`, {
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
    <div className="text-black bg-[radial-gradient(circle_at_bottom_left,_#a09d9d,_#f3b3b3,_transparent_60%),radial-gradient(circle_at_bottom_right,_#ff9999,_#cc0000,_transparent_60%),radial-gradient(circle_at_top_left,_#cc3333,_#990000,_transparent_60%),radial-gradient(circle_at_top_right,_#660000,_#330000)] flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h2 className="text-4xl font-bold mb-4">Detalle del Alumno</h2>
      <p className="text-lg">Nombre: {student.name}</p>
      <p className="text-lg">Apellido: {student.lastName}</p>
      <p className="text-lg">DNI: {student.dni}</p>
      <p className="text-lg">Telefono: {student.phone}</p>
      <p className="text-lg mb-4">Direccion: {student.address}</p>
      
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          {showForm ? 'Cancelar' : 'Registrar cuota'}
        </button>

        <DeleteStudentButton
           studentId={student.id} 
        />

        <button 
          onClick={() => setShowUpdateForm(!showUpdateForm)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition"
        >
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
      </div>


      {showForm && (
        <PayOfQuota
          studentId={student.id}
          onSuccess={() => {
            setShowForm(false);
            fetchStudent(); // recarga cuotas
          }}
        />
      )}

      <hr className="my-6 border-black w-full max-w-xl" />
      <h3 className="text-2xl font-semibold mb-3">Historial de Cuotas</h3>
      {student.Quota && student.Quota.length > 0 ? (
        <ul className="text-lg">
          {student.Quota.map((q) => (
            <li key={q.id}>
              Pago: {q.paymentDate} | Vencimiento: {q.expirationDate} | Monto: ${q.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg">Este alumno no tiene cuotas registradas.</p>
      )}
    </div>
  );
};

export default StudentDetail;
