import lazy from "react-lazy-with-preload";
import { routes } from "./patch";

export const authRoutesData = [
  {
    path: routes.index,
    component: lazy(() => import("../pages/home/index")),
  },
  {
    path: routes.learning,
    component: lazy(() => import("../pages/learning/index")),
  },
  {
    path: routes.quiz,
    component: lazy(() => import("../pages/quiz/index")),
  },
];

export const unauthRoutesData = [
  {
    path: routes.auth,
    component: lazy(() => import("../pages/auth/index")),
  },
];
export const disactivateRoutesData = [
  {
    path: routes.disactive,
    component: lazy(() => import("../pages/disactive/index")),
  },
];
export const adminRoutesData = [
  {
    path: routes.admin,
    component: lazy(() => import("../pages/admin/index")),
  },
];
export const allRoutesData = [
  ...authRoutesData,
  ...unauthRoutesData,
  ...adminRoutesData,
  ...disactivateRoutesData,
];
