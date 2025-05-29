"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import TasksPageClient from './TasksPageClient';

export default function TasksPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error('Error al obtener las tareas');
        }

        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchTasks();
  }, [user]);

  if (loading || !user) return <p className="text-center mt-10">Cargando...</p>;

  return <TasksPageClient tasks={tasks} />;
}
