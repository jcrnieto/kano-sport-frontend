import { useForm } from "react-hook-form";
//import { useNavigate } from "react-router-dom";

const Login = () => {

    const { register, handleSubmit } = useForm();

    //const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            console.log("data", data)
            const response = await fetch('http://localhost:3000/api/admin/login', {
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

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
            <label>Usuario</label>
            <input type="text" className="form-control" {...register('username')} />
        </div>
        <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" {...register('password')} />
        </div>
        <input type="submit" value="Enviar" />
    </form>
}

export default Login;