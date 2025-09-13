import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages((prevMessages) => [...prevMessages, text]);
    setText("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {/* Messages Container */}
      <div className="w-full p-4 pb-24 space-y-2 h-screen bg-gray-100 overflow-y-scroll">
        {messages.map((message, index) => (
          <Card key={index} className="w-fit py-2 px-4">
            <CardContent className="p-0">{message}</CardContent>
          </Card>
        ))}

        <Button onClick={handleLogout} className="fixed top-4 right-4">
          Logout
        </Button>
      </div>

      {/* Send Form */}
      <div>
        <form
          onSubmit={handleSend}
          className="border-t bg-white w-full fixed bottom-0 left-0 p-4 flex justify-between items-center gap-2"
        >
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="py-5"
            type="text"
            placeholder="Enter a message..."
          />
          <Button className="font-semibold" size="lg">
            Send
          </Button>
        </form>
        <p></p>
      </div>
    </div>
  );
}
