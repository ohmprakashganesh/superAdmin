import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Sidebar } from "../components/common/Sidebar";

const AdminLayout: React.FC = () => {
  return (
  <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
         <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
