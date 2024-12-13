import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";
import ThemeProviderMode from "../components/ThemeProviderMode";
import Footer from "../components/common/footer/Footer";
import Wish from "../pages/Wish";
function MainLayout() {

  return (
      <ThemeProviderMode>
        <div className="App">
        <Header />
        <main>
          <div className="MainLayout mt-[110px]">
            <Outlet />
            {/* <Wish/> */}
          </div>
        </main>
        <Footer/>
        </div>
      </ThemeProviderMode>
  );
}

export default MainLayout;
