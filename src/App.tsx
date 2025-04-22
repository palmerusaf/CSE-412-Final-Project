import { SideBar } from "@/components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as icon from "lucide-react";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SideBar
        menuData={[
          {
            menu: "Projects",
            icon: icon.LucideTelescope,
            items: [
              {
                subMenu: "Create",
                content: <NotImplemented />,
              },
              {
                subMenu: "Select",
                content: <NotImplemented />,
              },
              {
                subMenu: "Update",
                content: <NotImplemented />,
              },
              {
                subMenu: "Delete",
                content: <NotImplemented />,
              },
            ],
          },
          {
            menu: "Todos",
            icon: icon.ListTodoIcon,
            items: [
              {
                subMenu: "Create",
                content: <NotImplemented />,
              },
              {
                subMenu: "Select",
                content: <NotImplemented />,
              },
              {
                subMenu: "Update",
                content: <NotImplemented />,
              },
              {
                subMenu: "Delete",
                content: <NotImplemented />,
              },
            ],
          },
        ]}
      />
    </QueryClientProvider>
  );
}

export default App;

const NotImplemented = () => (
  <div className="flex flex-col justify-center content-center w-full h-full text-center">
    Not Implemented.
  </div>
);
