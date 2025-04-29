import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../context/axiosInstance';

const StudentDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;

            try {
                const response = await axiosInstance.get(`http://localhost:3000/api/student/id?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                setStudent(response.data.data);
            } catch (error) {
                if (error.response?.status === 401) {
                    // Token vencido o inválido
                    localStorage.removeItem('user');
                    navigate('/login');
                  } else {
                    console.error('Error al obtener alumnos:', error);
                  }
            }
        };

        fetchStudent();
    }, [id,navigate]);

    if (!student) return <p>Cargando datos del alumno...</p>;

    return (
        <div>
            <h2>Detalle del Alumno</h2>
            <p>Nombre: {student.name}</p>
            <p>Apellido: {student.lastName}</p>
            <p>DNI: {student.dni}</p>
            <p>Telefono: {student.phone}</p>
            <p>Direccion: {student.address}</p>
        </div>
    );
};

export default StudentDetail;