import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />

      <div className="app-layout">
        <Sidebar />

        <div className="main-content">
          <AppRoutes />
        </div>
      </div>
    </>
  );
}

export default App;