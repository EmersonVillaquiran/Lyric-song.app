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
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const { registerUser } = useAuth();

  const onSubmit = (data) => {
    registerUser(data);
    form.reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-full h-[800px] flex place-content-center items-center ">
      <Form {...form}>
        <form
          className="max-w-[400px] w-full shadow-lg shadow-[#787a7e92] p-5 rounded-lg grid relative gap-6 border-[0.1em] border-white"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h2 className="text-center text-[1.5em]">Register</h2>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    className="bg-slate-200 text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    {...field}
                    className="bg-slate-200 text-black"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <Button className="mt-5" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;
