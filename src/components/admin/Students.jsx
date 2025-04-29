import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../context/axiosInstance';


const Students = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    const handleAddStudent = () => {
        navigate('/formulario-alumno');
    }

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user?.token;
    
                const response = await axiosInstance.get('http://localhost:3000/api/student/getAllStudent', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setStudents(response.data.data);
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
    
        fetchStudents();
    }, [navigate]);

    return (
        <div>
            <p>Acá me traigo todos los alumnos registrados</p>
            
            <button onClick={handleAddStudent}>
                Agregar alumno
            </button>

            <ul style={{ marginTop: '20px' }}>
                {students.map(student => (
                    <li key={student.id}>
                        <Link to={`/alumno/${student.id}`}>
                            {student.name} {student.lastName}- {student.dni} - 
                        </Link>
                    </li>
                   
                ))}
            </ul>
        </div>
    );
}

export default Students;

