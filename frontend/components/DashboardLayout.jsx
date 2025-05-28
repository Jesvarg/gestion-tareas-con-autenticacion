import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/tasks" className="text-gray-700 dark:text-gray-300 hover:underline">
                  Mis Tareas
                </a>
              </li>
              <li>
                <a href="/new-task" className="text-gray-700 dark:text-gray-300 hover:underline">
                  Nueva Tarea
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <span className="text-sm hidden md:inline mr-2">
              Bienvenido, <span className="font-medium">{user?.username}</span>
            </span>
            <button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              className="text-muted-foreground hover:text-foreground"
            >
            </button>
          </div>
        </div>
      </header>
 
      <main className="flex-1 container mx-auto px-4 py-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
}