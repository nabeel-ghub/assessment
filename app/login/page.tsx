"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export default function Login() {
    const router = useRouter();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");
        const auth: string | null = localStorage.getItem("auth");
        if(!auth) {
            const user = {
                email: email,
                pass: password
            }
            localStorage.setItem("auth", JSON.stringify(user));
            router.push("/dashboard")
        }
    }

    return (
        <div className="h-[100vh] w-[100%] bg-zinc-900 flex justify-center items-center">
            <Card className="w-[85vw] md:w-md xl:scale-[1.3]">
      <CardHeader>
        <CardTitle>Login to todo account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input name="password" type="password" required />
            </div>
          </div>
          <CardFooter className="flex-col gap-2 mt-[20px]">
        <Button type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
        </form>
      </CardContent>
    </Card>
        </div>
    )
}