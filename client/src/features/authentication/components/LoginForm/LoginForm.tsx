import React, { useState } from "react";
import { Button, Box, Typography, Alert } from "@mui/material";
import FormInput from "@/components/form/FormInput";
import { inputFields } from "../../config/inputFields";
import { useLogin } from "@/features/authentication/hooks/queries/useLogin";

interface IFormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<IFormData>({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loginMutation = useLogin({
    onError: () => {
      setErrorMessage("user name or password is incorrect");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const { username, password } = formData;
    loginMutation.mutate({ username, password });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: 6,
        maxWidth: "500px",
        margin: "auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "12px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Login
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ width: "100%", marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {inputFields.map((input) => (
        <FormInput
          key={input.name}
          {...input}
          handleOnChange={handleChange}
          value={formData[input.name as keyof IFormData]}
        />
      ))}

      <Button
        type="submit"
        disabled={loginMutation.isPending}
        variant="contained"
        color="secondary"
        fullWidth
        sx={{ fontSize: "1.1rem", padding: "14px", marginTop: 3 }}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
