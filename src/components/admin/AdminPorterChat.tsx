import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Star, MessageCircle, Clock, User, Mail, Phone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface PorterMessage {
  id: string;
  author_name: string;
  author_email: string | null;
  author_phone: string | null;
  message: string;
  is_approved: boolean;
  is_featured: boolean;
  admin_response: string | null;
  created_at: string;
  approved_at: string | null;
}

export function AdminPorterChat() {
  const [messages, setMessages] = useState<PorterMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [responseText, setResponseText] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("porter_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("porter_messages")
        .update({ 
          is_approved: true, 
          approved_at: new Date().toISOString(),
          admin_response: responseText[id] || null 
        })
        .eq("id", id);

      if (error) throw error;

      toast({ title: "Message approved" });
      fetchMessages();
    } catch (error) {
      toast({ title: "Error", description: "Failed to approve", variant: "destructive" });
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("porter_messages")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({ title: "Message rejected and deleted" });
      fetchMessages();
    } catch (error) {
      toast({ title: "Error", description: "Failed to reject", variant: "destructive" });
    }
  };

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from("porter_messages")
        .update({ is_featured: !currentFeatured })
        .eq("id", id);

      if (error) throw error;

      toast({ title: currentFeatured ? "Removed from featured" : "Marked as featured" });
      fetchMessages();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update", variant: "destructive" });
    }
  };

  const handleAddResponse = async (id: string) => {
    if (!responseText[id]?.trim()) return;

    try {
      const { error } = await supabase
        .from("porter_messages")
        .update({ admin_response: responseText[id] })
        .eq("id", id);

      if (error) throw error;

      toast({ title: "Response added" });
      setResponseText({ ...responseText, [id]: "" });
      fetchMessages();
    } catch (error) {
      toast({ title: "Error", description: "Failed to add response", variant: "destructive" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pendingMessages = messages.filter((m) => !m.is_approved);
  const approvedMessages = messages.filter((m) => m.is_approved);

  const MessageCard = ({ msg, showActions }: { msg: PorterMessage; showActions: boolean }) => (
    <Card className={msg.is_featured ? "border-primary/50" : ""}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{msg.author_name}</span>
                {msg.is_featured && <Star className="h-4 w-4 text-primary fill-primary" />}
                {msg.is_approved ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">Approved</Badge>
                ) : (
                  <Badge variant="outline" className="text-amber-600 border-amber-600">Pending</Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(msg.created_at)}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
          {msg.author_email && (
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {msg.author_email}
            </span>
          )}
          {msg.author_phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {msg.author_phone}
            </span>
          )}
        </div>

        <p className="text-foreground leading-relaxed mb-4">{msg.message}</p>

        {msg.admin_response && (
          <div className="p-4 bg-muted rounded-lg border-l-4 border-primary mb-4">
            <span className="text-sm font-medium text-primary block mb-1">TAP Response:</span>
            <p className="text-sm text-muted-foreground">{msg.admin_response}</p>
          </div>
        )}

        {showActions && !msg.is_approved && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-2">
              <Textarea
                placeholder="Add a response (optional)..."
                value={responseText[msg.id] || ""}
                onChange={(e) => setResponseText({ ...responseText, [msg.id]: e.target.value })}
                rows={2}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleApprove(msg.id)} className="flex-1">
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button variant="destructive" onClick={() => handleReject(msg.id)} className="flex-1">
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        )}

        {showActions && msg.is_approved && (
          <div className="space-y-4 pt-4 border-t">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleToggleFeatured(msg.id, msg.is_featured)}
                className="flex-1"
              >
                <Star className={`h-4 w-4 mr-2 ${msg.is_featured ? "fill-primary text-primary" : ""}`} />
                {msg.is_featured ? "Unfeature" : "Feature"}
              </Button>
              <Button variant="destructive" onClick={() => handleReject(msg.id)} className="flex-1">
                <X className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
            {!msg.admin_response && (
              <div className="flex gap-2">
                <Textarea
                  placeholder="Add a response..."
                  value={responseText[msg.id] || ""}
                  onChange={(e) => setResponseText({ ...responseText, [msg.id]: e.target.value })}
                  rows={2}
                  className="flex-1"
                />
                <Button onClick={() => handleAddResponse(msg.id)} disabled={!responseText[msg.id]?.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Porter Community Chat</h2>
          <p className="text-muted-foreground">Manage community messages and responses</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-amber-600 border-amber-600">
            {pendingMessages.length} Pending
          </Badge>
          <Badge variant="outline" className="text-green-600 border-green-600">
            {approvedMessages.length} Approved
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Pending ({pendingMessages.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <Check className="h-4 w-4" />
            Approved ({approvedMessages.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {pendingMessages.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Pending Messages</h3>
                <p className="text-muted-foreground">All messages have been reviewed.</p>
              </CardContent>
            </Card>
          ) : (
            pendingMessages.map((msg) => (
              <MessageCard key={msg.id} msg={msg} showActions={true} />
            ))
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 mt-6">
          {approvedMessages.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Check className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Approved Messages</h3>
                <p className="text-muted-foreground">Approved messages will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            approvedMessages.map((msg) => (
              <MessageCard key={msg.id} msg={msg} showActions={true} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
