import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
    } catch (error) {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>

        <input
          {...register("username", { required: true })}
          placeholder="Usuario"
          className="w-full p-2 border rounded mb-2 dark:bg-gray-700"
        />
        {errors.username && <span className="text-red-500 text-sm">Campo requerido</span>}

        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Contraseña"
          className="w-full p-2 border rounded mb-2 dark:bg-gray-700"
        />
        {errors.password && <span className="text-red-500 text-sm">Campo requerido</span>}

        <button
          type="submit"
          className="w-full mt-4 bg-green-500 hover:bg-green-700 text-white py-2 rounded"
        >
          Registrarse
        </button>

        <p className="mt-4 text-center">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-blue-500 hover:underline">Inicia Sesión</a>
        </p>
      </form>
    </div>
  );
}