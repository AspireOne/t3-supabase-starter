import { createClient } from "@/utils/supabase/component";
import { Box } from "@chakra-ui/react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function LoginPage() {
  const supabase = createClient();
  return (
    <Box maxW={500} mx={"auto"}>
      <Auth
        providers={["google"]}
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#bf1c57",
                brandAccent: "#c23065",
              },
            },
          },
        }}
      />
    </Box>
  );
}
