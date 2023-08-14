import { Route as BaseRoute } from "react-router-dom";

export const generateLazyRoutes = (pages) => {
  return pages.map((page) => (
    <BaseRoute
      key={page.path}
      path={page.path}
      element={
        <>
          <page.component />
        </>
      }
    />
  ));
};
