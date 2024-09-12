import UserLogged from "@/components/LoginPage/UserLogged";
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
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const LoginPage = ({}) => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { loginUser } = useAuth();

  const onSubmit = (data) => {
    loginUser(data);
    form.reset({
      email: "",
      password: "",
    });
  };

  if (localStorage.getItem("token")) {
    return <UserLogged />;
  }
  return (
    <div className="w-full flex place-content-center items-center lg:h-full ">
      <Form {...form}>
        <form
          className="max-w-[400px] w-full p-5 rounded-lg grid relative gap-6 border-[0.1em] border-white  bg-black shadow-zinc-500 shadow-2xl"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h2 className="text-center text-[1.5em]">Login</h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type="email"
                    {...field}
                    className=" bg-slate-200 text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    name="password"
                    type="password"
                    {...field}
                    className="border-[0.1em] border-white bg-slate-200 text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Link to="/register"> Don't have a account? ➡️ Register page</Link>
          <Button className="mt-5" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;
