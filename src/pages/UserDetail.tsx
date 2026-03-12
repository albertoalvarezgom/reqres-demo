import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../hooks/useUser.ts';
import { useUsers } from '../hooks/useUsers.ts';
import { useDeleteUser } from '../hooks/useUserMutations.ts';
import { ApiError } from '../utils/errors.ts';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';
import { RateLimitError } from '@/components/RateLimitError.tsx';
import { ErrorMessage } from '@/components/ErrorMessage.tsx';
import { UserDetailSkeleton } from '@/components/UserDetailSkeleton.tsx';
import { RoleSelector } from '@/components/RoleSelector';
import { ArrowLeft, Edit, Trash2, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const UserDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentPage] = useState(1);
  const navigate = useNavigate();

  const { data: userResponse, isLoading, error, isError } = useUser(id ? parseInt(id) : undefined);
  const user = userResponse?.data;

  const { data: usersData } = useUsers(currentPage);
  const users = usersData?.data || [];

  const deleteMutation = useDeleteUser();

  const isRateLimited = error instanceof ApiError && error.isRateLimited;

  const currentUserId = id ? parseInt(id) : undefined;
  const currentUserIndex = users.findIndex((u) => u.id === currentUserId);
  const hasPrevious = currentUserIndex > 0;
  const hasNext = currentUserIndex >= 0 && currentUserIndex < users.length - 1;

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrevious) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && hasNext) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasPrevious, hasNext, currentUserIndex]);

  const handlePrevious = () => {
    if (hasPrevious) {
      const previousUser = users[currentUserIndex - 1];
      navigate(`/user/${previousUser.id}`);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      const nextUser = users[currentUserIndex + 1];
      navigate(`/user/${nextUser.id}`);
    }
  };

  const handleEdit = () => {
    navigate(`/user/${id}/edit`);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (!id) return;

    setShowDeleteDialog(false);

    deleteMutation.mutate(parseInt(id), {
      onSuccess: () => {
        toast.success(t('toast.userDeleted'));
        navigate('/', { replace: true });
      },
      onError: (err) => {
        if (err instanceof ApiError && err.isRateLimited) {
          toast.error(t('errors.rateLimitTitle'));
        } else {
          toast.error(t('toast.errorDelete'));
        }
      },
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between items-center border-b border-border pb-3">
      <span className="font-semibold text-foreground">{label}:</span>
      <span className="text-muted-foreground">{value}</span>
    </div>
  );

  if (isLoading) {
    return <UserDetailSkeleton />;
  }

  if (isRateLimited) {
    return <RateLimitError />;
  }

  if ((isError && !isRateLimited) || !user) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        <ErrorMessage
          title={t('userDetail.notFound')}
          message={error?.message || t('userDetail.notFound')}
          onRetry={() => window.location.reload()}
          retryLabel={t('common.retry')}
        />
        <div className="mt-6">
          <Button onClick={handleBack} variant="outline">
            {t('common.back')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4" />
          {t('common.back')}
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={!hasPrevious}
            aria-label={t('userDetail.previousUser')}
          >
            <ChevronLeft className="w-4 h-4" />
            {t('userDetail.previous')}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={!hasNext}
            aria-label={t('userDetail.nextUser')}
          >
            {t('userDetail.next')}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
            <div className="flex flex-col items-center text-center">
              <img
                src={user.avatar}
                alt={`${user.first_name} ${user.last_name}`}
                className="w-48 h-48 rounded-full object-cover shadow-lg mb-4"
              />
              <h1 className="text-2xl font-bold">
                {user.first_name} {user.last_name}
              </h1>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-6">{t('userDetail.title')}</h2>
                <div className="space-y-4 mb-6">
                  <InfoRow label={t('userDetail.fields.id')} value={user.id} />
                  <InfoRow label={t('userDetail.fields.firstName')} value={user.first_name} />
                  <InfoRow label={t('userDetail.fields.lastName')} value={user.last_name} />
                  <InfoRow label={t('userDetail.email')} value={user.email} />
                </div>
              </div>

              <div className="pb-6 border-b border-border">
                <RoleSelector userId={user.id} />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button onClick={handleEdit} className="flex-1" size="lg">
                  <Edit className="w-5 h-5" />
                  {t('userDetail.edit')}
                </Button>
                <Button
                  onClick={handleDeleteClick}
                  disabled={deleteMutation.isPending}
                  variant="destructive"
                  className="flex-1 transition-all"
                  size="lg"
                >
                  {deleteMutation.isPending ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                  {deleteMutation.isPending ? t('userDetail.deleting') : t('userDetail.delete')}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              {t('deleteDialog.title')}
            </DialogTitle>
            <DialogDescription>
              {t('deleteDialog.description')}{' '}
              <strong>
                {user?.first_name} {user?.last_name}
              </strong>
              ?{t('deleteDialog.warning')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={deleteMutation.isPending}
            >
              {t('common.cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
              className="transition-all"
            >
              {deleteMutation.isPending ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
              {deleteMutation.isPending ? t('userDetail.deleting') : t('deleteDialog.confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDetail;
