import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { resetAllSlices } from "lib/zustand/resetSlices";
import {useStore} from "lib/zustand/store";
import React from "react";

const AuthLayout = () => {

  const navigate = useNavigate()
  const {user} = useStore()
  React.useEffect(()=>{
    !Object.keys(user||{}).length &&  navigate({ to: '/login' })
  },[user])

  const handleLogout = () => {
    resetAllSlices()
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">
        Tanstack Router Authenticated Route
      </h1>
      <p>This route's content is only visible to authenticated users.</p>
      <ul className="py-2 flex gap-2">
        <li>
          <Link
            to="/profile"
            className="hover:text-blue-500 data-[status='active']:font-semibold"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className="hover:text-blue-500 data-[status='active']:font-semibold"
          >
            Profile
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="hover:text-red-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li> 
      </ul>
      <Outlet />
    </main>
  );
};

export const Route = createFileRoute("/_privateRoots")({
  beforeLoad: ({ context, location }) => {
    const {user} = context
    if (!Object.keys(user||{}).length) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});
