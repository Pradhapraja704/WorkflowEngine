import { useEffect, useState } from "react";
import { getExecutionLogs } from "../services/requestService";

function RequestTimeline({ requestId }) {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (requestId) {
      loadLogs();
    }
  }, [requestId]);

  const loadLogs = async () => {
    const res = await getExecutionLogs(requestId);
    setLogs(res.data);
  };

  return (

    <div className="mt-6 bg-white p-4 rounded-lg shadow">

      <h3 className="font-semibold mb-4">
        Timeline
      </h3>

      {logs.length === 0 ? (

        <p className="text-gray-400">
          No activity yet
        </p>

      ) : (

        <ul className="space-y-3">

          {logs.map((log, index) => (

            <li
              key={log.id}
              className="flex items-center gap-3"
            >

              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>

              <div className="text-sm">
                <span className="font-medium">
                  {log.action}
                </span>
                {" "}by{" "}
                <span className="text-gray-600">
                  {log.role}
                </span>
              </div>

            </li>

          ))}

        </ul>

      )}

    </div>

  );

}

export default RequestTimeline;