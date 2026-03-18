import { useEffect, useState } from "react";
import { getWorkflows, getWorkflowFields } from "../services/workflowService";
import { createRequest } from "../services/requestService";

function SubmitRequest() {

  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState("");
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    const data = await getWorkflows();
    setWorkflows(data);
  };

  const handleWorkflowChange = async (workflowId) => {

    setSelectedWorkflow(workflowId);

    if (!workflowId) {
      setFields([]);
      return;
    }

    const data = await getWorkflowFields(workflowId);
    setFields(data);

    setFormData({});
    setError("");
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {

    if (!selectedWorkflow) {
      alert("Please select a workflow");
      return;
    }

    if (Object.keys(formData).length === 0) {
      alert("Please fill the form");
      return;
    }

    const start = formData.startDate;
    const end = formData.endDate;

    if (start && end) {

      const startDate = new Date(start);
      const endDate = new Date(end);

      if (endDate < startDate) {
        setError("End Date cannot be before Start Date");
        return;
      }

    }

    setError("");

    await createRequest({
  workflow: { id: Number(selectedWorkflow) },
  requestData: JSON.stringify(formData),
  amount: "0"
});

    alert("Request submitted");

    setFormData({});
    setFields([]);
    setSelectedWorkflow("");
  };

  return (

    <div className="flex justify-center">

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-6">
          Submit Request
        </h2>

        <select
          value={selectedWorkflow}
          onChange={(e) => handleWorkflowChange(e.target.value)}
          className="w-full border p-2 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Workflow</option>

          {workflows.map(w => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}

        </select>

        {fields.length === 0 ? (

          <p className="text-gray-400 text-sm mb-4">
            Select a workflow to load form fields
          </p>

        ) : (

          <div className="space-y-4">

            {fields.map(f => (

              <div key={f.id} className="flex flex-col">

                <label className="mb-1 font-medium">
                  {f.fieldName === "startDate"
                    ? "Start Date"
                    : f.fieldName === "endDate"
                    ? "End Date"
                    : f.fieldName}
                </label>

                <input
                  type={
                    f.fieldType === "number"
                      ? "number"
                      : f.fieldType === "date"
                      ? "date"
                      : "text"
                  }
                  onChange={(e) =>
                    handleChange(f.fieldName, e.target.value)
                  }
                  className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

              </div>

            ))}

          </div>

        )}

        {error && (
          <p className="text-red-500 text-sm mt-3">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedWorkflow}
          className={`mt-6 w-full py-2 rounded transition 
            ${selectedWorkflow
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Submit Request
        </button>

      </div>

    </div>

  );

}

export default SubmitRequest;