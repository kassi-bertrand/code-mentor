import { ComponentProps, Suspense } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Playground, User } from "@/lib/types";
import Link from "next/link";
import { useSelectedPlayground } from "@/components/dashboard/use-playground";
import { usePlaygroundDescription } from "@/components/dashboard/hooks/usePlaygroundDescription";
import { Skeleton } from "@/components/ui/skeleton";

interface PlaygroundListProps {
  items: Playground[];
  userData: User
}

export function PlaygroundList({ items, userData }: PlaygroundListProps) {
  const [selectedPlayground, setSelectedPlayground] = useSelectedPlayground()

  return (
    <ScrollArea className="h-[calc(100vh-100px)]"> {/**I don't understand why "className="h-screen" prevents scrolling */}
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              selectedPlayground.selected === item.id && "bg-muted"
            )}
            onClick={(e) => {
              setSelectedPlayground({
                ...selectedPlayground,
                selected: item.id,
              });
            }}
          >
            <Suspense fallback={<PlaygroundItemSkeleton/>}>
              <PlaygroundItem playground={item} userId={userData.id}/>
            </Suspense>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function PlaygroundItem({
  playground,
  userId,
}: {
  playground: Playground;
  userId: string;
}) {
  const { description, socket } = usePlaygroundDescription(
    playground.id,
    userId
  );

  const [selectedPlayground, setSelectedPlayground] = useSelectedPlayground()

  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{playground.name}</div>
          </div>
          <div
            className={cn(
              "ml-auto text-xs",
              selectedPlayground.selected === playground.id
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {formatDistanceToNow(new Date(playground.createdAt), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>
      {/**here i would like to preview the challenge of the playground, but it's stored in R2. */}
      {/**I am not quit sure how to properly address it, yet. I would like to revisit it later. */}
      {/**But here is documentation that can be useful, when i come back
       *  - https://nextjs.org/docs/app/building-your-application/data-fetching/patterns
       *  - https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
       */}
      <div className="line-clamp-2 text-xs text-muted-foreground">
      {description?.substring(0, 300)}
      </div>
      <div className="flex items-center gap-2">
        <Badge
          key={playground.language}
          variant={getBadgeVariantFromLabel(playground.language)}
        >
          {playground.language}
        </Badge>
      </div>
    </div>
  );
}


function PlaygroundItemSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-4">
      {/* Title Skeleton */}
      <Skeleton className="h-6 w-3/4 rounded-md" />
      
      {/* Date Skeleton */}
      <Skeleton className="h-4 w-1/3 rounded-md" />
      
      {/* Description Skeleton */}
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-5/6 rounded-md" />

      {/* Badge Skeleton */}
      <div className="flex gap-2">
        <Skeleton className="h-6 w-12 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-10 rounded-md" />
      </div>
    </div>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
