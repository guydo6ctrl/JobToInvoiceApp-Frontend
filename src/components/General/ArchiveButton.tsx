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
      colorPalette={isArchived ? "green" : "red"}
      bg={isArchived ? "green.500" : "red.500"}
      onClick={handleClick}
    >
      {isArchived ? "Unarchive" : "Archive"}
    </Button>
  );
};

export default ArchiveButton;
