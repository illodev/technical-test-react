import { Session, getServerSession } from "next-auth";
import { NextRequest } from "next/server";

import { authOptions } from "@/lib/auth";

interface WithSessionOptions {
  grantAccess?: (session: Session) => boolean;
}
interface RouteContext {
  params: Record<string, string>;
  query: Record<string, string>;
}

type RouteHandler<TResponse> = (
  req: NextRequest,
  ctx: RouteContext,
  session: Session,
) => Promise<TResponse>;

/**
 * Middleware that adds a session object to the request context.
 * @param handler - The route handler function.
 * @param options - The options for the middleware.
 * @returns A function that takes a NextRequest and a RouteContext and returns a Promise of a Response.
 */
function WithSession<TResponse>(
  handler: RouteHandler<TResponse>,
  options: WithSessionOptions,
) {
  return async (req: NextRequest, ctx: RouteContext) => {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    if (options.grantAccess && !options.grantAccess(session)) {
      return new Response("Forbidden", { status: 403 });
    }

    return handler(req, ctx, session);
  };
}

export { WithSession };
