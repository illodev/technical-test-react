"use server";

import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

import { TAGS } from "@/lib/constants";
import { db } from "@/lib/db";
import { projectInputSchema, type ProjectInput } from "@/lib/schemas/project";

export async function createProject(data: ProjectInput) {
  try {
    const parsedData = projectInputSchema.parse(data);
    const session = await getServerSession();

    const project = await db.project.create({
      data: {
        ...parsedData,
        ProjectMember: {
          create: {
            user: {
              connect: {
                email: session?.user?.email as string,
              },
            },
          },
        },
      },
    });

    revalidateTag(TAGS.PROJECTS);

    return project;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("A project with this name already exists.");
      }
    }

    throw error;
  }
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  try {
    const parsedData = projectInputSchema.parse(data);

    const project = await db.project.update({
      where: {
        id,
      },
      data: parsedData,
    });

    revalidateTag(TAGS.PROJECTS);

    return project;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("A project with this name already exists.");
      }
    }

    throw error;
  }
}

export async function deleteProject(id: string) {
  const project = await db.project.delete({
    where: {
      id,
    },
  });

  revalidateTag(TAGS.PROJECTS);

  return project;
}
