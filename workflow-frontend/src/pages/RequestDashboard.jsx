import { useEffect, useState } from "react";
import { getRequests } from "../services/requestService";

function RequestDashboard() {

  const [requests, setRequests] = useState([]);
  const [approvers, setApprovers] = useState({});

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    const res = await getRequests();
    setRequests(res.data);
    loadApprovers(res.data);
  };

  const getCurrentApprover = async (id) => {
    const res = await fetch(`http://localhost:8080/requests/${id}/current-approver`);
    return await res.text();
  };

  const loadApprovers = async (requestsList) => {
    const map = {};

    for (let r of requestsList) {
      const role = await getCurrentApprover(r.id);
      map[r.id] = role;
    }

    setApprovers(map);
  };

  const approve = async (id) => {
    const role = approvers[id];

    await fetch(`http://localhost:8080/requests/${id}/approve?role=${role}`, {
      method: "PUT"
    });

    loadRequests();
  };

  const reject = async (id) => {
    const role = approvers[id];

    await fetch(`http://localhost:8080/requests/${id}/reject?role=${role}`, {
      method: "PUT"
    });

    loadRequests();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pending Requests</h2>

      {requests.length === 0 ? (
        <p>No requests</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Workflow</th>
              <th>Status</th>
              <th>Step</th>
              <th>Current Approver</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.workflow.name}</td>
                <td>{r.status}</td>
                <td>{r.currentStep}</td>
                <td>{approvers[r.id]}</td>

                <td>
                  <button onClick={() => approve(r.id)}>
                    Approve
                  </button>

                  <button onClick={() => reject(r.id)} style={{ marginLeft: "10px" }}>
                    Reject
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

    </div>
  );
}

export default RequestDashboard;