import { createFileRoute,  redirect } from "@tanstack/react-router";


export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    const {user} = context;
    if (!Object.keys(user||{}).length) {
      throw redirect({
        to: "/login",
        search: {
          redirect: "/profile",
        },
      });
    }else{
      throw redirect({
        to : '/profile'
      })
    }
  },

});
