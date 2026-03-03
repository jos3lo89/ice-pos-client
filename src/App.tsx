import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/tanstack-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { ThemeProvider } from "./presentation/components/theme/theme-provider";
import { TooltipProvider } from "./presentation/components/ui/tooltip";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ice-pos-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <RouterProvider router={routes} />
          <Toaster closeButton richColors position="top-center" />
          <ReactQueryDevtools initialIsOpen={false} />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
