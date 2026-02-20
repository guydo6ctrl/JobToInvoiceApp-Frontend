import { useState } from "react";
import api from "../services/api";
import axios from "axios";

interface UseFormSubmitOptions {
  endpoint: string;
  onSuccess?: () => void;
}

export const useFormSubmit = ({ endpoint, onSuccess }: UseFormSubmitOptions) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (data: Record<string, any>) => {
    setError("");
    setLoading(true);

    try {
      const response = await api.post(`/${endpoint}/`, data)

      onSuccess?.();
      return response.data();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.detail ??
            err.response?.statusText ??
            "Failed to submit",
        );
      } else {
        setError("An unexpected error occurred");
      }
      throw err;
    }finally {
      setLoading(false);
    }
  };

  return { submit, error, loading, setError };
};