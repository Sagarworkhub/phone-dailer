import { cva, type VariantProps } from 'class-variance-authority';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn } from '~/utils/cn';

const modalVariants = cva(
    'fixed z-50 bg-white p-6 shadow-lg transition-all duration-300 ease-in-out',
    {
        variants: {
            size: {
                default: 'w-full max-w-lg',
                small: 'w-80 max-w-sm',
                large: 'w-full max-w-xl',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    },
);

interface ModalProps extends VariantProps<typeof modalVariants> {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    showCloseIcon?: boolean;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    size,
    showCloseIcon = true,
    className,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = useCallback(
        (event: React.MouseEvent<HTMLDivElement>) => {
            if (event.target === event.currentTarget) {
                onClose();
            }
        },
        [onClose],
    );

    if (!isMounted) return null;

    return createPortal(
        isOpen ? (
            <div
                className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50'
                onClick={handleOverlayClick}
                aria-modal='true'
                role='dialog'
            >
                <div
                    className={cn(
                        modalVariants({ size }),
                        'relative rounded-lg',
                        className,
                    )}
                >
                    {showCloseIcon && (
                        <button
                            onClick={onClose}
                            className='absolute right-4 top-4 text-gray-500 hover:text-gray-700'
                            aria-label='Close modal'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='size-6'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                    )}
                    {children}
                </div>
            </div>
        ) : null,
        document.body,
    );
};

export const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => (
    <div
        className={cn(
            'mb-2 flex flex-col space-y-1.5 text-center sm:text-left',
            className,
        )}
        {...props}
    />
);

export const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    ...props
}) => <div className={cn('mt-6', className)} {...props} />;

export const ModalTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
    className,
    ...props
}) => (
    <h2
        className={cn(
            'text-base font-semibold leading-none tracking-tight',
            className,
        )}
        {...props}
    />
);

export const ModalDescription: React.FC<
    React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ...props }) => (
    <p className={cn('text-sm text-gray-500', className)} {...props} />
);
