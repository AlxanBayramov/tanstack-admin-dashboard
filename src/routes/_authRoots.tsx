import {
  createFileRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";


const AuthLayout = () => {

 

  return (
    <main className="flex flex-row h-screen">
  
     <div className="h-100 flex flex-col items-center justify-center  bg-green-600 basis-1/3">
     <img src="https://i.ibb.co/wJT9KJw/png-clipart-software-development-custom-software-computer-software-web-development-mobile-app-develo.png" alt="" />  

     </div> 
     <section className="flex flex-col items-center justify-center basis-2/3 border-current">
     <Outlet />
     </section>
    
  
    </main>
  );
};

export const Route = createFileRoute("/_authRoots")({
  beforeLoad: ({ context }) => {
    const {user} = context
  
    if (Object.keys(user||{})?.length) {
      throw redirect({ to:  '/profile' });
    }
  },

  component: AuthLayout,
});
