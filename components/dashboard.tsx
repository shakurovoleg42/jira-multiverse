import React from "react";
import { Container } from "./container";
import TaskCard from "./taskCard";

function Dashboard() {
  return (
    <Container className="p-4">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full">
          <thead className="text-center">
            <tr>
              <th
                scope="col"
                className="px-4 md:px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-gradient-to-r from-blue-500 to-blue-600"
              >
                ToDo
              </th>
              <th
                scope="col"
                className="px-4 md:px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-gradient-to-r from-yellow-500 to-yellow-600"
              >
                In progress
              </th>
              <th
                scope="col"
                className="px-4 md:px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-gradient-to-r from-green-500 to-green-600"
              >
                Done
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            <tr className="align-top">
              {/* колонка ToDo */}
              <td className="w-1/3 px-4 md:px-6 py-4 bg-blue-50">
                <div className="flex flex-col gap-4">
                  <TaskCard />
                  <TaskCard />
                  <TaskCard />
                </div>
              </td>
              {/* колонка In Progress */}
              <td className="w-1/3 px-4 md:px-6 py-4 bg-yellow-50">
                <div className="flex flex-col gap-4">
                  <TaskCard />
                </div>
              </td>
              {/* колонка Done */}
              <td className="w-1/3 px-4 md:px-6 py-4 bg-green-50">
                <div className="flex flex-col gap-4">
                  <TaskCard />
                  <TaskCard />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default Dashboard;
