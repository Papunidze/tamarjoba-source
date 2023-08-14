export const unauthRoutes = {
  auth: "/",
};

export const authRoutes = {
  index: "/",
  learning: "/learning",
  quiz: "/quiz",
  languagelearn: "/learn",
};
export const disactivate = {
  disactive: "/",
};
export const admin = {
  admin: "/",
};
export const routes = {
  ...authRoutes,
  ...unauthRoutes,
  ...disactivate,
  ...admin,
};
