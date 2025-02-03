import { z } from "zod"; // Import zod
import { zodResolver } from "@hookform/resolvers/zod"; // Import zodResolver from the correct package
import { useForm } from "react-hook-form"; 
import { sendPasswordResetEmail, auth } from "@/Firebase/firebase"; // Your Firebase imports
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgetPasswordPreview() {
  const [responseMessage, setResponseMessage] = useState(""); // To store success or error message
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    setResponseMessage(""); // Reset message before submitting
    try {
      await sendPasswordResetEmail(auth, values.email); // Send reset email
      setResponseMessage("Password reset link sent successfully. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email", error);
      setResponseMessage("Failed to send password reset email. Please try again.");
    }
  }

  return (
    <div className="flex min-h-[40vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            Enter your email address to receive a password reset link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>
              </div>
            </form>
            {/* Displaying the response message */}
            {responseMessage && (
              <div className="mt-4 text-center">
                <p>{responseMessage}</p>
              </div>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
