"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import EditCategoryModel from "./EditCategoryModel";
import DeleteCategoryButton from "./DeleteCategoryButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  _id: string;
  title: string;
  image: string;
  createdBy: string;
  createdAt: Date;
};



export const columns: ColumnDef<Payment>[] = [
  // {
  //   accessorKey: "_id",
  //   header: "Id",
  // },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }: any) => (
      <Image
        width={80}
        height={80}
        src={row.original.image}
        alt={row.original.title}
        className="w-10 h-10 rounded-full" //Center
        loading="lazy"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdBy.name",
    header: "CreatedBy",
  },

  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center justify-center gap-4">
          <EditCategoryModel
          details={row.original}
          />
          <DeleteCategoryButton id={row.original._id} />
        </div>
      );
    },
  },
];
