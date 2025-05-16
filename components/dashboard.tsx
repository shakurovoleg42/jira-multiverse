import React from "react";
import { Container } from "./container";
import TasksTable from "./tasksTable";

function Dashboard() {
  return (
    <Container className="p-4">
      <div className="overflow-x-auto shadow-lg rounded-lg min-w-full">
        <table className="min-w-full">
          <thead className="text-center">
            <tr>
              <th
                scope="col"
                className="px-4 md:px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-gradient-to-r from-blue-500 to-blue-600 select-none"
              >
                ToDo
              </th>
              <th
                scope="col"
                className="px-4 md:px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-gradient-to-r from-yellow-500 to-yellow-600 select-none"
              >
                In progress
              </th>
              <th
                scope="col"
                className="px-4 md:px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-gradient-to-r from-green-500 to-green-600 select-none"
              >
                Done
              </th>
            </tr>
          </thead>
          <TasksTable />
        </table>
      </div>
    </Container>
  );
}

export default Dashboard;
