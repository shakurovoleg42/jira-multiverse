import axios from "axios";

export const taskService = {
  list: async (cookie?: string) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/todos`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(cookie ? { Cookie: cookie } : {}),
        },
        withCredentials: true,
      }
    );
    return response.data;
  },

  create: async (title: string, description: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/todos`,
      {
        title,
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  },

  getById: async (id: number) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  },

  edit: async (id: number, title: string, description: string) => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
      {
        title,
        description,
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  },

  delete: async (id: number) => {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  },
};
