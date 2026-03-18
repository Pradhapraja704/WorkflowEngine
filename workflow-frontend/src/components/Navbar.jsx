import { NavLink } from "react-router-dom";

function Navbar() {

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-400 font-medium"
      : "hover:text-blue-400 transition";

  return (

    <div className="bg-gray-900 text-white shadow">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold tracking-wide">
          Workflow Engine
        </h1>

        <div className="flex gap-8 text-sm">

          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/builder" className={linkClass}>
            Workflow Builder
          </NavLink>

          <NavLink to="/requests" className={linkClass}>
            Submit Request
          </NavLink>

          <NavLink to="/approvals" className={linkClass}>
            Approvals
          </NavLink>

        </div>

      </div>

    </div>

  );

}

export default Navbar;