import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";   
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from "./Routes/Routes";
import AuthProvider from "./Authintication/AuthProvider/AuthProvider";

// Create a new QueryClient instance
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider> 
        <div className="">
          <RouterProvider router={router} />
        </div> 
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
