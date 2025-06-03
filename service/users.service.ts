import axios from "axios";

export const usersService = {
  list: async (cookieHeader: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: cookieHeader,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("Not Authenticated");
      } else {
        alert("Not Authorized");
      }
    }
  },
};
