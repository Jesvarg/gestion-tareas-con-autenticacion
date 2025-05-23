import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold">TareasApp</h1>
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <span className="text-gray-700 dark:text-gray-300">Hola, {user.username}</span>
              <button onClick={logout} className="text-red-500 hover:underline">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
              <Link href="/register" className="text-green-500 hover:underline">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}