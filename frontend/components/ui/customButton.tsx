import * as React from "react"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const Button = ({
  children,
  className,
  onClick,
  type,
  disabled = false,
  ...props // Spread operator to allow additional HTML button attributes
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cn(
        // Base styles
        "inline-flex items-center justify-center rounded-md text-sm font-medium",
        // Gradient background
        "gradient-button-bg p-[1px]",
        // Focus styles
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        // Disabled styles
        "disabled:pointer-events-none disabled:opacity-50",
        // Allow custom classes to override defaults
        className
      )}
      {...props}
    >
      {/* Inner container for content */}
      <div className="gradient-button flex h-full w-full items-center justify-center rounded-[6px]">
        {children}
      </div>
    </button>
  )
}

export default Button

// Example usage
// import Button from "./Button"
// import { Plus } from "lucide-react"

// // Basic usage
// <Button onClick={() => console.log("Clicked!")}>
//   Click me
// </Button>

// // With custom className
// <Button className="bg-blue-500 text-white">
//   Blue Button
// </Button>

// // Disabled button
// <Button disabled>
//   Disabled Button
// </Button>

// // With icon
// <Button>
//   <Plus className="mr-2 h-4 w-4" /> Add Item
// </Button>

// // As a submit button in a form
// <form onSubmit={handleSubmit}>
//   {/* form fields */}
//   <Button type="submit">Submit</Button>
// </form>

// // With custom attributes
// <Button aria-label="Close dialog" onClick={closeDialog}>
//   Close
// </Button>
