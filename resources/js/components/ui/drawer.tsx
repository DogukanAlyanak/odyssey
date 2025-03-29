import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DrawerProps extends React.ComponentProps<typeof Dialog> {
  direction?: "top" | "bottom" | "left" | "right"
  shouldScaleBackground?: boolean
}

function Drawer({
  direction = "right",
  shouldScaleBackground = true,
  ...props
}: DrawerProps) {
  return (
    <Dialog data-direction={direction} {...props}>
      {shouldScaleBackground && props.open && (
        <div
          className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        />
      )}
      {props.children}
    </Dialog>
  )
}

interface DrawerContentProps
  extends React.ComponentProps<typeof DialogContent> {
  direction?: "top" | "bottom" | "left" | "right"
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  DrawerContentProps
>(({ className, direction = "right", ...props }, ref) => {
  const isHorizontal = direction === "left" || direction === "right"
  const isVertical = direction === "top" || direction === "bottom"

  return (
    <DialogContent
      ref={ref}
      className={cn(
        "fixed z-50 bg-background p-6 shadow-lg duration-500 data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out",
        isHorizontal &&
          "inset-y-0 h-full w-3/4 max-w-sm border-0 p-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
        isVertical &&
          "inset-x-0 w-full max-h-96 border-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        direction === "left" &&
          "left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        direction === "right" &&
          "right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        direction === "top" &&
          "top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        direction === "bottom" &&
          "bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        className
      )}
      {...props}
    />
  )
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <DialogHeader
    className={cn("px-4 pt-6 pb-2 text-left sm:px-6", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogTitle>,
  React.ComponentPropsWithoutRef<typeof DialogTitle>
>(({ className, ...props }, ref) => (
  <DialogTitle
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogDescription>,
  React.ComponentPropsWithoutRef<typeof DialogDescription>
>(({ className, ...props }, ref) => (
  <DialogDescription
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = "DrawerDescription"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <DialogFooter
    className={cn("flex flex-col mt-auto p-4 sm:p-6", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerClose = DialogClose

const DrawerTrigger = DialogTrigger

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
}
