import Link from 'next/link';
import { useAuth } from '../context/AuthContext'; 

export default function Navbar() {
  const { user, logout } = useAuth();


  return (
    <nav className="bg-white dark:bg-gray-800 shadow fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">TareasApp</h1>
        </Link>

        {/* Opciones de navegación */}
        <div className="space-x-4 flex items-center">
          <Link href="/tasks" className="text-gray-700 dark:text-gray-300 hover:underline">
            Mis Tareas
          </Link>
          <Link href="/new-task" className="text-gray-700 dark:text-gray-300 hover:underline">
            Nueva Tarea
          </Link>

          {/* Mostrar opciones según el estado de autenticación */}
          {user ? (
            <>
              <span className="text-gray-700 dark:text-gray-300">Hola, {user.username}</span>
              <button
                onClick={logout}
                className="text-red-500 hover:underline"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
              <Link href="/register" className="text-green-500 hover:underline">
                Registro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}