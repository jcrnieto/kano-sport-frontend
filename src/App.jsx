import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckDni from './pages/CheckDni';
import StudentForm from './pages/admin/StudentForm'; 
import StudentDetail from './pages/admin/StudentDetail';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useLocalStorage } from 'react-use';
import Student from '../src/components/admin/Students';
import Layout from './pages/admin/Layout';

function App() {

  const [user] = useLocalStorage('user')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckDni />} />
        <Route path="/login" element={<Login />} />
        <Route element={ <ProtectedRoute canActivate={user}/>} >
          <Route element={<Layout />}>
            <Route path="/admin" element={<Student />} />
            <Route path="/formulario-alumno" element={<StudentForm />} />
            <Route path="/alumno/:id" element={<StudentDetail />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
