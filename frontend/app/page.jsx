"use client";

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import TasksPage from './tasks/page';

export default function Home() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();

  if (loading) return <p>Cargando...</p>;

  if (user) {
    router.push('/tasks');
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">App de Tareas</h1>
      <div className="space-x-4">
        <a href="/login" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Iniciar Sesión
        </a>
        <a href="/register" className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
          Registrarse
        </a>
      </div>
    </div>
  );
}