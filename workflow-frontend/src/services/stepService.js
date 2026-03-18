import API from "../api/api";

export const getStepsByWorkflow = async (workflowId) => {
  const res = await API.get(`/steps/workflow/${workflowId}`);

  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.content)) return res.data.content;
  return [];
};

export const createStep = async (step) => {
  const res = await API.post("/steps", {
    stepOrder: step.stepOrder,
    stepType: step.stepType,
    role: step.role,
    workflow: {
      id: step.workflow.id
    }
  });
  return res;
};

export const deleteStep = async (id) => {
  return API.delete(`/steps/${id}`);
};