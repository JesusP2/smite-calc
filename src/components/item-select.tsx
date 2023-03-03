"use client";
import * as Select from "@radix-ui/react-select";
import { CaretUp, CaretDown } from "phosphor-react";
import clsx from "clsx";
import { forwardRef } from "react";
import Image from "next/image";

export default () => (
  <Select.Root>
    <Select.Trigger className="flex justify-between items-center rounded px-[15px] text-sm leading-none h-[35px] gap-[5px] bg-white min-w-[200px] shadow-lg hover:bg-neutral-50 text-indigo-600 outline-none">
      <Select.Value placeholder="Select an item" />
      <Select.Icon className="relative bottom-[4px]">
        <CaretUp size={12} weight="bold" className="text-neutral-500" />
        <CaretDown
          size={12}
          weight="bold"
          className="absolute top-[8px] text-neutral-500"
        />
      </Select.Icon>
    </Select.Trigger>

    <Select.Portal>
      <Select.Content className="overflow-hidden bg-white shadow-lg rounded">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-indigo-700 cursor-default">
          ^
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <SelectItem value="iron-mail">Iron Mail</SelectItem>
          <SelectItem value="tahuti">Rod of Tahuti</SelectItem>
          <Select.Separator />
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-indigo-600 cursor-default">
          <CaretDown size={12} weight="bold" className="text-neutral-500" />
        </Select.ScrollDownButton>
        <Select.Arrow />
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

const SelectItem = forwardRef(
  (
    { children, className, ...props }: Select.SelectItemProps,
    forwardedRef: React.Ref<HTMLDivElement> | undefined
  ) => (
    <Select.Item
      {...props}
      className={clsx(
        "text-[13px] leading-none text-indigo-600 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none",
        "data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-indigo-600 data-[highlighted]:text-indigo-100",
        className
      )}
      ref={forwardedRef}
    >
      <Select.ItemText>
          yo
      </Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center"></Select.ItemIndicator>
    </Select.Item>
  )
);
