import { clsx, type ClassValue } from "clsx";
import { DefaultValues } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export const getLocale = () => {
  return typeof window !== "undefined" ? navigator.language : "en-US";
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (value: string) => {
  if (!value) return "";

  return new Intl.DateTimeFormat(getLocale(), {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
    .format(new Date(value))
    .split("/")
    .reverse()
    .join("/");
};

type SchemaType = z.AnyZodObject | z.ZodEffects<any>;

export function getZodDefaults<Schema extends SchemaType>(
  schema: Schema,
  defaultValues?: DefaultValues<z.infer<Schema>>,
): z.infer<Schema> {
  if (schema instanceof z.ZodObject) {
    return Object.fromEntries(
      Object.entries(schema.shape).map(([key, value]) => {
        if (
          defaultValues &&
          key in defaultValues &&
          defaultValues[key] !== undefined
        ) {
          return [key, defaultValues[key]];
        }

        if (value instanceof z.ZodDefault) {
          return [key, value._def.defaultValue()];
        }

        return [key, undefined];
      }),
    );
  }

  if (schema instanceof z.ZodEffects) {
    return getZodDefaults(schema._def.schema, defaultValues);
  }
}
