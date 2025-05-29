"use client";

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth() || {};
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/tasks');
    }
  }, [user, router]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">App de Tareas</h1>
      <div className="space-x-4">
        <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Iniciar Sesión
        </Link>
        <Link href="/register" className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
          Registrarse
        </Link>
      </div>
    </div>
  );
}
