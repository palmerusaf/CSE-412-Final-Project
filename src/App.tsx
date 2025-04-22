import { SideBar } from "@/components/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as icon from "lucide-react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import {
  useDelProject,
  useGetProjects,
  useNewProject,
  useNewTodo,
} from "./backend/db";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
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
                content: <CreateTodo />,
              },
              {
                subMenu: "Update",
                content: <NotImplemented />,
              },
              {
                subMenu: "Delete",
                content: <DeleteTodo />,
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

function DeleteTodo() {
  const { mutate } = useDelProject();
  const { data, refetch } = useGetProjects();
  const pjs = data?.map(({ name, id }) => (
    <ProjectDelItem
      key={id}
      name={name}
      click={() => {
        mutate(id);
        refetch();
      }}
    />
  ));
  if (!data || !data.length) {
    return (
      <div className="flex justify-center content-center">
        <Card className="min-w-lg">
          <CardHeader>
            <CardTitle>No Projects</CardTitle>
            <CardDescription>
              You haven't created any projects to delete todos from.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {data.map(({ id, name }) => (
        <_DeleteTodo name={name} id={id} key={id} />
      ))}
    </div>
  );

  function _DeleteTodo({ name, id }: { name: string; id: number }) {
    return (
      <div className="flex justify-center content-center px-4">
        <Card className="md:min-w-lg">
          <CardHeader>
            <CardTitle>Create {name} Todo</CardTitle>
            <CardDescription>Enter todo name below for {name}.</CardDescription>
          </CardHeader>
          <CardContent>{id}</CardContent>
        </Card>
      </div>
    );
  }
}

function CreateTodo() {
  const { mutate } = useNewTodo();
  const { data } = useGetProjects();
  if (!data || !data.length) {
    return (
      <div className="flex justify-center content-center">
        <Card className="min-w-lg">
          <CardHeader>
            <CardTitle>No Projects</CardTitle>
            <CardDescription>
              You haven't created any projects to add todos to.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      {data.map(({ id, name }) => (
        <_CreateTodo name={name} id={id} key={id} />
      ))}
    </div>
  );

  function _CreateTodo({ name, id }: { name: string; id: number }) {
    const [isPending, setisPending] = useState(false);
    return (
      <div className="flex justify-center content-center px-4">
        <Card className="md:min-w-lg">
          <CardHeader>
            <CardTitle>Create {name} Todo</CardTitle>
            <CardDescription>Enter todo name below for {name}.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="grid grid-cols-2 gap-4"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault(); // prevent native form submission
                const formData = new FormData(e.currentTarget);
                const inputData = formData.get("input");
                mutate({ title: inputData as string, projectId: id });
                setisPending(true);
                setTimeout(() => {
                  setisPending(false);
                }, 1000);
              }}
            >
              <Input name="input" placeholder="Todo Title" />
              <Button type="submit">
                {isPending ? "Creating Todo..." : "Create"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}

function DeleteProject() {
  const { mutate } = useDelProject();
  const { data, refetch } = useGetProjects();
  const pjs = data?.map(({ name, id }) => (
    <ProjectDelItem
      key={id}
      name={name}
      click={() => {
        mutate(id);
        refetch();
      }}
    />
  ));
  return (
    <div className="flex justify-center content-center">
      <Card className="min-w-lg">
        <CardHeader>
          <CardTitle>Delete Project</CardTitle>
          <CardDescription>Select a project to delete below.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {!data || !data.length ? "No Projects" : pjs}
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectDelItem({ name, click }: { name: string; click: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Label className="flex flex-col justify-center">{name}</Label>
      <Button variant={"destructive"} onClick={click}>
        Delete
      </Button>
    </div>
  );
}

function CreateProject() {
  const [isPending, setisPending] = useState(false);
  const { mutate } = useNewProject();
  const create = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent native form submission
    const formData = new FormData(e.currentTarget);
    const inputData = formData.get("input");
    mutate({ name: inputData as string });
    setisPending(true);
    setTimeout(() => {
      setisPending(false);
    }, 1000);
  };
  return (
    <div className="flex justify-center content-center px-4">
      <Card className="md:min-w-lg">
        <CardHeader>
          <CardTitle>Create Project</CardTitle>
          <CardDescription>Enter project name below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-2 gap-4" onSubmit={create}>
            <Input name="input" placeholder="Project Name" />
            <Button type="submit">
              {isPending ? "Project Created" : "Create"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
