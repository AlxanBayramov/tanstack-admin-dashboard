import React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { IUser } from "lib/zustand/auth/model";

export interface IRouterContext {
  user: IUser | null;
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: () => (
    <React.Fragment>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
    </React.Fragment>
  ),
});
