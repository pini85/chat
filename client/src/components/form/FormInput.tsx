import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type FormInputProps = {
  handleOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputLabel?: string;
} & TextFieldProps;

const FormInput: React.FC<FormInputProps> = ({
  handleOnChange,
  inputLabel,
  ...props
}) => {
  const theme = useTheme();

  return (
    <TextField
      {...props}
      fullWidth
      onChange={handleOnChange}
      label={inputLabel}
      variant="outlined"
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#ffffff", // Set input background to white
          "& fieldset": {
            borderColor: theme.palette.secondary.main,
          },
          "&:hover fieldset": {
            borderColor: theme.palette.primary.light,
          },
          "&.Mui-focused fieldset": {
            borderColor: theme.palette.primary.main,
          },
        },
        "& .MuiInputBase-input": {
          color: theme.palette.text.primary,
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.text.primary,
        },
      }}
    />
  );
};

export default FormInput;
