"use client";

import { EraserIcon, InfoIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const getUsedSpaceOfLocalStorageInBytes = (key: string) => {
  if (typeof window === "undefined") {
    return 0;
  }

  const item = localStorage.getItem(key);

  if (!item) {
    return 0;
  }

  return item.length;
};

const getUnusedSpaceOfLocalStorageInBytes = (key: string) => {
  return 5242880 - getUsedSpaceOfLocalStorageInBytes(key);
};

const getLocalStorageQuotaInBytes = () => {
  return 5242880;
};

const formatBytes = (bytes: number) => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

interface CacheConfigurationProps {
  storageKey: string;
}

const CacheConfiguration = ({ storageKey }: CacheConfigurationProps) => {
  const usedSpace = getUsedSpaceOfLocalStorageInBytes(storageKey);
  const unusedSpace = getUnusedSpaceOfLocalStorageInBytes(storageKey);
  const quota = getLocalStorageQuotaInBytes();

  return (
    <div>
      <Alert className="mb-4">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Cache Configuration</AlertTitle>
        <AlertDescription>
          If you are experiencing issues with the app, you can try clearing the
          cache. This will remove all the data stored in your browser&apos;s
          local storage.
        </AlertDescription>
      </Alert>
      <Card>
        <CardHeader>
          <CardTitle>Local Storage Cache</CardTitle>
          <CardDescription>
            Information about the data stored in your browser&apos;s local
            storage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataList className="gap-2">
            <DataListItem className="gap-4">
              <DataListLabel>Used Space</DataListLabel>
              <DataListValue>{formatBytes(usedSpace)}</DataListValue>
            </DataListItem>
            <Separator className="col-span-2" />
            <DataListItem className="gap-4">
              <DataListLabel>Unused Space</DataListLabel>
              <DataListValue>{formatBytes(unusedSpace)}</DataListValue>
            </DataListItem>
            <Separator className="col-span-2" />
            <DataListItem className="gap-4">
              <DataListLabel>Local Storage Quota</DataListLabel>
              <DataListValue>{formatBytes(quota)}</DataListValue>
            </DataListItem>
          </DataList>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              localStorage.removeItem(storageKey);
              window.location.reload();
            }}
          >
            <EraserIcon className="mr-2 h-4 w-4" />
            Clear Cache
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export { CacheConfiguration };
