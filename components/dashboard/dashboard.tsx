import React from "react";
import { Container } from "../Container";
import TasksTable from "./components/tasksTable";
import { Task } from "../../types/tasks";
import { User } from "../../types/user";

interface DashboardProps {
  initialTasks: Task[];
  role: User["role"];
  newTaskId?: number | null;
}

function Dashboard({ initialTasks, role, newTaskId }: DashboardProps) {
  return (
    <Container className="flex flex-row flex-wrap justify-between">
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full">
          <thead className="text-center">
            <tr>
              <th
                scope="col"
                className="px-4 md:px-6 py-3 text-xs font-medium text-white uppercase tracking-wider bg-gradient-to-r from-blue-500 to-blue-600 select-none"
              >
                ToDo
              </th>
            </tr>
          </thead>
          <TasksTable
            initialTasks={initialTasks}
            role={role ?? null}
            newTaskId={newTaskId}
          />
        </table>
      </div>
    </Container>
  );
}

export default Dashboard;
