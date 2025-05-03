// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import axiosInstance from '../../context/axiosInstance';


// const StudentDetail = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [student, setStudent] = useState(null);
//     const [showForm, setShowForm] = useState(false);

//     useEffect(() => {
//         const fetchStudent = async () => {
//             const user = JSON.parse(localStorage.getItem('user'));
//             const token = user?.token;

//             try {
//                 const response = await axiosInstance.get(`http://localhost:3000/api/student/id?id=${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });
//                 console.log('response', response.data.data)
//                 setStudent(response.data.data);
//             } catch (error) {
//                 if (error.response?.status === 401) {
//                     // Token vencido o inválido
//                     localStorage.removeItem('user');
//                     navigate('/login');
//                   } else {
//                     console.error('Error al obtener alumnos:', error);
//                   }
//             }
//         };

//         fetchStudent();
//     }, [id,navigate]);

//     if (!student) return <p>Cargando datos del alumno...</p>;

//     return (
//         <div>
//             <h2>Detalle del Alumno</h2>
//             <p>Nombre: {student.name}</p>
//             <p>Apellido: {student.lastName}</p>
//             <p>DNI: {student.dni}</p>
//             <p>Telefono: {student.phone}</p>
//             <p>Direccion: {student.address}</p>
            
//             <hr style={{ margin: '20px 0' }} />

            
//             <h3>Historial de Cuotas</h3>
//             {student.Quota && student.Quota.length > 0 ? (
//                 <ul>
//                     {student.Quota.map((q) => (
//                         <li key={q.id}>
//                             Pago: {q.paymentDate} | Vencimiento: {q.expirationDate} | Monto: ${q.amount}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>Este alumno no tiene cuotas registradas.</p>
//             )}

//             <button onClick={() => setShowForm(!showForm)}>
//                 {showForm ? 'Cancelar' : 'Registrar cuota'}
//             </button>

//             {showForm && (
//                 <PayOfQuota
//                 studentId={student.id}
//                 onSuccess={() => {
//                     setShowForm(false);
//                     fetchStudent(); // recarga cuotas
//                 }}
//                 />
//             )}
//         </div>
//     );
// };

// export default StudentDetail;

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../context/axiosInstance';
import PayOfQuota from '../../components/admin/PayOfQuota';

const StudentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
