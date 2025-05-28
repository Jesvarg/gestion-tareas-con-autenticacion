"use client";

import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function Login() {
  const { register: authRegister, login: authLogin } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await authLogin(data);
      router.push('/tasks');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>

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
          className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 rounded"
        >
          Entrar
        </button>

        <p className="mt-4 text-center">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-blue-500 hover:underline">Regístrate</a>
        </p>
      </form>
    </div>
  );
}