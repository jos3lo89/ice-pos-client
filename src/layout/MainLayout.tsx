import { ModeToggle } from "@/components/theme/mode-toggle";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <header>
        <ModeToggle />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default MainLayout;
