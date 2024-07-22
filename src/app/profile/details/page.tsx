import { getServerSession } from "next-auth";

import { UserInfo } from "@/components/auth/user-info";

export default async function Page() {
  const session = await getServerSession();

  return <UserInfo user={session?.user} />;
}
