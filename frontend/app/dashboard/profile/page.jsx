"use client";

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import DashboardLayout from '@/components/DashboardLayout';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePasswordForm = () => {
    if (!currentPassword) {
      setPasswordError('La contraseña actual es obligatoria');
      return false;
    }

    if (newPassword.length < 6) {
      setPasswordError('La nueva contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    setIsSubmitting(true);

    // Simula una llamada a la API
    setTimeout(() => {
      alert('Contraseña actualizada exitosamente');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsSubmitting(false);
    }, 1500);
  };

  const handleDeleteAccount = () => {
    alert('Esta funcionalidad no está implementada en el demo.');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perfil</h1>
          <p className="text-gray-500">Administra la configuración de tu cuenta</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Información de la cuenta */}
          <div className="border rounded-lg p-4 bg-white shadow">
            <h2 className="text-xl font-semibold mb-4">Información de la cuenta</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Nombre de usuario
                </label>
                <input
                  id="username"
                  value={user?.username || ''}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                <p className="text-xs text-gray-500">
                  Tu nombre de usuario no puede ser cambiado en este demo.
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  value="user@example.com"
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border rounded-md bg-gray-100"
                />
                <p className="text-xs text-gray-500">
                  El correo electrónico no está implementado en este demo.
                </p>
              </div>
            </div>
          </div>

          {/* Seguridad */}
          <div className="border rounded-lg p-4 bg-white shadow">
            <h2 className="text-xl font-semibold mb-4">Seguridad</h2>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                  Contraseña actual
                </label>
                <input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  Nueva contraseña
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirmar nueva contraseña
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md"
                />
              </div>

              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Actualizando...' : 'Cambiar contraseña'}
              </button>
            </form>
          </div>
        </div>

        {/* Zona de peligro */}
        <div className="border rounded-lg p-4 bg-white shadow border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-500">Zona de peligro</h2>
          <p className="text-gray-500 mb-4">
            Elimina tu cuenta y todos tus datos de forma permanente.
          </p>
          <div className="flex gap-4">
            <button
              onClick={logout}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            >
              Cerrar sesión
            </button>
            <button
              onClick={handleDeleteAccount}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}