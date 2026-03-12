import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserService, deleteUserService } from '../api/services';
import type { User } from '../types/user';

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadUser(parseInt(id));
    }
  }, [id]);

  const loadUser = async (userId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserService(userId);
      setUser(response.data);
    } catch (err) {
      setError('Error al cargar el usuario');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/user/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }

    try {
      setDeleting(true);
      await deleteUserService(parseInt(id));
      navigate('/', { replace: true });
    } catch (err) {
      alert('Error al eliminar el usuario');
      console.error(err);
      setDeleting(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-4">
          {error || 'Usuario no encontrado'}
        </div>
        <button
          onClick={handleBack}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-2 rounded-lg"
        >
          Volver al listado
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={handleBack}
        className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center transition duration-300"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver al listado
      </button>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
          <img
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-40 h-40 rounded-full border-8 border-white shadow-2xl object-cover"
          />
        </div>

        <div className="pt-24 pb-8 px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {user.first_name} {user.last_name}
            </h1>
            <p className="text-gray-600 text-lg">{user.email}</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Información del Usuario</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700">ID:</span>
                <span className="text-gray-600">{user.id}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700">Nombre:</span>
                <span className="text-gray-600">{user.first_name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span className="font-semibold text-gray-700">Apellido:</span>
                <span className="text-gray-600">{user.last_name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-600">{user.email}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleEdit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Editar Usuario
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`flex-1 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                deleting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {deleting ? 'Eliminando...' : 'Eliminar Usuario'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
