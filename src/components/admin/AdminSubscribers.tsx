import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminSubscribers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Subscribers</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Newsletter subscribers will appear here.</p>
      </CardContent>
    </Card>
  );
}