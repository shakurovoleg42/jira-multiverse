import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { taskService } from "@/service/task.service";
import { Alert } from "./ui/alert";
interface Task {
  title: string;
  description: string;
}

const AddTaskTable = () => {
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState<Task>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await taskService.create(
        postData.title,
        postData.description
      );
      Alert({
        title: "Unauthorized",
        children: "You need to log in to access this page.",
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);

    setPostData({ title: "", description: "" });
  };

  return (
    <div>
      {!open && (
        <Button
          className="xl:top-[230px] xl:right-4 xl:z-50"
          onClick={() => setOpen(true)}
        >
          Add Tasks
        </Button>
      )}
      {open && (
        <div className="border border-amber-500/30 shadow-lg shadow-amber-600/40 rounded-2xl px-8 pt-10 pb-8 w-full max-w-md  backdrop-blur-sm overflow-hidden flex flex-col">
          <h1 className="text-center">Add new Task, boy...</h1>
          <div className="space-y-6 font-bold mt-5">
            <form action="" className="space-y-5" onSubmit={handleSubmit}>
              <Input
                name="title"
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
                className=""
                placeholder="Title"
                value={postData.title}
                required
              />
              <Textarea
                name="description"
                onChange={(e) =>
                  setPostData({ ...postData, description: e.target.value })
                }
                className=""
                placeholder="Description"
                value={postData.description}
                required
              />

              <Button type="submit">
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C4.477 0 0 4.477 0 10h4z"
                    ></path>
                  </svg>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskTable;
