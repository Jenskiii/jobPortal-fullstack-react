import Header from "../components/header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
        <main className="min-h-screen container mx-auto px-3">
          <Header />
          <Outlet />
        </main>
        <div className="p-10 text-center bg-gray-800 mt-10">Footer much woow yeey</div>
    </div>
  );
};

export default AppLayout;
