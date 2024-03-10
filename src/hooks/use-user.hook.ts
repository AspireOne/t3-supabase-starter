import { createClient } from "@/utils/supabase/component";
import { useQuery } from "@tanstack/react-query";

type UserData = {
  id: string;
  email: string;
  role: "authenticated" | "unauthenticated" | string;
  avatar_url: string | null;
  email_verified: boolean;
  full_name: string | null;
  name: string | null;
};
const fetchUser = async () => {
  // biome-ignore format: off.
  const { data: { user } } = await createClient().auth.getUser();
  return user;
};

export const useUser = () => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["auth.getUser"],
    queryFn: fetchUser,
    refetchOnReconnect: true,
    refetchInterval: false,
    // 1 hour.
    staleTime: 1000 * 60 * 60,
  });

  return {
    user: user,
    isLoading,
    isError,
    error,
  };
};
