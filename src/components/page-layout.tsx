"use client";
import GodSelection from "@/components/god-selection";
import { GodsNames } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import Toast from "./toast";
import ItemSelector from "./item-selector";
import items from "@/../public/items.json";

export default function PageLayout() {
  const [gods, setGods] = useState<GodsNames[]>([]);
  const [open, setOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState<{
    variant: "success" | "error";
    description: string;
  }>({
    variant: "success",
    description: "",
  });
  const timerRef = useRef(0);

  function onGodSelect(god: GodsNames) {
    if (gods.length >= 10) {
      setToastInfo({
        variant: "error",
        description: "updated",
      });
      setOpen(false);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setOpen(true);
      }, 100);
    } else {
      setGods((gods) => [...gods, god]);
    }
  }

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div>
      <Toast
        open={open}
        setOpen={setOpen}
        variant={toastInfo.variant}
        description={toastInfo.description}
      />
      <ItemSelector onSelect={(item) => console.log(items[item])} />
      {gods.length >= 1 ? null : (
        <GodSelection onSelect={(god) => onGodSelect(god)} />
      )}
    </div>
  );
}
