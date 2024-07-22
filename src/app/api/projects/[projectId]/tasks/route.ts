import { db } from "@/lib/db";
import { WithSession } from "@/lib/with-session";

export const GET = WithSession(async (req, ctx, session) => {
  try {
    const task = (
      await db.task.findMany({
        where: {
          projectId: ctx.params.projectId,
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
        orderBy: { createdAt: "desc" },
      })
    ).map((task) => {
      const { project, ...rest } = task;
      return {
        ...rest,
        key: task.project.key + "-" + task.number,
      };
    });

    return new Response(JSON.stringify(task));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}, {});
