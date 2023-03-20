"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog-primitive"

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>yo</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <button>yo</button>
          </div>
        </div>
        <DialogFooter>
          <button>save changes</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

