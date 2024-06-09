import { ROLE } from "./role";

type Route = {
  path: string;
  roles: ROLE[];
};

// order affect regex
export const RouteWithRoles: Route[] = [
  {
    path: "/dashboard",
    roles: [ROLE.ADMIN],
  },
  {
    path: "/user",
    roles: [ROLE.ADMIN],
  },
  {
    path: "/order",
    roles: [ROLE.ADMIN, ROLE.USER],
  },
  {
    path: "/product/(.+)",
    roles: [ROLE.ADMIN],
  },
  {
    path: "/product",
    roles: [],
  },
  {
    path: "/card",
    roles: [ROLE.ADMIN, ROLE.USER],
  },
  {
    path: "/setting",
    roles: [],
  },
  {
    path: "/404",
    roles: [],
  },
  {
    path: "/",
    roles: [],
  },
];
