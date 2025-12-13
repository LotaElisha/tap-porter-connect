import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AdminContacts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Contact form submissions will appear here.</p>
      </CardContent>
    </Card>
  );
}