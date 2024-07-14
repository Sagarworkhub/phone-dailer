import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '~/utils/cn';

const buttonVariants = cva(
    'flex items-center justify-center rounded-lg text-black',
    {
        variants: {
            variant: {
                default: 'bg-black text-white',
                primary: ' text-black',
                outline: 'border border-gray-400 text-black',
                numberPad: 'm-auto flex flex-col rounded-full text-black',
                numberPadPrimary:
                    'm-auto flex flex-col rounded-full bg-[#F5f5f5] text-black',
            },
            size: {
                default: 'h-8 px-3 text-[14px]',
                numberPad: 'size-[72px]',
                homeRow: 'flex h-16 w-[75px] flex-col gap-1',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
