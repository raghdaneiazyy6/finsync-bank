"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomInput from "@/components/CustomInput";
import { PasswordInput } from "@/components/PasswordInput";
import { Loader2 } from "lucide-react";
import { signInSchema, signUpSchema } from "@/lib/authSchemas";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "@/components/PlaidLink";

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isSignIn = type === "sign-in";

  const form = useForm({
    resolver: zodResolver(type === "sign-in" ? signInSchema : signUpSchema),
    defaultValues:
      type === "sign-in"
        ? {
            email: "",
            password: "",
          }
        : {
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            postalCode: "",
            dateOfBirth: "",
            ssn: "",
            email: "",
            password: "",
          },
  });

  // Handler to auto-format SSN as XXX-XX-XXXX
  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3 && value.length <= 5)
      value = value.slice(0, 3) + "-" + value.slice(3);
    else if (value.length > 5)
      value =
        value.slice(0, 3) + "-" + value.slice(3, 5) + "-" + value.slice(5, 9);
    e.target.value = value;

    if (!isSignIn && "ssn" in form.getValues()) {
      form.setValue("ssn" as any, value);
      form.trigger("ssn" as any);
    }
  };

  // Handler to format state to uppercase
  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 2);
    e.target.value = value;
    if (!isSignIn && "state" in form.getValues()) {
      form.setValue("state" as any, value);
      form.trigger("state" as any);
    }
  };

  const onSubmit = async (values: SignUpParams | SignInParams) => {
    try {
      setIsLoading(true);
      // Sign up with Appwrite & create plain link token

      if (type === "sign-in") {
        const signInValues = values as SignInParams;
        await signIn(signInValues);
        if (signInValues) router.push("/");
      } else {
        const signUpValues = values as SignUpParams;
        const newUser = await signUp(signUpValues);
        setUser(newUser);
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className=" cursor-pointer items-center flex gap-1 ">
          <Image src="/icons/logo.svg" alt="logo" width={34} height={34} />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            FinSync
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user!} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {!isSignIn && (
                <div className="space-y-4">
                  {/* First and Last Name Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <CustomInput
                      form={form}
                      name="firstName"
                      label="First Name"
                      placeholder="ex: John"
                    />
                    <CustomInput
                      form={form}
                      name="lastName"
                      label="Last Name"
                      placeholder="ex: Doe"
                    />
                  </div>

                  {/* Address Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <CustomInput
                      form={form}
                      name="address1"
                      label="Address"
                      placeholder="Enter your specific address"
                    />
                    <CustomInput
                      form={form}
                      name="city"
                      label="City"
                      placeholder="Enter your City"
                    />
                  </div>

                  {/* State and Postal Code Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <CustomInput
                      form={form}
                      name="state"
                      label="State"
                      placeholder="ex: NY"
                      onChange={handleStateChange}
                    />
                    <CustomInput
                      form={form}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="ex: 11101"
                    />
                  </div>

                  {/* Date of Birth and SSN Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <CustomInput
                      form={form}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="yyyy-mm-dd"
                      type="date"
                    />
                    <CustomInput
                      form={form}
                      name="ssn"
                      label="SSN"
                      placeholder="123-45-6789"
                      type="text"
                      onChange={handleSSNChange}
                    />
                  </div>
                </div>
              )}

              {/* Email Row */}
              <div className="grid grid-cols-1">
                <CustomInput
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                />
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger("password");
                          }}
                          onBlur={() => form.trigger("password")}
                          placeholder="Enter your password"
                          className={fieldState.error ? "border-red-500" : ""}
                          showTooltip={!isSignIn}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="form-btn w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : isSignIn ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          <footer className="flex justify-center gap-1 mt-4">
            <p className="text-14 font-normal text-gray-600">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Link
              href={isSignIn ? "/sign-up" : "/sign-in"}
              className="form-link cursor-pointer"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
