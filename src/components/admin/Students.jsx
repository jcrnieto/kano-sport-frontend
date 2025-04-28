import { useNavigate } from 'react-router-dom';

const Students = () => {
    const navigate = useNavigate();

    const handleAddStudent = () => {
        navigate('/formulario-alumno');
    }

    return (
        <div>
            <p>Acá me traigo todos los alumnos registrados</p>
            <button onClick={handleAddStudent}>
                Agregar alumno
            </button>
        </div>
    )
}

export default Students;
