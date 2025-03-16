import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard({tog}) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white  shadow-md transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform duration-300 ease-in-out`}
      >
        {tog?(<>
          <div className="p-4 border-b text-lg font-semibold">Welcome</div>
        </>):(<>
        
          <div className="p-4 border-b text-lg font-semibold">Dashboard</div>
        </>)}
        <nav className="p-4 space-y-2">
          <button onClick={() => setIsSidebarOpen(false)} className="w-full text-left p-2 hover:bg-gray-200">
            Overview
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="w-full text-left p-2 hover:bg-gray-200">
            Loans
          </button>
          <button onClick={() => setIsSidebarOpen(false)} className="w-full text-left p-2 hover:bg-gray-200">
            Activities
          </button>
        </nav>
        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button 
            className="w-full bg-red-500 text-blue-200 py-2 rounded hover:bg-red-600"
            onClick={() => {
                localStorage.removeItem("token");
                navigate("/login")}
        }
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "Close Menu" : "Open Menu"}
          </button>
        {/* Top Bar */}
         
    </div>
  );
}
