import { useEffect, useState } from "react";
import { getWorkflows } from "../services/workflowService";
import DynamicForm from "../components/DynamicForm";

function WorkflowList() {

const [workflows, setWorkflows] = useState([]);
const [selectedWorkflow, setSelectedWorkflow] = useState(null);

useEffect(() => {
loadWorkflows();
}, []);

const loadWorkflows = async () => {
try {
const res = await getWorkflows();
setWorkflows(res.data);
} catch (error) {
console.error("Error fetching workflows", error);
}
};

return (
<div style={{ padding: "20px" }}> <h2>Available Workflows</h2>

```
  {workflows.length === 0 ? (
    <p>No workflows found</p>
  ) : (
    <ul>
      {workflows.map((workflow) => (
        <li key={workflow.id}>
          <strong>{workflow.name}</strong> — {workflow.description}

          <button
            onClick={() => setSelectedWorkflow(workflow.id)}
            style={{ marginLeft: "10px" }}
          >
            Start Request
          </button>

        </li>
      ))}
    </ul>
  )}

  {selectedWorkflow && (
    <div style={{ marginTop: "20px" }}>
      <DynamicForm workflowId={selectedWorkflow} />
    </div>
  )}
</div>

);
}

export default WorkflowList;
