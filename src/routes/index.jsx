// src/routes/index.tsx
// src/routes/index.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import About from '../pages/About'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
    ]
  }
])

export default function AppRoutes() {
  return <RouterProvider router={router} />
}
