"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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

import { useSelector, useDispatch } from "react-redux";
import { initialCategory } from "../../lib/redux/categorySlice";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  image: z.any().refine((image) => image?.size > 0, "Image Is Required"),
});

import { SingleImageDropzone } from "@/components/SingleImageDropzone";
import { useEdgeStore } from "@/libs/edgestore";
import toast from "react-hot-toast";
import { createNewCategory, getAllCategories } from "@/libs/actions";

const CategoryModel = () => {
  const dispatch = useDispatch();
  const { edgestore } = useEdgeStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: "",
      image: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const promise = new Promise(async(resolve,reject)=>{
      if (values.image !== undefined) {
        const res = await edgestore.publicFiles.upload({
          file: values.image,
          //   onProgressChange: (progress) => {
          //     // you can use this to show a progress bar
          //     console.log(progress);
          //   },
        });
        values.image = res.url;
      }
      const results = await createNewCategory(values)
      if(results.success){
        resolve(results.message)
        getAllCategories().then(result=>dispatch(initialCategory(result.results)))
        form.reset()
      }{
        reject()
      }
    })

    await toast.promise(promise,{
      loading: "Creating Category...",
      success: "Category Created Successfully",
      error: "Failed to Create Category",
    })
  }

  return (
    <>
      <Dialog>
        <DialogTrigger className="block mx-auto bg-primary text-secondary py-2 px-4 rounded-lg my-4">
          Create New
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                Create
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryModel;
