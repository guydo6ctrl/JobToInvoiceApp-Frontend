import { Avatar, AvatarGroup } from "@chakra-ui/react";
import useCurrentUser from "../../../hooks/useCurrentUser";

const AvatarItem = () => {
  const user = useCurrentUser();

  if (!user) return null;

  const full_name =
    `${user.first_name ?? ""} ${user.last_name ?? ""}`.toUpperCase();
  return (
    <AvatarGroup>
      <Avatar.Root>
        <Avatar.Fallback name={full_name} />
      </Avatar.Root>
    </AvatarGroup>
  );
};

export default AvatarItem;
