import { db } from "@/lib/db";
import { WithSession } from "@/lib/with-session";

export const GET = WithSession(async (req, ctx, session) => {
  try {
    const labels = await db.taskLabel.findMany({
      where: {
        projectId: ctx.params.projectId,
      },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(labels));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}, {});
