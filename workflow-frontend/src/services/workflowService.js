import API from "../api/api";

export const getWorkflows = async () => {
  const res = await API.get("/workflows");

  if (Array.isArray(res.data)) {
    return res.data;
  } else if (Array.isArray(res.data.content)) {
    return res.data.content;
  } else {
    return [];
  }
};

export const createWorkflow = async (data) => {
  const res = await API.post("/workflows", data);
  console.log("CREATE RESPONSE:", res.data); 
  return res;
};

export const getWorkflowFields = async (workflowId) => {
  const res = await API.get(`/workflow-fields/workflow/${workflowId}`);

  if (Array.isArray(res.data)) {
    return res.data;
  } else if (Array.isArray(res.data.content)) {
    return res.data.content;
  } else {
    return [];
  }
};

export const deleteWorkflow = async (id) => {
  return await API.delete(`/workflows/${id}`);
};