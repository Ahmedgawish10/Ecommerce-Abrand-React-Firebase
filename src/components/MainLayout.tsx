import { Outlet } from "react-router-dom";
import Header from "./Header";
import ThemeProviderMode from "./ThemeProviderMode";
import Users from "./Users";
function MainLayout() {
  return (
      <ThemeProviderMode>
        <Header />
        <main>
          <div className="MainLayout mt-[110px]">
            <Users/>
            <Outlet />
          </div>
        </main>
      </ThemeProviderMode>
  );
}

export default MainLayout;
