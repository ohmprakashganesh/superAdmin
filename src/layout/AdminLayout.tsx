import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Sidebar } from "../components/common/Sidebar";

const AdminLayout: React.FC = () => {
  return (
<div className="w-screen">
 <div className="flex max-w-7xl mx-auto bg-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto px-2">
          <div className="max-w-7xl mx-auto">
         <Outlet />
          </div>
        </main>
      </div>
    </div>
    </div>
 
  )
}

export default AdminLayout
