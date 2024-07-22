import { Spinner } from "@/components/ui/spinner";

export default function LoadingSkeleton() {
  return (
    <div className="container m-auto flex items-center justify-center px-6 py-12">
      <Spinner />
    </div>
  );
}
