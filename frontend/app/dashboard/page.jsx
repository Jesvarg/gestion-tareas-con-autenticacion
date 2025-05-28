"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTasks } from '@/utils/tasks';

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const loadTasks = async () => {
        try {
          const data = await getTasks(user.token);
          setTasks(data);
        } catch (error) {
          console.error('Failed to load tasks:', error);
        } finally {
          setIsLoading(false);
        }
      };

      loadTasks();
    }
  }, [user]);

  if (isLoading) {
    return <p>Cargando tareas...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
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
    </div>
  );
}