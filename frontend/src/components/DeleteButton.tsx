import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Ban, Delete, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { LocalStore } from "@/store/localStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner"

interface DeleteButtonProps {
  id: string | number;
  url: any;
  isSegmentLeadDelete?: boolean;
  entity: string; // For example: 'leads', 'users'
  onDeleteSuccess: () => void; // Callback to perform after a successful delete
  message?: string; // Custom message for the delete confirmation
  queryKey: string | (string | number)[];
  type?: string; // React Query key for cache invalidation
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  url,
  entity,
  type,
  onDeleteSuccess,
  isSegmentLeadDelete,
  message = "This will permanently delete the item and remove it from our servers.",
  queryKey,
}) => {
  const queryClient = useQueryClient();
  const mutationFn = isSegmentLeadDelete
    ? async () =>
        await axios.delete(`${url}`, {
          headers: { Authorization: `Bearer ${LocalStore.getAccessToken()}` },
        })
    : async () =>
        await axios.delete(`${url}/${entity}/${id}`, {
          headers: { Authorization: `Bearer ${LocalStore.getAccessToken()}` },
        });

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      toast.success("Success ✅",{
        description: `${
          entity.charAt(0).toUpperCase() + entity.slice(1)
        } deleted successfully`,
      });
      queryClient.invalidateQueries(queryKey as InvalidateQueryFilters);
      onDeleteSuccess();
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error("Uh oh ❌",{
        description:
          error.response?.data?.message ||
          `An error occurred while deleting the ${entity}.`,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className=" w-full">
        <Button
          variant={type === "button" ? "default" : "mini"}
          className={cn(
            type === "button"
              ? "flex-row items-center justify-start pl-6 gap-8 flex w-full bg-white text-black shadow-none border-none font-bold hover:bg-gray-100 h-12 border border-gray-50"
              : "flex-col w-12"
          )}
        >
          <Ban size={20} className=" text-rose-500 hover:text-red-500 hover:scale-110 hover: font-extrabold" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-slate-950">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-300">Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-none">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate()} className="rounded-none">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
