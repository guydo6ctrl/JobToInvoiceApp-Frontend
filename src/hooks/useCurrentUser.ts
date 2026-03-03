import { useEffect, useState } from "react";
import api from "../services/api";

export default function useCurrentUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.get("api/user/me/")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return user;
}