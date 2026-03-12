import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '../hooks/useUser.ts';
import { useCreateUser, useUpdateUser } from '../hooks/useUserMutations.ts';
import { ApiError } from '../utils/errors.ts';
import { userFormSchema, type UserFormData } from '../schemas/userSchema.ts';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { RateLimitError } from '@/components/RateLimitError.tsx';
import { UserFormSkeleton } from '@/components/UserFormSkeleton.tsx';
import { RoleSelector } from '@/components/RoleSelector';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';

const UserForm = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id && id !== 'new';
  const navigate = useNavigate();

  const {
    data: userResponse,
    isLoading,
    error,
  } = useUser(isEditMode && id ? parseInt(id) : undefined);
  const user = userResponse?.data;

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser(id ? parseInt(id) : 0);

  const isRateLimited = error instanceof ApiError && error.isRateLimited;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UserFormData) => {
    if (isEditMode && id) {
      updateMutation.mutate(data, {
        onSuccess: () => {
          toast.success(t('toast.userUpdated'));
          navigate(`/user/${id}`);
        },
        onError: (err) => {
          if (err instanceof ApiError && err.isRateLimited) {
            toast.error(t('errors.rateLimitTitle'));
          } else {
            toast.error(t('toast.errorUpdate'));
          }
        },
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          toast.success(t('toast.userCreated'));
          navigate('/');
        },
        onError: (err) => {
          if (err instanceof ApiError && err.isRateLimited) {
            toast.error(t('errors.rateLimitTitle'));
          } else {
            toast.error(t('toast.errorCreate'));
          }
        },
      });
    }
  };

  const handleCancel = () => {
    if (isEditMode && id) {
      navigate(`/user/${id}`);
    } else {
      navigate('/');
    }
  };

  if (isLoading && isEditMode) {
    return <UserFormSkeleton />;
  }

  if (isRateLimited) {
    return <RateLimitError />;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">
            {isEditMode ? t('userForm.editTitle') : t('userForm.createTitle')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="first_name">{t('userForm.firstName')} *</Label>
              <Input
                type="text"
                id="first_name"
                {...register('first_name')}
                aria-invalid={!!errors.first_name}
                placeholder={t('userForm.firstNamePlaceholder')}
              />
              {errors.first_name && (
                <p className="text-sm text-destructive">
                  {errors.first_name.message === 'userForm.minLength'
                    ? t('userForm.minLength', { field: t('userForm.firstName'), length: 2 })
                    : t(errors.first_name.message || 'userForm.required')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="last_name">{t('userForm.lastName')} *</Label>
              <Input
                type="text"
                id="last_name"
                {...register('last_name')}
                aria-invalid={!!errors.last_name}
                placeholder={t('userForm.lastNamePlaceholder')}
              />
              {errors.last_name && (
                <p className="text-sm text-destructive">
                  {errors.last_name.message === 'userForm.minLength'
                    ? t('userForm.minLength', { field: t('userForm.lastName'), length: 2 })
                    : t(errors.last_name.message || 'userForm.required')}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('userForm.email')} *</Label>
              <Input
                type="email"
                id="email"
                {...register('email')}
                aria-invalid={!!errors.email}
                placeholder={t('userForm.emailPlaceholder')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {t(errors.email.message || 'userForm.required')}
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-border">
              <RoleSelector userId={id && id !== 'new' ? parseInt(id) : 0} />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || createMutation.isPending || updateMutation.isPending}
                className="flex-1 transition-all"
                size="xl"
              >
                {isSubmitting || createMutation.isPending || updateMutation.isPending ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
                {isSubmitting || createMutation.isPending || updateMutation.isPending
                  ? isEditMode
                    ? t('userForm.updating')
                    : t('userForm.creating')
                  : isEditMode
                    ? t('userForm.update')
                    : t('userForm.create')}
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                disabled={isSubmitting || createMutation.isPending || updateMutation.isPending}
                variant="outline"
                className="flex-1"
                size="xl"
              >
                <X className="w-5 h-5" />
                {t('common.cancel')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserForm;
