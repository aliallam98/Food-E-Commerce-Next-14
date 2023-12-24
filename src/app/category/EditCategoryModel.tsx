"use client";
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
import { Pencil } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  image: z.any().optional(),
});

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/libs/edgestore";
import toast from "react-hot-toast";

import type { RootState } from '../../lib/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { initialCategory } from '../../lib/redux/categorySlice'
import { getAllCategories } from "@/libs/actions";


const EditCategoryModel = ({ details }: any) => {
  const dispatch = useDispatch()

  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: details.title || "",
      image: "",
    },
  });

  async function onSubmitForEdit(values: z.infer<typeof formSchema>) {
    const promise = new Promise(async (resolve, reject) => {
      if (values.image === "") {
        delete values.image;
      }
      if (values.image !== undefined && values.image !== "") {
        const res = await edgestore.publicFiles.upload({
          file: values.image,
          //   onProgressChange: (progress) => {
          //     // you can use this to show a progress bar
          //     console.log(progress);
          //   },
        });
        values.image = res.url;
      }
      
    const res = await fetch(`/api/category/${details._id}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const results = await res.json();
     if (results.success){
      getAllCategories().then(result=>dispatch(initialCategory(result.results)))
      resolve("Edited")
     }else{ reject()}
    });

    toast.promise(promise,{
      loading: "Updating Category...",
      success: "Category Updated Successfully",
      error: "Failed to Update Category",
    })
    const data = await getAllCategories()
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex ">
          <Pencil />
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForEdit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <>
                    <FormItem className="relative">
                      <FormLabel className="absolute left-6 -top-2 bg-white border-x-4 border-white">
                        Title
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          placeholder=""
                          {...field}
                          className="focus-visible:ring-white shadow-none text-base "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormControl>
                        <SingleImageDropzone
                          {...field}
                          className="mx-auto"
                          width={200}
                          height={200}
                          imageURL={details.image}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <Button
                type="submit"
                className="block mx-auto"
                // disabled={true}
              >
                Edit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditCategoryModel;
