import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageCircle, Send, Star, User, Clock, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const messageSchema = z.object({
  author_name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  author_email: z.string().trim().email("Invalid email").optional().or(z.literal("")),
  author_phone: z.string().trim().max(20, "Phone number is too long").optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message is too long"),
});

interface ApprovedMessage {
  id: string;
  author_name: string;
  message: string;
  admin_response: string | null;
  is_featured: boolean;
  created_at: string;
}

export default function PorterChat() {
  const [messages, setMessages] = useState<ApprovedMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    author_name: "",
    author_email: "",
    author_phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchApprovedMessages();
  }, []);

  const fetchApprovedMessages = async () => {
    try {
      const { data, error } = await supabase.rpc("get_public_porter_messages");

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = messageSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("porter_messages").insert({
        author_name: result.data.author_name,
        author_email: result.data.author_email || null,
        author_phone: result.data.author_phone || null,
        message: result.data.message,
      });

      if (error) throw error;

      toast({
        title: "Message Submitted",
        description: "Your message has been submitted for review. It will appear once approved by our team.",
      });

      setFormData({ author_name: "", author_email: "", author_phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary text-secondary-foreground overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/20 rounded-full">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <span className="text-primary font-medium">Community Forum</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Porter Community Chat
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Connect with fellow porters, share experiences, ask questions, and support each other. Your voice matters in our community.
          </p>
        </div>
      </section>

      <div className="container py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Message List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-secondary">Community Messages</h2>
              <span className="text-sm text-muted-foreground">{messages.length} messages</span>
            </div>

            {loading ? (
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
            ) : messages.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-secondary mb-2">
                    No Messages Yet
                  </h3>
                  <p className="text-muted-foreground">
                    Be the first to share your thoughts with the community!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <Card key={msg.id} className={msg.is_featured ? "border-primary/50 bg-primary/5" : ""}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-secondary">{msg.author_name}</span>
                              {msg.is_featured && (
                                <Star className="h-4 w-4 text-primary fill-primary" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatDate(msg.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-foreground leading-relaxed">{msg.message}</p>
                      
                      {msg.admin_response && (
                        <div className="mt-4 p-4 bg-muted rounded-lg border-l-4 border-primary">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium text-primary">TAP Response</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{msg.admin_response}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Submit Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-display">Share Your Message</CardTitle>
                <CardDescription>
                  Your message will be reviewed before appearing publicly. Please be respectful and constructive.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="author_name">Your Name *</Label>
                    <Input
                      id="author_name"
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                      placeholder="Enter your name"
                      className={errors.author_name ? "border-destructive" : ""}
                    />
                    {errors.author_name && (
                      <p className="text-xs text-destructive">{errors.author_name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author_email">Email (optional)</Label>
                    <Input
                      id="author_email"
                      type="email"
                      value={formData.author_email}
                      onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                      placeholder="your@email.com"
                      className={errors.author_email ? "border-destructive" : ""}
                    />
                    {errors.author_email && (
                      <p className="text-xs text-destructive">{errors.author_email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author_phone">Phone (optional)</Label>
                    <Input
                      id="author_phone"
                      value={formData.author_phone}
                      onChange={(e) => setFormData({ ...formData, author_phone: e.target.value })}
                      placeholder="+255 xxx xxx xxx"
                      className={errors.author_phone ? "border-destructive" : ""}
                    />
                    {errors.author_phone && (
                      <p className="text-xs text-destructive">{errors.author_phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your experience, question, or thoughts..."
                      rows={5}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p className="text-xs text-destructive">{errors.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {formData.message.length}/1000 characters
                    </p>
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Submit Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    All messages are reviewed by our team before being published.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
