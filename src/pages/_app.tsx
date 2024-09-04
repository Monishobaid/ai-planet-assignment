import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function App() {
  return (
    <div className="bg-[#0B2447] min-h-screen text-white">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
