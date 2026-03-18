import { useState, useEffect } from "react";
import { getWorkflows, createWorkflow, deleteWorkflow } from "../services/workflowService";
import StepBuilder from "../components/StepBuilder";
import FieldBuilder from "../components/FieldBuilder";

function WorkflowBuilder() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    const data = await getWorkflows();
    setWorkflows(data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this workflow?");
    if (!confirmDelete) return;

    try {
      await deleteWorkflow(id);

      setWorkflows(prev => prev.filter(w => w.id !== id));

      if (selectedWorkflow === id) {
        setSelectedWorkflow(null);
      }

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  const handleCreate = async () => {

  if (!name) {
    alert("Workflow name required");
    return;
  }

  try {
    const res = await createWorkflow({
      name,
      description
    });

    console.log("CREATED:", res.data);

    setWorkflows(prev => [...prev, res.data]);

    setName("");
    setDescription("");

  } catch (err) {
    console.error("CREATE ERROR:", err);
    alert("Create failed");
  }
};

  return (
    <div>

      <h2 className="text-3xl font-bold mb-6">
        Workflow Builder
      </h2>

      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h3 className="text-lg font-semibold mb-4">
          Create New Workflow
        </h3>

        <div className="grid md:grid-cols-3 gap-4">

          <input
            className="border p-2 rounded w-full"
            placeholder="Workflow Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={handleCreate}
          >
            Create
          </button>

        </div>

      </div>

      <h3 className="text-xl font-semibold mb-4">
        Existing Workflows
      </h3>

      {workflows.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          No workflows created yet
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {workflows.map((w) => (

            <div
              key={w.id}
              className={`bg-white p-5 rounded-lg shadow hover:shadow-lg transition 
                ${selectedWorkflow === w.id ? "ring-2 ring-blue-400" : ""}`}
            >

              <h4 className="font-semibold text-lg">
                {w.name}
              </h4>

              <p className="text-gray-600 mt-2">
                {w.description}
              </p>

              <div className="flex gap-3 mt-4">

                <button
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  onClick={() => setSelectedWorkflow(w.id)}
                >
                  Configure
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(w.id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

      {selectedWorkflow && (
  <div className="mt-10 bg-white p-6 rounded-xl shadow">

    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold">
        Configure Workflow
      </h3>

      <button
        className="bg-gray-300 hover:bg-gray-400 px-3 py-1 rounded"
        onClick={() => setSelectedWorkflow(null)}
      >
        OK
      </button>
    </div>

    <p className="text-sm text-gray-500 mb-6">
      Add steps and fields for this workflow
    </p>

          <div className="grid md:grid-cols-2 gap-10">

            <StepBuilder workflowId={selectedWorkflow} />
            <FieldBuilder workflowId={selectedWorkflow} />

          </div>

        </div>
      )}

    </div>
  );
}

export default WorkflowBuilder;