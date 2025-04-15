import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
export const FormSeller = () => {
  return (
    <Card className="w-full h-full p-4 flex flex-col justify-between">
      <CardHeader className="p-0 flex gap-4">
        <Avatar>
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold text-1xl">Carlos rodriguez</p>
          <p className="text-sm text-gray-500">Agente inmobiliario</p>
          <p className="text-sm text-gray-500">+123 456 7890</p>
        </div>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Telefono</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Message</Label>
              <Textarea id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="w-full bg-green-500">Contact agent</Button>
      </CardFooter>
    </Card>
  );
};
