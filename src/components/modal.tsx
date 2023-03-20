import React from "react";
import { Equalizer } from "phosphor-react";
import ItemSelector from "./item-selector";
import { ItemNames } from "@/lib/types";

export default function Modal({
  onSelect,
}: {
  onSelect: (item: ItemNames) => void;
}) {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button className="bg-white" onClick={() => setShowModal(true)}>
        <Equalizer size={25} />
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <ItemSelector
                onSelect={onSelect}
                closeModal={() => setShowModal(false)}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
