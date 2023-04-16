import { type MouseEventHandler, type CSSProperties } from "react"

interface ButtonProps {
  className?: string,
  value: string
  disabled?: boolean,
  type?: "button" | "submit" | "reset",
  style?: CSSProperties,
  onClick?: MouseEventHandler<HTMLButtonElement>,
}

const Button = ({className, value, disabled, type, style, onClick}: ButtonProps) => {
  return (
    <button 
      className={`bg-rose-500 w-28 rounded-3xl p-2 text-white text-lg shadow-md shadow-gray-400 ${className || ''}`} 
      type={type}
      disabled={disabled}
      style={style}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Button;