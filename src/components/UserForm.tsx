import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserService, createUserService, updateUserService } from '../api/services';
import type { User } from '../types/user';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
}

const UserForm = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = id !== 'new';
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditMode && id) {
      loadUser(parseInt(id));
    }
  }, [id, isEditMode]);

  const loadUser = async (userId: number) => {
    try {
      setLoading(true);
      const response = await getUserService(userId);
      const user: User = response.data;
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    } catch (err) {
      alert('Error al cargar el usuario');
      console.error(err);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'El nombre es obligatorio';
    } else if (formData.first_name.length < 2) {
      newErrors.first_name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'El apellido es obligatorio';
    } else if (formData.last_name.length < 2) {
      newErrors.last_name = 'El apellido debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      if (isEditMode && id) {
        await updateUserService(parseInt(id), formData);
        alert('Usuario actualizado exitosamente');
        navigate(`/user/${id}`);
      } else {
        const response = await createUserService(formData);
        console.log("USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", response);
        alert('Usuario creado exitosamente');
        navigate('/');
      }
    } catch (err) {
      alert(`Error al ${isEditMode ? 'actualizar' : 'crear'} el usuario`);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (isEditMode && id) {
      navigate(`/user/${id}`);
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          {isEditMode ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
                errors.first_name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Ingresa el nombre"
            />
            {errors.first_name && (
              <p className="mt-2 text-sm text-red-600">{errors.first_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700 mb-2">
              Apellido *
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
                errors.last_name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Ingresa el apellido"
            />
            {errors.last_name && (
              <p className="mt-2 text-sm text-red-600">{errors.last_name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 ${
                errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="ejemplo@email.com"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className={`flex-1 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 ${
                submitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {submitting
                ? isEditMode
                  ? 'Actualizando...'
                  : 'Creando...'
                : isEditMode
                ? 'Actualizar Usuario'
                : 'Crear Usuario'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              disabled={submitting}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
