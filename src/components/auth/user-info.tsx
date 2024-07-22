"use client";

import { LogOutIcon } from "lucide-react";
import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from "@/components/ui/data-list";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface UserInfoProps extends React.ComponentPropsWithoutRef<"div"> {
  user?: DefaultSession["user"];
}

const UserInfo = React.forwardRef<HTMLDivElement, UserInfoProps>(
  ({ user, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>User Info</CardTitle>
            <CardDescription>View your user information</CardDescription>
          </CardHeader>
          <CardContent>
            <DataList className="gap-2">
              <DataListItem className="gap-4">
                <DataListLabel>Name</DataListLabel>
                <DataListValue>{user?.name}</DataListValue>
              </DataListItem>
              <Separator className="col-span-2" />
              <DataListItem className="gap-4">
                <DataListLabel>Email</DataListLabel>
                <DataListValue>{user?.email}</DataListValue>
              </DataListItem>
              <Separator className="col-span-2" />
              <DataListItem className="gap-4">
                <DataListLabel>Image</DataListLabel>
                <DataListValue>
                  {user?.image ? (
                    <Image
                      src={user?.image}
                      alt={user?.name || "User Image"}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    "No image"
                  )}
                </DataListValue>
              </DataListItem>
            </DataList>
          </CardContent>
        </Card>
        <Button
          onClick={() => signOut()}
          variant="outline"
          size="lg"
          className="w-full"
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    );
  },
);

UserInfo.displayName = "UserInfo";

export { UserInfo };
