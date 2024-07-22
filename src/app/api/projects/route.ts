import { db } from "@/lib/db";
import { WithSession } from "@/lib/with-session";

export const GET = WithSession(async (req, ctx, session) => {
  try {
    const projects = await db.project.findMany({
      where: {
        ProjectMember: {
          some: {
            userId: session.user.id,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify(projects));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}, {});
