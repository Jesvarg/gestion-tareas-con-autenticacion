import { useEffect, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { getTasks, deleteTask, updateTask, createTask } from '../utils/api';

const TaskModal = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

const handleSubmit = async (e) => {
  e.preventDefault();

  // Validaciones frontend
  if (!title.trim() || !description.trim()) {
    toast.error('El nombre y la descripción son obligatorios');
    return;
  }

  const data = {
    title: title.trim(),
    description: description.trim(),
  };

  try {
    if (task?.id) {
      await updateTask(task.id, data);
      toast.success('📘 Tarea actualizada');
    } else {
      await createTask(data);
      toast.success('📘 Tarea creada');
    }
    onSave();
    onClose();
  } catch (err) {
    if (err.response?.data?.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error('Ocurrió un error inesperado');
      console.error('Error inesperado:', err);
    }
  }
};

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <Motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">
          {task?.id ? '✏️ Editar Tarea' : '📘 Nueva Tarea'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nombre de la tarea"
            className="w-full border rounded p-2"
            required
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción de la tarea"
            className="w-full border rounded p-2"
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Guardar
            </button>
          </div>
        </form>
      </Motion.div>
    </div>
  );
};

const GetTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskModal, setTaskModal] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [tokenChecked, setTokenChecked] = useState(false);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      toast.error('Error al cargar las tareas');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('🔒 Debes iniciar sesión');
      return;
    }
    setTokenChecked(true);
    loadTasks();
  }, []);

  const requestDeletion = (task) => {
    setTaskToDelete(task);
  };

  const confirmDeletion = async () => {
    try {
      await deleteTask(taskToDelete.id);
      setTasks((prev) => prev.filter((l) => l.id !== taskToDelete.id));
      toast.success('🗑️ Tarea eliminada');
    } catch {
      toast.error('Error al eliminar la tarea');
    } finally {
      setTaskToDelete(null);
    }
  };

  const openModal = async (id) => {
    try {
      const task = await getTaskById(id);
      setTaskModal(task);
    } catch {
      toast.error('Error al cargar la tarea');
    }
  };

  if (!tokenChecked) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">📚 Lista de Tareas</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setTaskModal({})}
      >
        ➕ Añadir Tarea
      </button>
      <table className="w-full table-auto border border-gray-300 rounded shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Descripción</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 && (
            <tr>
              <td colSpan="5" className="p-4 text-center text-gray-500">
                No hay tareas aún.
              </td>
            </tr>
          )}
          {tasks.map((task) => (
            <Motion.tr
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="border-t"
            >
              <td className="p-2">{task.id}</td>
              <td className="p-2">{task.title}</td>
              <td className="p-2">{task.description}</td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => openModal(task.id)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => requestDeletion(task)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </Motion.tr>
          ))}
        </tbody>
      </table>

      <AnimatePresence>
        {taskModal && (
          <TaskModal
            task={taskModal}
            onClose={() => setTaskModal(null)}
            onSave={() => {
              setTaskModal(null);
              loadTasks();
            }}
          />
        )}
      </AnimatePresence>

      {/* Modal de confirmación de eliminación */}
      <AnimatePresence>
        {taskToDelete && (
          <Motion.div
            className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm"
            >
              <h2 className="text-lg font-semibold mb-3 text-red-600">¿Eliminar tarea?</h2>
              <p className="mb-4">
                ¿Seguro que quieres eliminar <strong>{taskToDelete.title}</strong>?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setTaskToDelete(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeletion}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GetTasks;