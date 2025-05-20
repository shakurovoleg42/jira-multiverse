import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
  console.log(postData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <h1>Add new Task, boy...</h1>
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
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskTable;
