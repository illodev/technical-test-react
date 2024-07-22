"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/lib/constants";
import { db } from "@/lib/db";
import {
  taskStatusInputSchema,
  type TaskStatusInput,
} from "@/lib/schemas/task";

export async function createTaskStatus(data: TaskStatusInput) {
  const parsedData = taskStatusInputSchema.parse(data);

  const taskStatus = await db.taskStatus.create({
    data: parsedData,
    select: {
      id: true,
    },
  });

  revalidateTag(TAGS.TASK_STATUSES);

  return taskStatus;
}

export async function updateTaskStatus(id: string, data: TaskStatusInput) {
  const parsedData = taskStatusInputSchema.parse(data);

  const taskStatus = await db.taskStatus.update({
    where: {
      id,
    },
    data: parsedData,
    select: {
      id: true,
    },
  });

  revalidateTag(TAGS.TASK_STATUSES);

  return taskStatus;
}

export async function deleteTaskStatus(id: string) {
  const taskStatus = await db.taskStatus.delete({
    where: {
      id,
    },
  });

  revalidateTag(TAGS.TASK_STATUSES);

  return taskStatus;
}
