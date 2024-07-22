import { db } from "@/lib/db";
import { WithSession } from "@/lib/with-session";

export const GET = WithSession(async (req, ctx, session) => {
  try {
    const project = await db.project.findUnique({
      where: { id: ctx.params.projectId },
    });

    return new Response(JSON.stringify(project));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}, {});
