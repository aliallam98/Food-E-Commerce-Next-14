"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash2, Pencil } from "lucide-react";
import toast from "react-hot-toast";
import ExtraIngredients from "./ExtraIngredients";
import {
  MultiImageDropzone,
  type FileState,
} from "@/components/MultiImageDropzone";
import { useEdgeStore } from "../../libs/edgestore";

interface Item {
  size: string;
  price: number;
}
const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  sizes: z.array(
    z.object({
      size: z.string(),
      price: z.number().positive(),
    })
  ),
});

const CreateProductModel = () => {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [items, setItems] = useState<Item[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);

  const handleSubmit = (e: React.MouseEvent) => {
    try {
      if (!selectedSize || !price) {
        return toast.error("Please select a size and enter a price.");
      }
      // Validate price input
      if (isNaN(price) || price <= 0) {
        return toast.error("Please enter a valid price.");
      }

      let isSizeExist = false;
      items.map((item) => {
        selectedSize === item.size ? (isSizeExist = true) : "";
      });
      console.log(isSizeExist);
      if (isSizeExist) return toast.error("This Size Is Already Added");

      console.log("0000000000000000000000");

      const newItem = { size: selectedSize, price: price };
      if (itemToEdit) {
        // Editing existing item
        setItems((prevItems) =>
          prevItems.map((item) => (item === itemToEdit ? newItem : item))
        );
      } else {
        // Adding new item
        setItems((prevItems) => [...prevItems, newItem]);
      }

      setSelectedSize("");
      setPrice(null);
      // setItemToEdit(null); // Reset editing state
    } catch (error) {
      console.log(error);
    }
  };

  const handleSizeChange = (e: any) => {
    console.log(e.target.value);
    setSelectedSize(e.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setPrice(event.target.value);
  };

  const handleDelete = (itemToDelete: Item) => {
    setItems((prevItems) => prevItems.filter((item) => item !== itemToDelete));
  };

  const handleEdit = (itemToEdit: Item) => {
    setSelectedSize(itemToEdit?.size);
    setPrice(itemToEdit.price);
    setItemToEdit(itemToEdit);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      title: "",
      description: "",
      sizes: [],
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (items.length === 0) return toast.error("There is No Items To Add");
    values.sizes = items;
    console.log(values);
  }

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  return (
    <section className="p-10 text-center">
      <h2>Product Size and Pricing</h2>

      <Dialog>
        <DialogTrigger className="block mx-auto bg-primary text-secondary py-2 px-4 rounded-lg my-4">
          Create New
        </DialogTrigger>
        <DialogContent className="max-w-[80%]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-[80%] items-center gap-4 mx-auto"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <>
                    <FormItem className="relative w-full md:w-[80%]">
                      <FormLabel className="absolute left-6  bg-white border-x-4 border-white">
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
                name="description"
                render={({ field }) => (
                  <FormItem className="relative w-full md:w-[80%]">
                    <FormControl className=" focus-visible:ring-white shadow-none text-base ">
                      <textarea
                        placeholder="Enter Description"
                        {...field}
                        name="description"
                        cols={40}
                        rows={3}
                        className="block w-full p-2 border resize-none focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <div className="flex items-center gap-4">
                  <div className="relative w-1/2">
                    <label className="absolute left-6 -top-3 bg-white border-x-4 border-white">
                      Size
                    </label>
                    <select
                      className="p-2  block w-full border rounded-md focus-visible:ring-white shadow-none text-base focus-within:outline-none"
                      onChange={handleSizeChange}
                      placeholder="Select Size A Size"
                      value={selectedSize}
                    >
                      <option value="" disabled>
                        Select a Size
                      </option>
                      <option value="small">small</option>
                      <option value="medium">medium</option>
                      <option value="large">large</option>
                    </select>
                  </div>
                  <div className="relative w-1/2">
                    <label className="absolute left-6 -top-3 bg-white border-x-4 border-white">
                      Price
                    </label>
                    <input
                      type="text"
                      value={price || ""}
                      onChange={handlePriceChange}
                      className="block w-full p-2 focus:outline-none border border-neutral-200 rounded-lg text-base"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="block rounded-lg bg-primary text-secondary py-2 px-4 "
                  >
                    Add
                  </button>
                </div>
                <div>
                  {items.length > 0 && (
                    <ul className="mt-2">
                      {items.map((item, i) => (
                        <li
                          key={i}
                          className="flex justify-between p-2 border border-neutral-200 max-w-sm mx-auto text-lg"
                        >
                          <span>
                            Size: {item.size} - Price: ${item.price}
                          </span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleDelete(item)}>
                              <Trash2 />
                            </button>
                            <button onClick={() => handleEdit(item)}>
                              <Pencil />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              {/* <ExtraIngredients/> */}
              <div className="w-full">
                <MultiImageDropzone
                  value={fileStates}
                  dropzoneOptions={{
                    maxFiles: 6,
                  }}
                  onChange={(files) => {
                    setFileStates(files);
                  }}
                  // onFilesAdded={async (addedFiles) => {
                  //   setFileStates([...fileStates, ...addedFiles]);
                  //   await Promise.all(
                  //     addedFiles.map(async (addedFileState) => {
                  //       try {
                  //         const res = await edgestore.publicFiles.upload({
                  //            // @ts-ignore
                  //           file: addedFileState.file,
                  //           onProgressChange: async (progress) => {
                  //             updateFileProgress(addedFileState.key, progress);
                  //             if (progress === 100) {
                  //               // wait 1 second to set it to complete
                  //               // so that the user can see the progress bar at 100%
                  //               await new Promise((resolve) =>
                  //                 setTimeout(resolve, 1000)
                  //               );
                  //               updateFileProgress(addedFileState.key, "COMPLETE");
                  //             }
                  //           },
                  //         });
                  //         console.log(res);
                  //       } catch (err) {
                  //         updateFileProgress(addedFileState.key, "ERROR");
                  //       }
                  //     })
                  //   );
                  // }}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CreateProductModel;
