import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/router';

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { required: true })} placeholder="Usuario" />
      {errors.username && <span>El nombre de usuario es requerido</span>}
      
      <input type="password" {...register("password", { required: true })} placeholder="Contraseña" />
      {errors.password && <span>La contraseña es requerida</span>}
      
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};