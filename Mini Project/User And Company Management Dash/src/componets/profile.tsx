import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: string;
  phone: string;
  address: string;
}

export function EditProfileDialog({
  user,
  handleUpdate,
}: {
  user: User;
  handleUpdate: (updatedUser: User) => void;
}) {
  const [formData, setFormData] = useState(user);
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
    handleUpdate(formData);
    setOpen(false); // Close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        {" "}
        {/* Wider form */}
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile details and click save when done.
          </DialogDescription>
        </DialogHeader>
        {/* Two-column layout for form fields */}
        <div className="grid grid-cols-2 gap-4 py-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col gap-1">
              <Label htmlFor={key} className="capitalize font-medium">
                {key}
              </Label>
              <Input
                id={key}
                value={value}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
