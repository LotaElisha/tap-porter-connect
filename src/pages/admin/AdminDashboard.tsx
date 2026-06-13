import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Session } from "@supabase/supabase-js";
import { 
  Users, 
  Building2, 
  Heart, 
  Newspaper, 
  MessageSquare, 
  Image, 
  Mail, 
  LogOut, 
  Home,
  BookOpen,
  MessageCircle
} from "lucide-react";
import tapLogo from "@/assets/tap-logo.jpeg";
import { AdminMembers } from "@/components/admin/AdminMembers";
import { AdminNews } from "@/components/admin/AdminNews";
import { AdminStories } from "@/components/admin/AdminStories";
import { AdminGallery } from "@/components/admin/AdminGallery";
import { AdminContacts } from "@/components/admin/AdminContacts";
import { AdminSubscribers } from "@/components/admin/AdminSubscribers";
import { AdminPorterChat } from "@/components/admin/AdminPorterChat";

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setCheckingRole(false);
      return;
    }
    let active = true;
    supabase
      .rpc("has_role", { _user_id: user.id, _role: "admin" })
      .then(({ data }) => {
        if (!active) return;
        setIsAdmin(Boolean(data));
        setCheckingRole(false);
      });
    return () => {
      active = false;
    };
  }, [user, loading]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-secondary text-secondary-foreground shadow-md">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={tapLogo} alt="TAP Logo" className="h-10 w-auto bg-white rounded p-1" />
              <div>
                <h1 className="font-display text-xl font-bold">TAP Admin</h1>
                <p className="text-xs text-secondary-foreground/70">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-secondary-foreground hover:text-primary">
                  <Home className="h-4 w-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-secondary-foreground hover:text-primary">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="bg-card shadow-sm p-1 h-auto flex-wrap">
            <TabsTrigger value="members" className="gap-2">
              <Users className="h-4 w-4" />
              Members
            </TabsTrigger>
            <TabsTrigger value="news" className="gap-2">
              <Newspaper className="h-4 w-4" />
              News
            </TabsTrigger>
            <TabsTrigger value="stories" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Stories
            </TabsTrigger>
            <TabsTrigger value="gallery" className="gap-2">
              <Image className="h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="contacts" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="porter-chat" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Porter Chat
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="gap-2">
              <Mail className="h-4 w-4" />
              Subscribers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="members">
            <AdminMembers />
          </TabsContent>

          <TabsContent value="news">
            <AdminNews />
          </TabsContent>

          <TabsContent value="stories">
            <AdminStories />
          </TabsContent>

          <TabsContent value="gallery">
            <AdminGallery />
          </TabsContent>

          <TabsContent value="contacts">
            <AdminContacts />
          </TabsContent>

          <TabsContent value="porter-chat">
            <AdminPorterChat />
          </TabsContent>

          <TabsContent value="subscribers">
            <AdminSubscribers />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}