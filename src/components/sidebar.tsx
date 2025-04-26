import * as icon from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import * as React from "react";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { useState } from "react";

function _Layout({
  menu,
  submenu,
  children,
  menuData,
  setActive,
}: {
  menu: string;
  submenu: string;
  children?: React.ReactNode;
  menuData: MenuData[];
  setActive: React.Dispatch<
    React.SetStateAction<{
      menu: string;
      submenu: string;
    }>
  >;
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <_NavMain setActive={setActive} items={menuData} />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex gap-2 items-center px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink>{menu}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{submenu}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
function _NavMain({
  items,
  setActive,
}: {
  items: {
    menu: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      subMenu: string;
      url: string;
    }[];
  }[];
  setActive: React.Dispatch<
    React.SetStateAction<{
      menu: string;
      submenu: string;
    }>
  >;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex gap-2 italic font-extrabold">
        <icon.ZapIcon /> Y-A-T-A
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.menu}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className="cursor-pointer"
                  tooltip={item.menu}
                >
                  {item.icon && <item.icon />}
                  <span>{item.menu}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={item.menu + subItem.subMenu}>
                      <SidebarMenuSubButton asChild>
                        <button
                          className="cursor-pointer"
                          onClick={() =>
                            setActive({
                              menu: item.menu,
                              submenu: subItem.subMenu,
                            })
                          }
                        >
                          {subItem.subMenu}
                        </button>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
type MenuData = {
  menu: string;
  icon: React.ForwardRefExoticComponent<
    Omit<icon.LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  items: {
    subMenu: string;
    content: React.ReactNode;
  }[];
};
export const SideBar = ({ menuData }: { menuData: MenuData[] }) => {
  const [active, setActive] = useState<{ menu: string; submenu: string }>({
    menu: menuData[0].menu,
    submenu: menuData[0].items[0].subMenu,
  });
  const pageContent = menuData
    .find((item) => item.menu === active.menu)
    ?.items.find((item) => item.subMenu === active.submenu)?.content;
  return (
    <_Layout
      setActive={setActive}
      menuData={menuData}
      menu={active.menu}
      submenu={active.submenu}
    >
      {pageContent}
    </_Layout>
  );
};
