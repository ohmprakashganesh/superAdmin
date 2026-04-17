import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Sidebar } from "../components/common/Sidebar";

const AdminLayout: React.FC = () => {
  return (
<div className="w-screen bg-gray-200 h-screen ">
    <div className="h-screen flex max-w-[2200px] mx-auto bg-gray-200 overflow-hidden">
      <Sidebar />
      <div className="flex-1 sticky flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1  overflow-y-auto py-2 px-2">
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
