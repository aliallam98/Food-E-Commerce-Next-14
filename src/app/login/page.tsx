"use client";
import { BeatLoader } from "react-spinners";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { signIn } from "next-auth/react";

function Register() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const onSubmitHandler = async (e:SyntheticEvent) => {
    e.preventDefault()
    try {
      setLoading(true);
      await signIn("credentials", { ...userData });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex justify-center p-10 ">
      <form className="flex flex-col w-[400px] shadow-lg p-10 h-fit mt-20 space-y-4"
      onSubmit={onSubmitHandler}
      >
        <p className="text-center font-medium mb-4">Login to continue</p>
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
        <button
          type="submit"
          className="p-2 border border-neutral-200"
          disabled={loading}
        >
          {loading ? <BeatLoader size={10} margin={1} /> : "Log In "}
        </button>
        <span className="text-center text-sm mt-2">OR</span>

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
