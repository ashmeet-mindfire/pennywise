import { registerUser } from "@/api/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserContext } from "@/context/userContext";
import { IUserContext } from "@/lib/types";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function LoginRegisterTabs({ closeDialog }: { closeDialog: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { login } = useContext(UserContext) as IUserContext;
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return toast.error("Please fill all mandatory fields");
    const success = await login(email, password);
    if (success) {
      closeDialog();
      navigate("dashboard");
    }
  };

  const handleRegister = () => {
    if (!email || !password || !name || !confirmPassword) return toast.error("Please fill all mandatory fields");
    if (password !== confirmPassword) return toast.error("Passwords do not match");

    const toastId = toast.loading("Logging In");
    registerUser(name, email, password)
      .then(async () => {
        toast.success("Successfully registered", { id: toastId });
        const success = await login(email, password);
        if (success) closeDialog();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg ?? "Something went wrong, please try later", { id: toastId });
        console.log(err);
      });
  };

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Sign In</TabsTrigger>
        <TabsTrigger value="register">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Already have an account? Sign In</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleLogin}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Visiting for the first time? Create a new account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleRegister}>Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
