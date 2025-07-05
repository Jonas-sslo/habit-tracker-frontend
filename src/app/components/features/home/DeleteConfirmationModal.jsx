'use client';

import { getBg } from '@/app/utils/theme';
import { useTheme } from 'next-themes';
import Button from '../../Button';

export default function DeleteConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Excluir hábito',
    message = 'Você tem certeza que deseja excluir este hábito? Esta ação não pode ser desfeita.',
    confirmText = 'Excluir',
    cancelText = 'Cancelar',
}) {
    const { theme } = useTheme();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className={`${getBg(theme)} border-2 border-red-500 rounded-2xl p-6 max-w-md w-full`}
            >
                <h2 className="text-center text-lg font-semibold mb-4 light:text-black">{title}</h2>
                <p className="mb-6">{message}</p>

                <div className="flex justify-end gap-3">
                    <Button onClick={onClose} className="rounded-md">
                        {cancelText}
                    </Button>
                    <Button onClick={onConfirm} color="red" className="rounded-md">
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
