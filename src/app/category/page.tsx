"use client"
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  image: z.any().refine((image) => image?.size > 0, "Image Is Required"),
});

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/libs/edgestore";
import toast from "react-hot-toast";
import { createNewCategory, getAllCategories } from "@/libs/actions";
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../lib/redux/store'
import { initialCategory } from '../../lib/redux/categorySlice'
import CategoryModel from "./CreateCategoryModel";






// const data: Payment[] = [
//   {
//     id: "728ed52f",
//     title: "Category name",
//     imageUrl: "pending",
//     createdBy: "m@example.com",
//   },
// ];

const CategoryPage =  () => {
  const dispatch = useDispatch()
  const Categories = useSelector((state: RootState) => state.category.categories)
  console.log(Categories);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: "",
      image: "",
    },
  });

  const { edgestore } = useEdgeStore();
    useEffect(()=>{
        getAllCategories().then(result=>dispatch(initialCategory(result.results)))
    },[dispatch])
    
  

  
  return (
    <section>
      <div className="container py-10">
        <h2 className="text-center text-3xl font-semibold">Categories Page</h2>
        <div>
          <CategoryModel/>
        </div>
        <div>
          <DataTable columns={columns} data={Categories} />
        </div>
      </div>
    </section>
  )
}

export default CategoryPage









      //   {/* <Dialog>
      //   <DialogTrigger className="block mx-auto bg-primary text-secondary py-2 px-4 rounded-lg my-4">
      //     Create New
      //   </DialogTrigger>
      //   <DialogContent>
      //     <Form {...form}>
      //       <form onSubmit={form.handleSubmit(onSubmitForCreate)} className="space-y-8">
      //         <FormField
      //           control={form.control}
      //           name="title"
      //           render={({ field }) => (
      //             <>
      //               <FormItem className="relative">
      //                 <FormLabel className="absolute left-6 -top-2 bg-white border-x-4 border-white">
      //                   Title
      //                 </FormLabel>
      //                 <FormControl>
      //                   <Input
      //                     disabled
      //                     placeholder=""
      //                     {...field}
      //                     className="focus-visible:ring-white shadow-none text-base "
      //                   />
      //                 </FormControl>
      //                 <FormMessage />
      //               </FormItem>
      //             </>
      //           )}
      //         />
      //         <FormField
      //           control={form.control}
      //           name="image"
      //           render={({ field }) => (
      //             <>
      //               <FormItem>
      //                 <FormControl>
      //                   <SingleImageDropzone
      //                     {...field}
      //                     className="mx-auto"
      //                     width={200}
      //                     height={200}
      //                   />
      //                 </FormControl>
      //                 <FormMessage />
      //               </FormItem>
      //             </>
      //           )}
      //         />
      //         <Button
      //           type="submit"
      //           className="block mx-auto"
      //           // disabled={true}
      //         >
      //           Create
      //         </Button>
      //       </form>
      //     </Form>
      //   </DialogContent>
      // </Dialog> */}