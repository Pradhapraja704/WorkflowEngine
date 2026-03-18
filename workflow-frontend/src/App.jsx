import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import SubmitRequest from "./pages/SubmitRequest";
import ApprovalDashboard from "./pages/ApprovalDashboard";

function App() {

  return (

    <BrowserRouter>

      <div className="min-h-screen bg-gray-100">

        <Navbar />

        <div className="max-w-7xl mx-auto p-6">

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/builder" element={<WorkflowBuilder />} />

            <Route path="/requests" element={<SubmitRequest />} />

            <Route path="/approvals" element={<ApprovalDashboard />} />

          </Routes>

        </div>

      </div>

    </BrowserRouter>

  );

}

export default App;