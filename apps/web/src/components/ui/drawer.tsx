"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

interface DrawerContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DrawerContext = React.createContext<DrawerContextValue>({
  open: false,
  onOpenChange: () => {},
})

export function Drawer({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: {
  children: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen
  const onOpenChange = controlledOnOpenChange || setInternalOpen

  return (
    <DrawerContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DrawerContext.Provider>
  )
}

export function DrawerTrigger({
  children,
  asChild,
  ...props
}: React.HTMLAttributes<HTMLElement> & { asChild?: boolean }) {
  const { onOpenChange } = React.useContext(DrawerContext)
  const Comp = asChild ? Slot : "button"

  return (
    <Comp onClick={() => onOpenChange(true)} {...props}>
      {children}
    </Comp>
  )
}

export function DrawerContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, onOpenChange } = React.useContext(DrawerContext)

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/60"
            onClick={() => onOpenChange(false)}
          />
          <div
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl border p-6 shadow-lg max-h-[85vh] overflow-auto",
              className,
            )}
            {...props}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-muted" />
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid gap-1.5 text-center sm:text-left mb-4", className)} {...props} />
  )
}

export function DrawerTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
  )
}
