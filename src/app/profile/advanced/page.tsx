import { CacheConfiguration } from "@/components/auth/cache-configuration";
import { QUERY_CACHE_KEY } from "@/config/query";

export default function Page() {
  return <CacheConfiguration storageKey={QUERY_CACHE_KEY} />;
}
