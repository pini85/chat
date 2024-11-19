import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import Button from "@mui/material/Button";
import { ButtonProps as MuiButtonProps } from "@mui/material";

interface CustomButtonProps extends MuiButtonProps {
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  children: ReactNode;
}

const CustomButton: FC<CustomButtonProps> = ({
  onClick,
  type = "button",
  color = "secondary",
  variant = "contained",
  size = "medium",
  disabled = false,
  fullWidth = false,
  children,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      color="secondary"
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
