import { SideBar } from "@/components/sidebar";
import * as icon from "lucide-react";
function App() {
  return (
    <SideBar
      menuData={[
        {
          menu: "main menu",
          icon: icon.AArrowDown,
          items: [
            {
              subMenu: "subMenu",
              content: "foo",
            },
          ],
        },
      ]}
    />
  );
}

export default App;
