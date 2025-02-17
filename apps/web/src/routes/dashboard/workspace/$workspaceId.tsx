import EmptyProjectState from "@/components/project/empty-state";
import useGetProjects from "@/hooks/queries/project/use-get-projects";
import useGetWorkspace from "@/hooks/queries/workspace/use-get-workspace";
import useWorkspaceStore from "@/store/workspace";
import { Outlet, createFileRoute } from "@tanstack/react-router";
import { LayoutGrid } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/dashboard/workspace/$workspaceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { workspaceId } = Route.useParams();
  const { setWorkspace } = useWorkspaceStore();
  const { data, isLoading } = useGetWorkspace({ workspaceId });
  const { data: projects } = useGetProjects({ workspaceId });

  useEffect(() => {
    if (data) {
      setWorkspace(data);
    }
  }, [data, setWorkspace]);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center h-screen flex-col md:flex-row bg-zinc-50 dark:bg-zinc-950">
        <div className="p-1.5 bg-linear-to-br from-indigo-500 to-purple-500 rounded-lg shadow-xs animate-spin">
          <LayoutGrid className="w-5 h-5 text-white" />
        </div>
      </div>
    );
  }

  const isProjectsEmpty = projects && projects.length === 0;

  return <>{isProjectsEmpty ? <EmptyProjectState /> : <Outlet />}</>;
}
