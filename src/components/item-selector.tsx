import Image from "next/image";
import items from "@/../public/items.json";
import { ItemNames } from "@/lib/types";
import Checkbox from "./checkbox";
import clsx from "clsx";
import { useState } from "react";
import { X } from "phosphor-react";
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function ItemSelector({
  onSelect,
  closeModal
}: {
  onSelect: (item: ItemNames) => void;
  closeModal?: () => void;
}) {
  const [showOnlyTier3, setShowOnlyTier3] = useState(false);
  const [filterItem, setFilterItem] = useState("");
  const [parent, enableAnimations] = useAutoAnimate()
  return (
    <div className="max-w-lg h-[20rem] mt-8 mx-auto bg-white font-inter p-2 absolute w-full">
      <h3 className="font-bold text-center">SELECT AN ITEM</h3>
      <button className="absolute top-2 right-2" onClick={() => closeModal?.()}><X weight="bold" /></button>
      <input
        type="search"
        className={clsx("h-6 w-24 mb-2 rounded-sm px-2 text-xs hover:border-gray-300")}
        placeholder="search"
        value={filterItem}
        onChange={(e) => setFilterItem(e.target.value)}
      />
      <div className="mt-2 mb-4 ml-2">
        <Checkbox
          label="Show only tier 3 items"
          id="tier-3-items"
          checked={showOnlyTier3}
          onChange={setShowOnlyTier3}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(121px,1fr))] gap-4 overflow-scroll max-h-[13rem] max-w-lg" ref={parent}>
        {Object.entries(items)
          .filter(([item, itemInfo]) =>
            showOnlyTier3 ? itemInfo.tier === 3 && item.includes(filterItem) : item.includes(filterItem)
          )
          .map(([item, itemInfo]) => (
            <div
              className="group mx-auto hover:cursor-pointer h-[35px]"
              key={itemInfo.icon}
              onClick={() => onSelect(item as ItemNames)}
            >
              <div className="relative w-full">
                <div className="group-hover:w-full group-hover:h-[calc(100%)] bg-gray-800 group-hover:absolute bg-opacity-50 cursor-pointer" />
                <Image
                  src={itemInfo.icon}
                  alt={itemInfo.name}
                  width={35}
                  height={35}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
