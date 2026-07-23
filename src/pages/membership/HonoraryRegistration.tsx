import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle } from "lucide-react";
import { officialEmail } from "@/config/organization";

const memberTypes = [
  "NGO Representative",
  "Academician/Researcher",
  "Individual Sponsor",
  "Foundation Representative",
  "Government Official",
  "International Organization",
  "Other",
];

export default function HonoraryRegistration() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    full_name: "",
    title: "",
    member_type: "",
    organization_name: "",
    email: "",
    phone: "",
    affiliation: "",
    area_of_expertise: "",
    reason_for_joining: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.full_name || !formData.member_type || !formData.email) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("members_honorary").insert({
        full_name: formData.full_name.trim(),
        title: formData.title.trim() || null,
        member_type: formData.member_type,
        organization_name: formData.organization_name.trim() || null,
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        affiliation: formData.affiliation.trim() || null,
        area_of_expertise: formData.area_of_expertise.trim() || null,
        reason_for_joining: formData.reason_for_joining.trim() || null,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in supporting TAP.",
      });
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container max-w-2xl">
            <Card className="text-center">
              <CardContent className="py-12">
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="font-display text-2xl font-bold text-secondary mb-4">
                  Thank You for Your Support!
                </h2>
                <p className="text-muted-foreground mb-6">
                  We appreciate your interest in supporting the Tanzania Association of Porters. Our team will review your application and reach out to discuss how we can work together.
                </p>
                <p className="text-sm text-muted-foreground">
                  For any questions, contact us at {officialEmail}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-12 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Honorary & Support Membership</h1>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl">
            Join us as a supporter and help make a lasting difference in the lives of Tanzania's mountain porters.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Supporter Registration Form</CardTitle>
              <CardDescription>
                Tell us about yourself and how you'd like to support TAP. Fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="font-semibold text-secondary mb-4">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name">Full Name *</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => handleChange("full_name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="title">Title/Position</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange("title", e.target.value)}
                        placeholder="e.g., Dr., Prof., Director"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="member_type">Member Type *</Label>
                      <Select
                        value={formData.member_type}
                        onValueChange={(value) => handleChange("member_type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {memberTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization_name">Organization Name</Label>
                      <Input
                        id="organization_name"
                        value={formData.organization_name}
                        onChange={(e) => handleChange("organization_name", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="font-semibold text-secondary mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Professional Background */}
                <div>
                  <h3 className="font-semibold text-secondary mb-4">Professional Background</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="affiliation">Current Affiliation</Label>
                      <Input
                        id="affiliation"
                        value={formData.affiliation}
                        onChange={(e) => handleChange("affiliation", e.target.value)}
                        placeholder="University, Organization, Company, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="area_of_expertise">Area of Expertise</Label>
                      <Input
                        id="area_of_expertise"
                        value={formData.area_of_expertise}
                        onChange={(e) => handleChange("area_of_expertise", e.target.value)}
                        placeholder="e.g., Tourism, Public Health, Labor Rights"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason_for_joining">Why do you want to support TAP?</Label>
                      <Textarea
                        id="reason_for_joining"
                        value={formData.reason_for_joining}
                        onChange={(e) => handleChange("reason_for_joining", e.target.value)}
                        rows={4}
                        placeholder="Tell us about your interest in porter welfare and how you'd like to contribute..."
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}