import { SideBar } from "@/components/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as icon from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useNewProject } from "./backend/db";
function App() {
  const queryClient = new QueryClient();
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
                content: <CreateProject />,
              },
              {
                subMenu: "Select",
                content: <SelectProject />,
              },
              {
                subMenu: "Update",
                content: <UpdateProject />,
              },
              {
                subMenu: "Delete",
                content: <DeleteProject />,
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
function DeleteProject() {
  return <div>delete project</div>;
}

function UpdateProject() {
  return <div>update project</div>;
}

function SelectProject() {
  return <div>select project page</div>;
}

function CreateProject() {
  const { mutate, isPending } = useNewProject();
  const create = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent native form submission
    const formData = new FormData(e.currentTarget);
    const inputData = formData.get("input");
    mutate({ name: inputData as string });
  };
  return (
    <div className="flex justify-center content-center">
      <Card>
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>Enter project name below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-2 gap-4" onSubmit={create}>
            <Input name="input" placeholder="Project Name" />
            <Button type="submit">
              {isPending ? "Creating Project..." : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
