import { Dictionary } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface TeamsBadgeProps {
    data: Dictionary[]
}

export default function TeamsBadge({data}: TeamsBadgeProps) {
  return (
    <div className="flex -space-x-2">
      {data.slice(0, 4).map((user) => (
        <Avatar key={user.id} className="h-8 w-8 border-2 border-background">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
      ))}
      {data.length > 4 && (
        <div className="flex z-10 h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-sm">
          +{data.length - 4}
        </div>
      )}
    </div>
  );
}
