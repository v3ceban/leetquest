import { cn } from "@/lib/utils";
import PropTypes from "prop-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UserSettingsDialog = ({ user }) => {
  const userName = user.name.split(" ")[0];

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Hi, {userName}!</DialogTitle>
        <DialogDescription>
          You can change your name and profile picture here. You can also delete
          your account or progress in Danger Zone.
        </DialogDescription>
      </DialogHeader>
      <Tabs defaultValue="account">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="account">Settings</TabsTrigger>
          <TabsTrigger value="password">Danger Zone</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <UserSettingsCard user={user} />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default UserSettingsDialog;

UserSettingsDialog.propTypes = {
  user: PropTypes.object.isRequired,
};

export const UserSettingsCard = ({ user, className }) => {
  return (
    <Card className={cn(className, "border-none pt-2 -mx-6")}>
      <CardContent>
        <form>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={user.name}
            required
          />
          <Label htmlFor="image">Profile Picture</Label>
          <Input
            id="image"
            name="image"
            type="url"
            defaultValue={user.image}
            required
          />
          <Button type="submit" variant="primary">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

UserSettingsCard.propTypes = {
  user: PropTypes.object.isRequired,
  className: PropTypes.string,
};
