import { ComponentProps } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Mail } from "@/components/dashboard/data";
import { useMail } from "@/components/dashboard/use-mail";
import { Playground } from "@/lib/types";
import Link from "next/link";

interface PlaygroundListProps {
  items: Playground[];
}

export function PlaygroundList({ items }: PlaygroundListProps) {
  const [mail, setMail] = useMail();

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/code/${item.id}`}
            className={cn(
              "flex flex-col items-start gap-6 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
              mail.selected === item.id && "bg-muted"
            )}
            onClick={(e) => {
              // e.preventDefault(); // Prevent default link behavior
              setMail({
                ...mail,
                selected: item.id,
              });
            }}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    mail.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.createdAt), {
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
            {/* <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.text.substring(0, 300)}
              </div> */}
            <div className="flex items-center gap-2">
              <Badge
                key={item.language}
                variant={getBadgeVariantFromLabel(item.language)}
              >
                {item.language}
              </Badge>
            </div>
          </Link>
        ))}
      </div>
    </ScrollArea>
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
