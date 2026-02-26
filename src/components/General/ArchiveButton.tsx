import { Button } from "@chakra-ui/react";

interface ArchiveButtonProps {
  id: number;
  isArchived: boolean;
  onToggle: (id: number, newArchivedState: boolean) => void;
}

const ArchiveButton = ({ id, isArchived, onToggle }: ArchiveButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onToggle(id, !isArchived);
  };

  return (
    <Button
      size="sm"
      colorScheme={isArchived ? "green" : "gray"}
      onClick={handleClick}
    >
      {isArchived ? "Unarchive" : "Archive"}
    </Button>
  );
};

export default ArchiveButton;
