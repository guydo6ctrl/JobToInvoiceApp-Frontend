import { useState } from "react";

interface UseFormSubmitOptions {
  endpoint: string;
  onSuccess?: () => void;
}

export const useFormSubmit = ({ endpoint, onSuccess }: UseFormSubmitOptions) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const submit = async (data: Record<string, any>) => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:8000/${endpoint}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");

      onSuccess?.();
      return response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submit, error, loading, setError };
};