import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";
import ThemeProviderMode from "../components/ThemeProviderMode";
function MainLayout() {
  return (
      <ThemeProviderMode>
        <Header />
        <main>
          <div className="MainLayout mt-[110px]">
            <Outlet />
          </div>
        </main>
      </ThemeProviderMode>
  );
}

export default MainLayout;
