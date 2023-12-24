"use client";

import { BeatLoader } from "react-spinners";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    name:"",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmitHandler = async (e: SyntheticEvent) => {
    
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if(data.success){
        toast.success("Account Created") 
        setLoading(false);
        router.push('/login')
      }else{
        toast.error(data.message);
        setLoading(false)
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center p-10 ">
      <Toaster />
      <form
        className="flex flex-col w-[400px] shadow-lg p-10 h-fit mt-20 space-y-4"
        onSubmit={onSubmitHandler}
      >
        <p className="text-center font-medium mb-4">Sign up to continue</p>
        <input
          className="p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={userData.name}
          onChange={onChangeHandler}
          disabled={loading}
        />
        <input
          className="p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
          type="text"
          name="email"
          placeholder="Enter Your Email"
          value={userData.email}
          onChange={onChangeHandler}
          disabled={loading}
        />
        <input
          className="p-2 border border-gray-400 outline-none disabled:bg-transparent/10"
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={onChangeHandler}
          disabled={loading}
        />

        <p className="text-xs my-4">
          By signing up, I accept the Atlassian Cloud Terms of Service and
          acknowledge the Privacy Policy.
        </p>
        <button className="p-2 border border-neutral-200" disabled={loading}>
          {loading ? <BeatLoader size={10} margin={1} /> : "Sign Up "}
        </button>
        <span className="text-center text-sm mt-2">OR</span>
        {/* Google Button */}
        <button
          className="flex items-center justify-center p-2 shadow-md font-medium text-sm mb-4 border border-neutral-200 "
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          {/* <Image src={''} alt="Google Icon" width={16} height={16} /> */}
          <span className="w-11/12">Continue with Google</span>
        </button>
      </form>
    </div>
  );
}

export default Register;
