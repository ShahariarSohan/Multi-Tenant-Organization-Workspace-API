/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { OrganizationRoutes } from "../modules/organization/organization.route";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();
interface IModuleRoutes {
  path: string;
  route: any;
}
const moduleRoutes: IModuleRoutes[] = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/organizations",
    route: OrganizationRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
