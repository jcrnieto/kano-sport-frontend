import { useForm } from "react-hook-form";
import axiosInstance from '../context/axiosInstance.js'

const Login = () => {

    const { register, handleSubmit } = useForm();

    //const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            console.log("data", data)
            const response = await axiosInstance.post('/admin/login',{
              username: data.username,
              password: data.password
            }, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (!response.ok) {
                throw new Error('Credenciales incorrectas');
            }

            const result = await response.json();

            localStorage.setItem('user', JSON.stringify({
                username: data.username,
                token: result.token
            }));

            // navigate('/admin');
            window.location.href = '/admin';
        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            // Opcional: mostrar error en pantalla
            alert('Email o password incorrecto');
        }
    };

    return (
        <div className="text-white bg-[radial-gradient(circle_at_bottom_left,_#a09d9d,_#f3b3b3,_transparent_60%),radial-gradient(circle_at_bottom_right,_#ff9999,_#cc0000,_transparent_60%),radial-gradient(circle_at_top_left,_#cc3333,_#990000,_transparent_60%),radial-gradient(circle_at_top_right,_#660000,_#330000)] flex items-center justify-center min-h-screen px-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
          >
            <div className="mb-4 flex flex-col md:flex-row md:items-center">
              <label className="text-lg font-semibold text-black md:w-32 mb-2 md:mb-0">
                Usuario
              </label>
              <input
                type="text"
                className="border border-black rounded px-4 py-2 text-black w-full"
                {...register('username')}
              />
            </div>
            <div className="mb-4 flex flex-col md:flex-row md:items-center">
              <label className="text-lg font-semibold text-black md:w-32 mb-2 md:mb-0">
                Password
              </label>
              <input
                type="password"
                className="border border-black rounded px-4 py-2 text-black w-full"
                {...register('password')}
              />
            </div>
            <div className="text-center">
              <input
                type="submit"
                value="Enviar"
                className="px-5 py-2 bg-black text-white rounded-md hover:bg-neutral-800 transition"
              />
            </div>
          </form>
        </div>
      );
      
}

export default Login;