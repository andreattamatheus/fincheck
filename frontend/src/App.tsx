import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Router } from "./Router";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/contexts/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
