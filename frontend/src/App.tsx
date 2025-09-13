import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardFooter } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import api from "./api/axios";

export default function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const getUser = async () => {
      const response = await api.get("/");
      console.log(response);
    };
    getUser();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="mahmoud"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
