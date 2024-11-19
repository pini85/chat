import React, { useMemo } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "@/layouts/MainLayOut";
import { Paths } from "@/config/paths";
import { Home } from "../../pages/Home";
import { Login } from "../../pages/Login";
import { Chat } from "@/pages/Chat";
import { NotFound } from "@/pages/NotFound";
import { chatMessagesLoader } from "../loaders/chatMessagesLoader";

// Global loading fallback component
const LoadingFallback = () => <div>Loading...</div>;

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: Paths.HOME,
      element: (
        <React.Suspense fallback={<LoadingFallback />}>
          <Layout />
        </React.Suspense>
      ),
      children: [
        {
          path: Paths.HOME,
          element: (
            <React.Suspense fallback={<div>Loading Home...</div>}>
              <Home />
            </React.Suspense>
          ),
          lazy: async () => {
            const { Home } = await import("../../pages/Home");
            return { Component: Home };
          },
        },
        {
          path: Paths.LOGIN,
          element: (
            <React.Suspense fallback={<div>Loading Login...</div>}>
              <Login />
            </React.Suspense>
          ),
          lazy: async () => {
            const { Login } = await import("../../pages/Login");
            return { Component: Login };
          },
        },
        {
          path: Paths.CHAT,
          element: (
            <React.Suspense fallback={<LoadingFallback />}>
              <PrivateRoute />
            </React.Suspense>
          ),
          children: [
            {
              path: Paths.CHAT,
              element: (
                <React.Suspense fallback={<div>Loading Chat...</div>}>
                  <Chat />
                </React.Suspense>
              ),
              lazy: async () => {
                const { Chat } = await import("@/pages/Chat");
                return { Component: Chat };
              },
            },
            {
              path: `${Paths.CHAT}/:id`,
              element: (
                <React.Suspense fallback={<div>Loading Chat...</div>}>
                  <Chat />
                </React.Suspense>
              ),
              lazy: async () => {
                const { Chat } = await import("@/pages/Chat");
                return { Component: Chat };
              },
              loader: chatMessagesLoader(queryClient),
            },
          ],
        },
        {
          path: "*",
          element: (
            <React.Suspense fallback={<div>Loading Not Found...</div>}>
              <NotFound />
            </React.Suspense>
          ),
          lazy: async () => {
            const { NotFound } = await import("@/pages/NotFound");
            return { Component: NotFound };
          },
        },
      ],
    },
  ]);

// AppRouter component
export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return (
    <React.Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
};
