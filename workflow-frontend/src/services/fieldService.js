import API from "../api/api";

export const getFieldsByWorkflow = async (workflowId) => {
  const res = await API.get(`/workflow-fields/workflow/${workflowId}`);

  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.content)) return res.data.content;
  return [];
};

export const createField = async (data) => {
  const res = await API.post("/workflow-fields", data);
  return res.data;
};

export const deleteField = async (id) => {
  return API.delete(`/workflow-fields/${id}`);
};