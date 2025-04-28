import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckDni from './pages/CheckDni';
import Dashboard from './pages/admin/Dashboard'; 
import StudentForm from './pages/admin/StudentForm'; 
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useLocalStorage } from 'react-use';

function App() {

  const [user] = useLocalStorage('user')

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CheckDni />} />
        <Route path="/login" element={<Login />} />
        <Route element={ <ProtectedRoute canActivate={user}/>} >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/formulario-alumno" element={<StudentForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
