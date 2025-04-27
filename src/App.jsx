import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CheckDni from './pages/CheckDni';
import Students from './pages/admin/Students'; 
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
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
{/* <Route path="/student" element={<Students />} />
<Route path="/studentForm" element={<StudentForm />} /> */}