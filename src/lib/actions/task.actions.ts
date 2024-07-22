"use server";

import { revalidateTag } from "next/cache";

import { TAGS } from "@/lib/constants";
import { db } from "@/lib/db";
import { taskInputSchema, type TaskInput } from "@/lib/schemas/task";
import { faker } from "@faker-js/faker";

export async function createTask(data: TaskInput) {
    const parsedData = taskInputSchema.parse(data);

    const lastTask = await db.task.findFirst({
        where: {
            projectId: parsedData.projectId,
        },
        orderBy: {
            number: "desc",
        },
    });

    const task = await db.task.create({
        data: {
            number: lastTask ? lastTask.number + 1 : 1,
            ...parsedData,
        },
        include: {
            priority: true,
            status: true,
            label: true,
            project: {
                select: {
                    key: true,
                },
            },
        },
    });

    revalidateTag(TAGS.TASKS);

    return {
        ...task,
        key: task.project.key + "-" + task.number,
    };
}

export async function updateTask(id: string, data: TaskInput) {
    const parsedData = taskInputSchema.parse(data);

    const task = await db.task.update({
        where: {
            id,
        },
        data: parsedData,
        include: {
            priority: true,
            status: true,
            label: true,
            project: {
                select: {
                    key: true,
                },
            },
        },
    });

    revalidateTag(TAGS.TASKS);

    return {
        ...task,
        key: task.project.key + "-" + task.number,
    };
}

export async function deleteTask(id: string) {
    const task = await db.task.delete({
        where: {
            id,
        },
    });

    revalidateTag(TAGS.TASKS);

    return task;
}

export async function executeTaskSeed(projectId: string) {
    const NUMBER_OF_TASKS = 1100;

    // Delete all tasks for the project
    await db.task.deleteMany({
        where: {
            projectId,
        },
    });

    // Delete all labels for the project
    await db.taskLabel.deleteMany({
        where: {
            projectId,
        },
    });

    // Delete all statuses for the project
    await db.taskStatus.deleteMany({
        where: {
            projectId,
        },
    });

    // Delete all priorities for the project
    await db.taskPriority.deleteMany({
        where: {
            projectId,
        },
    });

    // Create labels
    const labelObjects = [
        { name: "Bug", color: "rose" },
        { name: "Feature", color: "green" },
        { name: "Improvement", color: "blue" },
        { name: "Documentation", color: "purple" },
        { name: "Refactor", color: "yellow" },
        { name: "Design", color: "indigo" },
    ];

    await db.taskLabel.createMany({
        data: labelObjects.map((label) => ({
            name: label.name,
            color: label.color,
            projectId,
        })),
    });

    const labels = await db.taskLabel.findMany({
        where: {
            projectId,
        },
    });

    // Create statuses
    const statusObjects = [
        { name: "To Do", color: "yellow" },
        { name: "In Progress", color: "blue" },
        { name: "Done", color: "green" },
    ];

    await db.taskStatus.createMany({
        data: statusObjects.map((status) => ({
            name: status.name,
            color: status.color,
            projectId,
        })),
    });

    const statuses = await db.taskStatus.findMany({
        where: {
            projectId,
        },
    });

    // Create priorities
    const priorityObjects = [
        { name: "Low", color: "gray" },
        { name: "Medium", color: "blue" },
        { name: "High", color: "rose" },
    ];

    await db.taskPriority.createMany({
        data: priorityObjects.map((priority) => ({
            name: priority.name,
            color: priority.color,
            projectId,
        })),
    });

    const priorities = await db.taskPriority.findMany({
        where: {
            projectId,
        },
    });

    // Create tasks

    const tasks = Array.from({ length: NUMBER_OF_TASKS }, (_, index) => ({
        projectId,
        number: index + 1,
        name: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        // Random label
        labelId: labels[Math.floor(Math.random() * labels.length)].id,
        // Random status
        statusId: statuses[Math.floor(Math.random() * statuses.length)].id,
        // Random priority
        priorityId:
            priorities[Math.floor(Math.random() * priorities.length)].id,
    }));

    await db.task.createMany({
        data: tasks,
    });

    revalidateTag(TAGS.TASKS);

    return tasks;
}
