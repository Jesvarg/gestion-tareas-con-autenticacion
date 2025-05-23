import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

export const Layout = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div>Cargando...</div>;
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};