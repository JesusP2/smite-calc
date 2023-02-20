import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import clsx from 'clsx';

const ToastComponent = ({
  open,
  setOpen,
  description,
  variant,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  description: string;
  variant: 'error' | 'success';
}) => {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={clsx({
          "rounded-md gap-x-[15px] text-white grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] shadow-2xl items-center py-2 px-4 data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut": true,
          'bg-red-600': variant === 'error',
          'bg-green-600': variant === 'success',
        })}
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="font-inter font-bold text-sm">
          {variant === 'error' ? 'Error' : 'Success'}
        </Toast.Title>
        <Toast.Description asChild>
          <p className="text-xs font-normal text-neutral-200">{description}</p>
        </Toast.Description>
        <Toast.Action
          className="[grid-area:_action]"
          asChild
          altText="Undo error"
        >
          <button>x</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default ToastComponent;
