import React, { useEffect, useState } from "react";
import { getRequests, approveRequest, getExecutionLogs } from "../services/requestService";

function ApprovalDashboard() {

  const [requests, setRequests] = useState([]);
  const [role, setRole] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [logs, setLogs] = useState([]);
  const [openRequest, setOpenRequest] = useState(null);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const res = await getRequests();
    setRequests(res.data);
  };

  const handleViewDetails = (req) => {
    if (openRequest?.id === req.id) {
      setOpenRequest(null);
    } else {
      setOpenRequest(req);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this request?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:8080/requests/${id}`, {
      method: "DELETE"
    });

    loadRequests();
  };

  const handleReject = async (id) => {
    if (!role) {
      alert("Enter role");
      return;
    }

    await fetch(`http://localhost:8080/requests/${id}/reject?role=${role}`, {
      method: "PUT"
    });

    loadRequests();
  };

  const handleApprove = async (id) => {
    if (!role) {
      alert("Enter role");
      return;
    }

    await approveRequest(id, role);
    loadRequests();
  };

  const handleViewTimeline = async (id) => {
    if (selectedRequest === id) {
      setSelectedRequest(null);
      setLogs([]);
      return;
    }

    const res = await getExecutionLogs(id);
    setSelectedRequest(id);
    setLogs(res.data);
  };

  const getStatusStyle = (status) => {
    if (status === "APPROVED") return "bg-green-100 text-green-700";
    if (status === "REJECTED") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (

    <div className="p-6">

      <h2 className="text-3xl font-bold mb-6">
        Approval Dashboard
      </h2>

      <div className="bg-white p-6 rounded-xl shadow">

        <div className="mb-4 flex gap-3">
          <input
            placeholder="Enter Role (MANAGER / TL)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded w-1/3"
          />
        </div>

        {requests.length === 0 ? (

          <p className="text-gray-500 text-center">
            No requests available
          </p>

        ) : (

          <table className="w-full text-left border-collapse">

            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">Request ID</th>
                <th className="p-3">Workflow</th>
                <th className="p-3">Status</th>
                <th className="p-3">Step</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {requests.map(r => (

                <React.Fragment key={r.id}>

                  <tr className="border-t hover:bg-gray-50 transition">

                    <td className="p-3 font-medium">
                      #{r.id}
                    </td>

                    <td className="p-3">
                      {r.workflow?.name}
                    </td>

                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(r.status)}`}>
                        {r.status}
                      </span>
                    </td>

                    <td className="p-3">
                      Step {r.currentStep}
                    </td>

                    <td className="p-3 flex gap-2">

                      {r.status === "PENDING" && (
                        <>
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                            onClick={() => handleApprove(r.id)}
                          >
                            Approve
                          </button>

                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            onClick={() => handleReject(r.id)}
                          >
                            Reject
                          </button>
                        </>
                      )}

                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => handleDelete(r.id)}
                      >
                        Delete
                      </button>

                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => handleViewDetails(r)}
                      >
                        View
                      </button>
{/* 
                      <button
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm"
                        onClick={() => handleViewTimeline(r.id)}
                      >
                        Timeline
                      </button> */}

                    </td>

                  </tr>

                  {openRequest?.id === r.id && (

                    <tr>
                      <td colSpan="5" className="bg-gray-50 p-4">

                        <h4 className="font-semibold mb-3">
                          Request Details
                        </h4>

                        <div className="space-y-2 text-sm">

                          {Object.entries(JSON.parse(r.requestData)).map(([key, value]) => (

                            <div key={key} className="flex justify-between border-b pb-1">

                              <span className="font-medium capitalize">
                                {key}
                              </span>

                              <span className="text-gray-600">
                                {value}
                              </span>

                            </div>

                          ))}

                        </div>

                      </td>
                    </tr>

                  )}

                  {selectedRequest === r.id && (

                    <tr>
                      <td colSpan="5" className="bg-gray-50 p-4">

                        <h4 className="font-semibold mb-3">
                          Execution Timeline
                        </h4>

                        {logs.length === 0 ? (

                          <p className="text-gray-400 text-sm">
                            No activity yet
                          </p>

                        ) : (

                          <ul className="space-y-2">

                            {logs.map(log => (

                              <li key={log.id} className="flex items-center gap-3">

                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>

                                <span className="text-sm">
                                  {log.approverRole} approved at step {log.stepOrder}
                                </span>

                              </li>

                            ))}

                          </ul>

                        )}

                      </td>
                    </tr>

                  )}

                </React.Fragment>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

}

export default ApprovalDashboard;