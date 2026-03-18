import { useState, useEffect } from "react";
import { createStep, getStepsByWorkflow, deleteStep } from "../services/stepService";

function StepBuilder({ workflowId }) {

  const [stepOrder, setStepOrder] = useState("");
  const [role, setRole] = useState("");
  const [stepType, setStepType] = useState("");
  const [steps, setSteps] = useState([]);
  const [rules, setRules] = useState({});

  useEffect(() => {
    if (workflowId) {
      loadSteps();
    }
  }, [workflowId]);

  const loadSteps = async () => {
    const data = await getStepsByWorkflow(workflowId);
    setSteps(data || []);
  };

  const addStep = async () => {

    if (!stepOrder || !role || !stepType) return;

    try {

      await createStep({
        stepOrder: parseInt(stepOrder),
        stepType: stepType,
        role: role,
        workflow: { id: parseInt(workflowId) }
      });

      await loadSteps();

      setStepOrder("");
      setRole("");
      setStepType("");

    } catch (e) {
      console.error(e);
      alert("Step failed - check backend");
    }
  };

  const removeStep = async (id) => {
    await deleteStep(id);
    await loadSteps();
  };

  const handleRuleChange = (stepId, index, key, value) => {
    const updated = { ...rules };
    if (!updated[stepId]) updated[stepId] = [];
    updated[stepId][index][key] = value;
    setRules(updated);
  };

  const addRuleRow = (stepId) => {
    const updated = { ...rules };
    if (!updated[stepId]) updated[stepId] = [];
    updated[stepId].push({
      priority: "",
      condition: "",
      nextStep: "",
      isDefault: false
    });
    setRules(updated);
  };

  const saveRules = async (stepId) => {
    await fetch(`http://localhost:8080/rules/add/${stepId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(rules[stepId] || [])
    });
    alert("Rules saved");
  };

  return (
    <div>

      <h3 className="text-lg font-semibold mb-4">Steps</h3>

      <div className="flex gap-3 mb-4">

        <input
          className="border p-2 rounded w-1/4"
          placeholder="Step Order"
          value={stepOrder}
          onChange={(e) => setStepOrder(e.target.value)}
        />

        <select
          className="border p-2 rounded w-1/4"
          value={stepType}
          onChange={(e) => setStepType(e.target.value)}
        >
          <option value="">Step Type</option>
          <option value="APPROVAL">APPROVAL</option>
          <option value="NOTIFICATION">NOTIFICATION</option>
          <option value="TASK">TASK</option>
        </select>

        <select
          className="border p-2 rounded w-1/4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Role</option>
          <option value="TL">TL</option>
          <option value="MANAGER">MANAGER</option>
          <option value="CEO">CEO</option>
        </select>

        <button onClick={addStep} className="bg-blue-500 text-white px-4 rounded">
          Add
        </button>

      </div>

      {steps.map(s => (

        <div key={s.id} className="border p-3 mb-3 rounded">

          <div className="flex justify-between mb-2">
            <div>
              Step {s.stepOrder} - {s.stepType} - {s.role}
            </div>

            <button onClick={() => removeStep(s.id)} className="text-red-500">
              Delete
            </button>
          </div>

          <button onClick={() => addRuleRow(s.id)} className="text-blue-500 mb-2">
            + Add Rule
          </button>

          {(rules[s.id] || []).map((rule, i) => (
            <div key={i} className="flex gap-2 mb-2">

              <input
                className="border p-1"
                placeholder="Priority"
                onChange={(e) => handleRuleChange(s.id, i, "priority", Number(e.target.value))}
              />

              <input
                className="border p-1 w-64"
                placeholder="Condition (amount > 50000 && country == 'US')"
                onChange={(e) => handleRuleChange(s.id, i, "condition", e.target.value)}
              />

              <input
                className="border p-1"
                placeholder="Next Step (CEO / MANAGER)"
                onChange={(e) => handleRuleChange(s.id, i, "nextStep", e.target.value)}
              />

              <label className="flex items-center gap-1 text-sm">
                Default
                <input
                  type="checkbox"
                  onChange={(e) => handleRuleChange(s.id, i, "isDefault", e.target.checked)}
                />
              </label>

            </div>
          ))}

          <button
            onClick={() => saveRules(s.id)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Save Rules
          </button>

        </div>

      ))}

    </div>
  );
}

export default StepBuilder;