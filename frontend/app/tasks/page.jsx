// import { cookies } from 'next/headers'; // Para obtener cookies en el servidor
import TasksPageClient from './TasksPageClient'; // Importar el Client Component

export default async function TasksPage() {
  // Obtener el token desde las cookies



  const { cookies } = await import('next/headers')
  
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No estás autenticado. Redirigiendo al login...</p>
      </div>
    );
  }

  // Obtener las tareas desde el servidor Flask
  let tasks = [];
  try {
    const res = await fetch('http://localhost:5000/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store', // Evitar el almacenamiento en caché
    });

    if (!res.ok) {
      throw new Error('Error al obtener las tareas');
    }

    tasks = await res.json();
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
  }

  // Pasar las tareas al Client Component
  return <TasksPageClient tasks={tasks} />;
}