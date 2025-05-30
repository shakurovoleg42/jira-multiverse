import axios, { AxiosRequestConfig } from "axios";

export const authService = {
  login: async (login: string, password: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        login,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        withCredentials: true,
      } as AxiosRequestConfig
    );
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      } as AxiosRequestConfig
    );
    return response.data;
  },

  getMe: async (redirectUnauthorized = true) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401 && redirectUnauthorized) {
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
      throw error;
    }
  },

  setRoleToCookies: (role: string) => {
    document.cookie = `role=${role}; path=/; SameSite=Strict; Secure`;
  },
};
