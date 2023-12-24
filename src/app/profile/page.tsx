"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { useEdgeStore } from "../../libs/edgestore";
import toast, { Toaster } from "react-hot-toast";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getUserProfile } from "@/libs/actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

//Validation Schema
const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  address_1: z.string().min(2).max(50),
  address_2: z.string().min(2).max(50),
  phone_1: z.string().min(2).max(50),
  phone_2: z.string().min(2).max(50),
});

interface IUserData {
  name: string;
  email: string;
  address: string[];
  phone: string[];
  profileImage: {
    url: string;
  };
}


const ProfilePage = () => {
  const [userData, setUserData] = useState<IUserData>();
  const [loading,setLoading] = useState(false)
  const { edgestore } = useEdgeStore();
  const ProfileImageRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File>();
  const [urls, setUrls] = useState({
    url: "",
  });
  useEffect(() => {
    getUserProfile().then((result) => setUserData(result.results));
    if (urls.url.length) {
      fetch("/api/profile/image", {
        method: "PATCH",
        body: JSON.stringify(urls),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, [urls]);

  console.log(userData?.name);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      name: userData?.name || '',
      email: userData?.email || '',
      address_1: userData?.address[0] || '',
      address_2:userData?.address[1] || '' ,
      phone_1: userData?.phone[0] || '' ,
      phone_2:userData?.phone[1] || '',
    },
  });
  console.log(userData?.name);

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      fetch('api/profile',{
        method:"PUT",
        body:JSON.stringify(values),
        headers:{
          "Content-Type":"application/json"
        }
      })
    } catch (error) {
      console.log(error);
    }    
    
    console.log(values);
  }

  type User = {
    address: string;
    id: string;
    name: string;
    email: string;
    role: string;
    imageUrl: {
      url: string;
    };
  };
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });
  const { status } = session;
  // console.log(session.data?.user);

  const user = session.data?.user as User;
  // console.log(user?.id);

  if (status === "loading") return <BeatLoader />;

  const profileImageUploadHandler = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    console.log(file);

    console.log("w");

    setFile(e.target.files?.[0]);
    if (file) {
      console.log("w2");

      const res = await edgestore.profileImages.upload({
        file,
        // onProgressChange: (progress) => {
        //   // you can use this to show a progress bar
        // },
        // options: {
        //   replaceTargetUrl: oldFileUrl,
        // }, //replace old image if exist
      });
      toast.success(`Uploaded`);
      setUrls({
        url: res.url,
      });
    }
  };

  const onSubmitHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    fetch("api/profile", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <section className="mt-8">
      <div className="container">
        <Toaster />
        <h2 className="text-2xl font-medium text-center">Profile</h2>
        <div className="p-4 flex justify-center items-center gap-8 mt-8 border border-neutral-200">
          <div
            className="relative p-4 border border-neutral-200 w-fit h-fit flex flex-col items-center cursor-pointer"
            onClick={() => ProfileImageRef?.current?.click()}
          >
            <input
              ref={ProfileImageRef}
              hidden
              className="absolute w-full h-full "
              type="file"
              name="profileImage"
              id="profileImage"
              onChange={profileImageUploadHandler}
            />
            <Image
              className="w-[200px] h-[200px] bg-cover bg-center rounded-full"
              src={
                urls?.url ||
                user.imageUrl?.url ||
                "https://cdn.iconscout.com/icon/free/png-512/free-avatar-370-456322.png?f=webp&w=256"
              }
              width={200}
              height={200}
              alt="profile image"
            />
            <Button
              title="Edit"
              className="py-1 px-2 border border-neutral-200 mt-4 block mx-auto"
            />
          </div>
          <div className="max-w-md  flex flex-col grow gap-4 text-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => <>
                    <FormItem className="relative">
                      <FormLabel className="absolute left-6 -top-2 bg-white border-x-4 border-white">name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} 
                        className="focus-visible:ring-white shadow-none text-base "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => <>
                    <FormItem className="relative">
                      <FormLabel className="absolute left-6 -top-2 bg-white border-x-4 border-white z-10">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} disabled
                        className="focus-visible:ring-white shadow-none text-base !cursor-default "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>}
                />
                 <FormField
                  control={form.control}
                  name="phone_1"
                  render={({ field }) => <>
                    <FormItem className="relative">
                      <FormLabel className="absolute left-6 -top-2 bg-white border-x-4 border-white">Phone 1</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} 
                        className="focus-visible:ring-white shadow-none text-base "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>}
                />
                 <FormField
                  control={form.control}
                  name="phone_2"
                  render={({ field }) => <>
                    <FormItem className="relative">
                      <FormLabel className="absolute left-6 -top-2 bg-white border-x-4 border-white">Phone 2</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} 
                        className="focus-visible:ring-white shadow-none text-base "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>}
                />
                 <FormField
                  control={form.control}
                  name="address_1"
                  render={({ field }) => <>
                    <FormItem className="relative">
                      <FormLabel className="absolute left-6 -top-2 bg-white border-x-4 border-white">address 1</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} 
                        className="focus-visible:ring-white shadow-none text-base "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>}
                />
                 <FormField
                  control={form.control}
                  name="address_2"
                  render={({ field }) => <>
                    <FormItem className="relative">
                      <FormLabel className="absolute left-6 -top-2 bg-white border-x-4 border-white">address 2</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} 
                        className="focus-visible:ring-white shadow-none text-base "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;





