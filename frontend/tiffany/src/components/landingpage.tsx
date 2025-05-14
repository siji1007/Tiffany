import { Outlet, NavLink } from "react-router-dom";

const LandingPage = () => {
  const navLinkClass =
    "px-4 py-2 rounded transition-colors duration-200 hover:bg-blue-800";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0B2B50] text-white flex flex-col p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Tiffany</h2>
        <NavLink to="/admin/dashboard" className={({ isActive }) => `${navLinkClass} ${isActive ? "bg-blue-800" : ""}` } > Dashboard </NavLink>
        <NavLink to="/admin/products" className={({ isActive }) => `${navLinkClass} ${isActive ? "bg-blue-800" : ""}` } > Products </NavLink>
        <NavLink to="/admin/inventory" className={({ isActive }) => `${navLinkClass} ${isActive ? "bg-blue-800" : ""}` } > Inventory </NavLink>
        <NavLink to="/admin/sales" className={({ isActive }) => `${navLinkClass} ${isActive ? "bg-blue-800" : ""}` } > Sales </NavLink>
        <NavLink to="/admin/reports" className={({ isActive }) => `${navLinkClass} ${isActive ? "bg-blue-800" : ""}` } > Reports </NavLink>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default LandingPage;
