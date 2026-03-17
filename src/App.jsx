import { Outlet } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { GlobalProvider } from "./context/GlobalContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Zoom } from "react-toastify";

function App() {
  return (
    <div className="main flex">
      <GlobalProvider>
        <Navigation />
        <Outlet />
        <ToastContainer
          autoClose={1500}
          position="top-center"
          pauseOnHover={false}
          theme="colored"
          hideProgressBar
          transition={Zoom}
        />
      </GlobalProvider>
    </div>
  );
}

export default App;
