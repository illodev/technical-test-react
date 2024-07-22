"use client";

import * as React from "react";

import { useStore } from "@tanstack/react-store";
import { Store } from "@tanstack/store";
import { AlertCircleIcon } from "lucide-react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "./alert";

type Dialogs = {
  [key: string]: DialogContent;
};

type DialogContent = {
  title?: string;
  description?: string;
  suspense?: React.ReactNode;
  render: (onClose: () => void) => JSX.Element;
} & React.HTMLAttributes<HTMLDivElement>;

export const store = new Store<Dialogs>({});

export const showDialog = (content: DialogContent) => {
  store.setState((prev) => ({
    ...prev,
    [Math.random().toString(36).substr(2, 9)]: content,
  }));
};

export const hideDialog = (key: string) => {
  store.setState((prev) => {
    const newState = { ...prev };
    delete newState[key];
    return newState;
  });
};

export const DialogContainer = () => {
  const dialogs = useStore(store);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <React.Fragment>
      {Object.entries(dialogs).map(([key, sheetContent]) => (
        <DialogComponent
          key={key}
          id={key}
          dialogContent={sheetContent}
          isDesktop={isDesktop}
        />
      ))}
    </React.Fragment>
  );
};

const DialogComponent = ({
  id,
  dialogContent,
  isDesktop,
}: {
  id: string;
  dialogContent: DialogContent;
  isDesktop: boolean;
}) => {
  if (dialogContent === null) {
    return null;
  }

  const { title, render, className, suspense, ...props } = dialogContent;

  const onClose = () => hideDialog(id);

  if (isDesktop) {
    return (
      <Dialog
        defaultOpen
        onOpenChange={(open) => {
          if (!open) {
            onClose();
          }
        }}
      >
        <DialogContent
          className={cn(
            "flex max-h-dvh flex-col gap-0 lg:max-h-[calc(100vh-5rem)] p-0",
            className,
          )}
          {...props}
        >
          <DialogHeader className="flex-none p-6 pb-4 border-b pr-10">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{dialogContent.description}</DialogDescription>
          </DialogHeader>
          <ErrorBoundary
            errorComponent={({ error }) => (
              <div className="p-6">
                <Alert variant="destructive">
                  <AlertCircleIcon className="h-4 w-4" />
                  <AlertTitle>Ocurrió un error</AlertTitle>
                  <AlertDescription>
                    {error instanceof Error ? error.message : error}
                  </AlertDescription>
                </Alert>
              </div>
            )}
          >
            <React.Suspense fallback={suspense}>
              {render(onClose)}
            </React.Suspense>
          </ErrorBoundary>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DrawerContent className={cn("flex max-h-dvh flex-col gap-0", className)}>
        <DrawerHeader className="flex-none border-b">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{dialogContent.description}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-grow flex-col overflow-y-auto">
          <ErrorBoundary
            errorComponent={({ error }) => (
              <Alert variant="destructive">
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>Ocurrió un error</AlertTitle>
                <AlertDescription>
                  {error instanceof Error ? error.message : error}
                </AlertDescription>
              </Alert>
            )}
          >
            <React.Suspense fallback={suspense}>
              {render(onClose)}
            </React.Suspense>
          </ErrorBoundary>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
