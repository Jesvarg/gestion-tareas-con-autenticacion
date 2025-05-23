import TaskList from '../../components/TaskList';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../hooks/useAuth';

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



/*
"use client";

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

export default function NewTaskPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: '',
    description: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: '',
      description: '',
    };

    if (!title.trim()) {
      newErrors.title = 'El título es obligatorio';
      valid = false;
    } else if (title.length > 100) {
      newErrors.title = 'El título debe tener menos de 100 caracteres';
      valid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
      valid = false;
    } else if (description.length > 500) {
      newErrors.description = 'La descripción debe tener menos de 500 caracteres';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !user) return;

    setIsSubmitting(true);

    try {
      // Simula la creación de la tarea (reemplaza con tu lógica real)
      console.log('Creating task:', { title, description });

      alert('Tarea creada exitosamente');
      router.push('/tasks');
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      alert('Error al crear la tarea. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Crear Nueva Tarea</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="Ingresa el título de la tarea"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.title ? 'border-red-500' : ''
              }`}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Descripción <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              placeholder="Ingresa la descripción de la tarea"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : ''
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/tasks')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              {isSubmitting ? 'Creando...' : 'Crear Tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
  */