import { SideBar } from "@/components/sidebar";
import * as icon from "lucide-react";
import { test } from "./backend/db";
function App() {
  test("foo").then(console.log);
  return (
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
  );
}

export default App;

const NotImplemented = () => (
  <div className="flex flex-col justify-center content-center w-full h-full text-center">
    Not Implemented.
  </div>
);
