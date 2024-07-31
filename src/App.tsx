import { RouterProvider, createRouter } from "@tanstack/react-router";
import {QueryClient,QueryClientProvider,
} from '@tanstack/react-query'
import { routeTree } from "./routeTree.gen";
import { useStore } from "lib/zustand/store";



const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    user: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Router = () => {
  const {user} = useStore(state=>state);



  return <RouterProvider router={router} context={{ user }} />;
};

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
     
       <Router />
  
    </QueryClientProvider>
    </>
  )
}

export default App
