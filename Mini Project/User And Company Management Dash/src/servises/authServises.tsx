import axios from "axios";
import api from "./api";
type FormFields = {
  username: string;
  password: string;
};

type AuthResponse = {
  success: boolean;
  message: string;
  token?: string;
};

const AuthServices = async (formFields: FormFields): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/login", {
      username: formFields.username,
      password: formFields.password,
    });

    if (response.data) {
      return {
        success: response.data.success,
        message: response.data.message || "Login successful",
        token: response.data.token || "",
      };
    }

    return {
      success: false,
      message: "Invalid response from server.",
    };
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          return {
            success: false,
            message:
              "Error 401 : Invalid credentials. Please check your username and password.",
          };
        }

        return {
          success: false,
          message:
            error.response.data?.message ||
            "An error occurred. Please try again.",
        };
      }
    }

    // Handle network errors
    return {
      success: false,
      message: "Network error. Please check your internet connection.",
    };
  }
};

export default AuthServices;
