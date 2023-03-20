"use client";

import React, { Dispatch, SetStateAction } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { cn } from "@/lib/utils";

export default ({
  className,
  label,
  id,
  checked,
  onChange,
}: {
  className?: string;
  label?: string;
  id?: string;
  checked?: boolean;
  onChange?: Dispatch<SetStateAction<boolean>>;
}) => (
  <div className="flex items-center">
    <Checkbox.Root
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-500 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900",
        className
      )}
      checked={checked}
      onCheckedChange={(e) => onChange?.(e.valueOf() as boolean)}
      id={id}
    >
      <Checkbox.Indicator>
        <Check weight="bold" size={14} />
      </Checkbox.Indicator>
    </Checkbox.Root>
    {label ? (
      <label
        className="pl-[15px] text-sm leading-none text-black cursor-pointer"
        htmlFor={id}
      >
        {label}
      </label>
    ) : null}
  </div>
);
