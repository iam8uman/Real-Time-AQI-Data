// Inside EditableField component

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { LocalStore } from "@/store/localStore";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { set } from "date-fns";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface EditableFieldProps {
  entityId: number;
  value: string | number | Date;
  valueType: string; // e.g., 'string', 'number', 'date'
  type: string;
  field: string; // e.g., 'name', 'description', etc.
  updateUrl: string | undefined; // URL to send updates
  hasPermission: boolean | undefined;
  className?: string | undefined;
  iconSize?: number | undefined;
  inputClassName?: string | undefined;
  refetch: () => void; // Function to refetch data
  setIsEdit?: (value: boolean) => void;
  isPatch?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
  entityId,
  value,
  field,
  updateUrl,
  hasPermission,
  type,
  className,
  iconSize,
  valueType,
  inputClassName,
  refetch,
  setIsEdit,
  isPatch,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(value);
  const [isIconHovered, setIsIconHovered] = useState(false);

  console.log("valueee", type);

  const updateMutation = useMutation({
    mutationFn: async (newValue: string | number | Date) => {


      const response = isPatch
        ? await axios.patch(
            `${updateUrl}/${type}/${entityId}`,
            { [field]: newValue },
            {
              headers: {
                Authorization: `Bearer ${LocalStore.getAccessToken()}`,
              },
            }
          )
        : await axios.put(
            `${updateUrl}/${type}/${entityId}`,
            { [field]: newValue },
            {
              headers: {
                Authorization: `Bearer ${LocalStore.getAccessToken()}`,
              },
            }
          );
      return response.data;
    },
    onSuccess: (data) => {
      setUpdatedValue(data[field]);
      setIsEdit && setIsEdit(true);
      refetch();
      setIsEditing(false);
    },
    onError: (error: any) => {
      console.error(`Failed to update ${field}:`, error);
    },
  });

  const handleUpdate = () => {
    updateMutation.mutate(updatedValue);
    refetch(); // Trigger refetch of timeline data
  };

  useEffect(() => {
    setUpdatedValue(value);
  }, [value]);

  return (
    <div className={cn("flex items-center", className)}>
      {isEditing ? (
        valueType === "string" ? (
          <Input
            type="text"
            value={String(updatedValue)}
            onChange={(e) => setUpdatedValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdate();
              }
            }}
            onBlur={handleUpdate}
            className={cn(
              "border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-primary",
              inputClassName
            )}
          />
        ) : valueType === "number" ? (
          <Input
            type="number"
            value={String(updatedValue)}
            onChange={(e) => setUpdatedValue(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleUpdate();
              }
            }}
            onBlur={handleUpdate}
            className={cn(
              "border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-primary",
              inputClassName
            )}
          />
        ) : valueType === "date" ? (
          <Calendar
            mode="single"
            selected={new Date(String(updatedValue))}
            onDayClick={(date) => {
              setUpdatedValue(date || "");
              handleUpdate();
            }}
            className="rounded-md border"
          />
        ) : null
      ) : (
        <div
          onClick={() => hasPermission && setIsEditing(true)}
          onMouseEnter={() => hasPermission && setIsIconHovered(true)}
          onMouseLeave={() => hasPermission && setIsIconHovered(false)}
        >
          {valueType === "date"
            ? new Date(String(updatedValue)).toLocaleDateString()
            : String(updatedValue)}
          {hasPermission && (
            <button
              onClick={() => hasPermission && setIsEditing(true)}
              className="ml-2"
            >
              <Pencil2Icon type="pencil" width={iconSize ? iconSize : 10} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EditableField;