"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/lib/constants";
import { db } from "@/lib/db";
import {
  taskPriorityInputSchema,
  type TaskPriorityInput,
} from "@/lib/schemas/task";

export async function createTaskPriority(data: TaskPriorityInput) {
  const parsedData = taskPriorityInputSchema.parse(data);

  const taskPriority = await db.taskPriority.create({
    data: parsedData,
    select: {
      id: true,
    },
  });

  revalidateTag(TAGS.TASK_PRIORITIES);

  return taskPriority;
}

export async function updateTaskPriority(id: string, data: TaskPriorityInput) {
  const parsedData = taskPriorityInputSchema.parse(data);

  const taskPriority = await db.taskPriority.update({
    where: {
      id,
    },
    data: parsedData,
    select: {
      id: true,
    },
  });

  revalidateTag(TAGS.TASK_PRIORITIES);

  return taskPriority;
}

export async function deleteTaskPriority(id: string) {
  const taskPriority = await db.taskPriority.delete({
    where: {
      id,
    },
  });

  revalidateTag(TAGS.TASK_PRIORITIES);

  return taskPriority;
}
