import { useEffect, useState } from "react";
import { getWorkflowFields } from "../services/workflowService";

function DynamicForm({ workflowId }) {

  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadFields();
  }, [workflowId]);

  const loadFields = async () => {
    try {
      const res = await getWorkflowFields(workflowId);
      setFields(res.data);
    } catch (error) {
      console.error("Error loading fields", error);
    }
  };

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div style={{marginTop:"20px"}}>
      <h3>Request Form</h3>

      {fields.map((field) => (
        <div key={field.id} style={{marginBottom:"10px"}}>

          <label>{field.fieldName}</label>

          <input
            type={field.fieldType === "number" ? "number" : "text"}
            required={field.required}
            onChange={(e) =>
              handleChange(field.fieldName, e.target.value)
            }
          />

        </div>
      ))}

    </div>
  );
}

export default DynamicForm;