import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import * as React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/configureStore";
import theme from "@/styles/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { queryClient } from "@/lib/react-query";
import "@/styles/index.css";
import { AuthProvider } from "@/features/authentication/context/AuthContext";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {import.meta.env.DEV && <ReactQueryDevtools />}
        <Provider store={store}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
          {/* can you cssBaseLine or the css reset from styles */}
          <CssBaseline />
        </Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
