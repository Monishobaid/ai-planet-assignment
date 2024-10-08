import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const App: React.FC = () => {
  return (
    <div className="min-h-screen text-black">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
