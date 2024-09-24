
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { LocalStore } from "@/store/localStore";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface StatusProps {
  status: string | undefined;
  id: number | undefined;
  refetch?: () => void;
  className?: string;
  apiUrl: string;
  statusEnum: { [key: string]: string } | undefined;
  statusLabel: string;
  isTransaction?: boolean;
}

const Status: React.FC<StatusProps> = ({
  status: initialStatus,
  id,
  className,
  refetch,
  apiUrl,
  statusEnum,
  statusLabel,
  isTransaction,
}) => {
  const [newStatus, setNewStatus] = useState(initialStatus);
  const [showDialog, setShowDialog] = useState(false);

  const updateStatus = async () => {
    try {
      const response = await axios.put(
        `${apiUrl}/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${LocalStore.getAccessToken()}`,
          },
        }
      );
      if (refetch) {
        refetch();
      }

      setNewStatus(newStatus);
      toast.success("Success ✅",{
        description: "Status updated successfully",
      });
    } catch (error) {
      toast.error("Error ❌", {
        description: "Failed to update status",
      });
    }
  };

  useEffect(() => {
    if (newStatus !== initialStatus) {
      setShowDialog(true);
    }
  }, [newStatus]);

  return (
    <div className="flex gap-1 ">
      <Select
        onValueChange={(value: any) => {
          setNewStatus(value);
        }}
        defaultValue={initialStatus}
      >
        <SelectTrigger
          className={cn(
            "border border-gray-400",
            isTransaction ? "w-full" : "w-36",
            className
          )}
        >
          <div>
            <SelectValue placeholder={initialStatus?.replace(/_/g, " ")} />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <ScrollArea className="h-40 max-h-56 ">
              <SelectLabel>{statusLabel}</SelectLabel>
              {Object.values(statusEnum || {}).map((status: string) => (
                <SelectItem key={status} value={status}>
                  {status.replace(/_/g, " ")}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectGroup>
        </SelectContent>
      </Select>

      <AlertDialog open={showDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Do you really want change?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently change the
              status.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setShowDialog(false);
              }}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowDialog(false);
                updateStatus();
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Status;
