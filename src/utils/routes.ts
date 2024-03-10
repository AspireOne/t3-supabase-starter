export const routes = {
  app: "/",
  signIn: "/sign-in",
  register: "/sign-up",
};

export const protectedRoutes = [routes.app];
/** These routes can be accessed ONLY if the user is NOT authenticated. */
export const onlyUnprotectedRoutes = [routes.signIn, routes.register];
