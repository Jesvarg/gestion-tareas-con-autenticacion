"use client";

import Navbar from '../../components/Navbar';

export default function TasksPageClient({ tasks }) {
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Mis Tareas</h1>
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">{task.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  {task.completed ? 'Completada' : 'Pendiente'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay tareas disponibles.</p>
        )}
      </main>
    </div>
  );
}