import { useEffect, useState } from "react";
import { getWorkflows } from "../services/workflowService";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [workflows, setWorkflows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    const data = await getWorkflows();
    setWorkflows(data);
  };

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      {workflows.length === 0 ? (

        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No workflows available
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {workflows.map((w) => (

            <div
              key={w.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >

              <h3 className="text-lg font-semibold">
                {w.name}
              </h3>

              <p className="text-gray-600 mt-2">
                {w.description}
              </p>

              <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => navigate("/requests")}
              >
                Submit Request
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Dashboard;