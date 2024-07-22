"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/lib/constants";
import { db } from "@/lib/db";
import { taskLabelInputSchema, type TaskLabelInput } from "@/lib/schemas/task";

export async function createTaskLabel(data: TaskLabelInput) {
  const parsedData = taskLabelInputSchema.parse(data);

  const taskLabel = await db.taskLabel.create({
    data: parsedData,
    select: {
      id: true,
    },
  });

  revalidateTag(TAGS.TASK_LABELS);

  return taskLabel;
}

export async function updateTaskLabel(id: string, data: TaskLabelInput) {
  const parsedData = taskLabelInputSchema.parse(data);

  const taskLabel = await db.taskLabel.update({
    where: {
      id,
    },
    data: parsedData,
    select: {
      id: true,
    },
  });

  revalidateTag(TAGS.TASK_LABELS);

  return taskLabel;
}

export async function deleteTaskLabel(id: string) {
  const taskLabel = await db.taskLabel.delete({
    where: {
      id,
    },
  });

  revalidateTag(TAGS.TASK_LABELS);

  return taskLabel;
}
