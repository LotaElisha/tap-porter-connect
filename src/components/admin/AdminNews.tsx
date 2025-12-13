import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminNews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>News Management</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">News article management coming soon.</p>
      </CardContent>
    </Card>
  );
}