import { useState, useEffect } from "react";
import { createField, getFieldsByWorkflow, deleteField } from "../services/fieldService";

function FieldBuilder({ workflowId }) {

  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("text");
  const [fields, setFields] = useState([]);

  useEffect(() => {
    if (workflowId) {
      loadFields();
    }
  }, [workflowId]);

  const loadFields = async () => {
    const data = await getFieldsByWorkflow(workflowId);
    setFields(data);
  };

  const addField = async () => {

    if (!fieldName) {
      alert("Field name required");
      return;
    }

    try {
      const data = await createField({
        fieldName,
        fieldType,
        required: true,
        workflow: { id: Number(workflowId) }
      });

      setFields(prev => [...prev, data]);

      setFieldName("");
      setFieldType("text");

    } catch (err) {
      console.error(err);
      alert("Field creation failed");
    }
  };

  const removeField = async (id) => {
    await deleteField(id);
    setFields(prev => prev.filter(f => f.id !== id));
  };

  return (

    <div>

      <h3 className="text-lg font-semibold mb-4">
        Fields
      </h3>

      <div className="flex gap-3 mb-4">

        <input
          className="border p-2 rounded w-1/2"
          placeholder="Field Name"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="date">Date</option>
        </select>

        <button
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
          onClick={addField}
        >
          Add
        </button>

      </div>

      {fields.length === 0 ? (

        <p className="text-gray-400 text-sm">
          No fields added yet
        </p>

      ) : (

        <div className="space-y-2">

          {fields.map(f => (

            <div
              key={f.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded border"
            >

              <div>
                <span className="font-medium">
                  {f.fieldName}
                </span>

                <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                  {f.fieldType}
                </span>
              </div>

              <button
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() => removeField(f.id)}
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default FieldBuilder;