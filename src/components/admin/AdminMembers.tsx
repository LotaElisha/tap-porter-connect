import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminMembers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Management</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Member management features coming soon. View registrations in the database.</p>
      </CardContent>
    </Card>
  );
}