import { Avatar, AvatarGroup } from "@chakra-ui/react";

import React from "react";

const AvatarItem = () => {
  return (
    <AvatarGroup>
      <Avatar.Root>
        <Avatar.Fallback />
        <Avatar.Image />
      </Avatar.Root>
    </AvatarGroup>
  );
};

export default AvatarItem;
