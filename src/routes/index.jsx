// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import App from '../App'
// import CheckDni from '../pages/CheckDni'
// import Dashboard from '../pages/admin/Dashboard'
// import Students from '../pages/admin/Students'
// import StudentForm from '../pages/admin/StudentForm'
// import RequireAuth from '../auth/requireAuth'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <CheckDni /> // pantalla pública
//   },
//   {
//     path: '/admin',
//     element: (
//       <RequireAuth>
//         <App /> {/* layout con navbar y footer */}
//       </RequireAuth>
//     ),
//     children: [
//       { index: true, element: <Dashboard /> },
//       { path: 'alumnos', element: <Students /> },
//       { path: 'alumnos/nuevo', element: <StudentForm /> }
//     ]
//   }
// ])

// export default function AppRoutes() {
//   return <RouterProvider router={router} />
// }

