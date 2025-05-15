import React from "react";
import { Container } from "./container";
import TaskCard from "./taskCard";

function Dashboard() {
  return (
    <Container className="">
      <table className="min-w-full">
        <thead className="bg-gray-50 text-center">
          <tr className="flexflex-wrap">
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-2"
            >
              ToDo
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-2"
            >
              In progress
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider border-2"
            >
              Done
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap border-2">
              <TaskCard />
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-2">
              <TaskCard />
            </td>
            <td className="px-6 py-4 whitespace-nowrap border-2">
              <TaskCard />
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

export default Dashboard;
