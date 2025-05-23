import TaskList from '../components/TaskList';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';

export default function TasksPage({ serverTasks }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Mis Tareas</h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Mostrar lista de tareas */}
        <TaskList tasks={serverTasks} />
      </main>
    </div>
  );
}

// SSR: Cargar tareas desde el servidor Flask
export async function getServerSideProps(context) {
  const { req } = context;
  const token = req.cookies.token; // Token almacenado en cookies (más seguro)

  // Si no hay token, redirigir al login
  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    // Hacer fetch directo desde el servidor
    const res = await fetch('http://localhost:5000/api/tasks', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Error al obtener las tareas');
    }

    const tasks = await res.json();

    return {
      props: {
        serverTasks: tasks || [],
      },
    };
  } catch (error) {
    console.error('Error en getServerSideProps:', error.message);
    return {
      props: {
        serverTasks: [],
      },
    };
  }
}