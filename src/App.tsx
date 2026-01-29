import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import { routes } from "./routes/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/tanstack-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ice-pos-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
        <Toaster closeButton richColors position="top-center" />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
