import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { salesData } from "@/constants/data";

export function RecentSales() {
  return (
    <div className="space-y-8">
      {salesData.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.avatar} alt={`Avatar of ${sale.name}`} />
            <AvatarFallback className="text-white bg-primary">{sale.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-sm text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  );
}
