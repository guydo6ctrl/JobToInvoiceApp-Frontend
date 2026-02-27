import { Button } from "@chakra-ui/react";
import api from "../../services/api";

interface DeleteButtonProps {
  endpoint: string;
  id: string | number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  buttonLabel?: string;
}

const DeleteButton = ({
  endpoint,
  id,
  onSuccess,
  onError,
  buttonLabel = "Delete",
}: DeleteButtonProps) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      await api.delete(`/${endpoint}/${id}/`);
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete";
      onError?.(errorMessage);
      console.error("Delete error:", error);
    }
  };

  return (
    <Button size="sm" colorPalette="red" onClick={handleDelete}>
      {buttonLabel}
    </Button>
  );
};

export default DeleteButton;
