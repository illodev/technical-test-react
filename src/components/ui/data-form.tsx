"use client";

import * as React from "react";

import { cn, getZodDefaults } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Slot } from "@radix-ui/react-slot";
import { AlertCircleIcon } from "lucide-react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Alert, AlertTitle } from "./alert";
import { Form } from "./form";

export interface FieldContext<TData extends FieldValues> {
  form: UseFormReturn<TData>;
}

export interface FieldDef<TData extends FieldValues> {
  id: string;
  render: React.FC<FieldContext<TData>>;
}

type SchemaType = z.AnyZodObject | z.ZodEffects<any>;

interface DataFormProps<OData, Schema extends SchemaType>
  extends Omit<
    React.HTMLAttributes<HTMLFormElement>,
    "onInvalid" | "children" | "onError"
  > {
  schema: Schema;
  defaultValues?: DefaultValues<z.infer<Schema>>;
  onValid: (
    data: z.infer<Schema>,
    event?: React.BaseSyntheticEvent,
  ) => OData | Promise<OData>;
  onInvalid?: SubmitErrorHandler<z.infer<Schema>>;
  onError?: (props: {
    error: any;
    oldData: z.infer<Schema>;
    newData: z.infer<Schema>;
    resend: (data: z.infer<Schema>) => Promise<z.infer<Schema> | void>;
  }) => void;
  onSuccess?: (data: OData) => any | Promise<any>;
  onClose?: () => void;
  asChild?: boolean;
  showFooter?: boolean;
  children?:
    | React.ReactNode
    | ((
        form: UseFormReturn<z.infer<Schema>> & {
          handle: SubmitHandler<z.infer<Schema>>;
        },
      ) => React.ReactNode);
}

const DataFormComponent = <OData, Schema extends SchemaType>(
  {
    defaultValues,
    onValid,
    onInvalid = (error) => {
      toast.error(`Revise los campos marcados`);
      console.error(error);
    },
    onError = ({ error }) => toast.error(error.message),
    onSuccess,
    onClose,
    schema,
    className,
    asChild = false,
    children,
    showFooter = true,
    ...props
  }: DataFormProps<OData, Schema>,
  ref: React.Ref<HTMLFormElement>,
) => {
  const form = useForm<z.infer<Schema>>({
    resolver: zodResolver(schema),
    defaultValues: getZodDefaults(schema, defaultValues) as DefaultValues<
      z.infer<Schema>
    >,
  });

  React.useEffect(() => {
    window.onbeforeunload = () => {
      if (form.formState.isDirty) {
        return "Cambios sin guardar";
      }
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, [form.formState.isDirty]);

  const handle: SubmitHandler<z.infer<Schema>> = async (data) => {
    try {
      const result = (await onValid(data)) as OData;

      if (!result) {
        throw new Error("No result returned from action");
      }

      if (process.env.NODE_ENV === "development") {
        console.log("dev result:", result);
      }

      await onSuccess?.(result);

      form.reset(data);

      onClose?.();

      return result;
    } catch (error) {
      const errorObj = error as any;

      if (process.env.NODE_ENV === "development") {
        console.log("dev error:", errorObj);
      }

      try {
        console.log("errorData:", errorObj);
        if (errorObj.fields) {
          Object.entries(errorObj.fields).forEach(([path, message]) => {
            form.setError(path as Path<z.infer<Schema>>, {
              type: "manual",
              message: message as string,
            });
          });
        }
      } catch (error) {
        console.log("dev error:", error);
      }

      onError?.({
        error: errorObj,
        oldData: data,
        newData: form.getValues(),
        resend: (data) =>
          form.handleSubmit((formData) =>
            handle(
              {
                ...formData,
                ...data,
              },
              undefined,
            ),
          )(undefined),
      });
    }
  };

  const Comp = asChild ? Slot : "form";

  return (
    <Form {...form}>
      <Comp
        ref={ref}
        onSubmit={form.handleSubmit(handle, onInvalid)}
        className={cn("flex flex-grow flex-col", className)}
        {...props}
      >
        {form.formState.errors.root && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>{form.formState.errors.root.message}</AlertTitle>
          </Alert>
        )}
        {typeof children === "function"
          ? children({ ...form, handle })
          : children}
      </Comp>
    </Form>
  );
};

const DataForm = React.forwardRef(DataFormComponent) as <
  Schema extends SchemaType,
  OData,
>(
  props: DataFormProps<OData, Schema> & { ref?: React.Ref<HTMLFormElement> },
) => React.ReactElement;

export { DataForm };
