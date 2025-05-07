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
    
                const response = await axiosInstance.get('/student/getAllStudent', {
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
        <div className="text-black bg-[radial-gradient(circle_at_bottom_left,_#a09d9d,_#f3b3b3,_transparent_60%),radial-gradient(circle_at_bottom_right,_#ff9999,_#cc0000,_transparent_60%),radial-gradient(circle_at_top_left,_#cc3333,_#990000,_transparent_60%),radial-gradient(circle_at_top_right,_#660000,_#330000)] min-h-screen px-4 py-8">
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Listado de Alumnos</h2>
            <button
              onClick={handleAddStudent}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Agregar alumno
            </button>
          </div>
      
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <Link
                to={`/alumno/${student.id}`}
                key={student.id}
                className="block bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-md p-4 hover:scale-[1.02] hover:shadow-lg transition transform duration-200"
              >
                <h3 className="text-lg font-semibold mb-1">
                  {student.name} {student.lastName}
                </h3>
                <p className="text-sm">DNI: {student.dni}</p>
                <p className="text-sm">Celular: {student.phone}</p>
              </Link>
            ))}
          </div>
        </div>
    );
      
}

export default Students;

