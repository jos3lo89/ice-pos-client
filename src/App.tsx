import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider";
import { routes } from "./router/routes";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ice-pos-theme">
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
};
export default App;
