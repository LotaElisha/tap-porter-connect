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

const companyTypes = [
  "Tour Operator",
  "Lodge/Hotel",
  "Outfitter",
  "Travel Agency",
  "Equipment Supplier",
  "Other",
];

export default function CorporateRegistration() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    company_name: "",
    company_type: "",
    registration_number: "",
    contact_person: "",
    contact_email: "",
    contact_phone: "",
    address: "",
    website: "",
    number_of_porters: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company_name || !formData.company_type || !formData.contact_person || !formData.contact_email || !formData.contact_phone) {
      toast({
        title: "Required fields missing",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("members_corporate").insert({
        company_name: formData.company_name.trim(),
        company_type: formData.company_type,
        registration_number: formData.registration_number.trim() || null,
        contact_person: formData.contact_person.trim(),
        contact_email: formData.contact_email.trim(),
        contact_phone: formData.contact_phone.trim(),
        address: formData.address.trim() || null,
        website: formData.website.trim() || null,
        number_of_porters: formData.number_of_porters ? parseInt(formData.number_of_porters) : 0,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We will review your application and contact you soon.",
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
                  Application Submitted Successfully!
                </h2>
                <p className="text-muted-foreground mb-6">
                  Thank you for applying for corporate membership with TAP. Our team will review your application and contact you within 5-7 business days.
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
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Corporate Membership</h1>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl">
            Partner with TAP to demonstrate your commitment to ethical porter practices and sustainable tourism.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Corporate Registration Form</CardTitle>
              <CardDescription>
                Please provide your company details. Fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div>
                  <h3 className="font-semibold text-secondary mb-4">Company Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company_name">Company Name *</Label>
                      <Input
                        id="company_name"
                        value={formData.company_name}
                        onChange={(e) => handleChange("company_name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company_type">Company Type *</Label>
                      <Select
                        value={formData.company_type}
                        onValueChange={(value) => handleChange("company_type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {companyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registration_number">Business Registration Number</Label>
                      <Input
                        id="registration_number"
                        value={formData.registration_number}
                        onChange={(e) => handleChange("registration_number", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="number_of_porters">Number of Porters Employed</Label>
                      <Input
                        id="number_of_porters"
                        type="number"
                        min="0"
                        value={formData.number_of_porters}
                        onChange={(e) => handleChange("number_of_porters", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="font-semibold text-secondary mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact_person">Contact Person *</Label>
                      <Input
                        id="contact_person"
                        value={formData.contact_person}
                        onChange={(e) => handleChange("contact_person", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_email">Email Address *</Label>
                      <Input
                        id="contact_email"
                        type="email"
                        value={formData.contact_email}
                        onChange={(e) => handleChange("contact_email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_phone">Phone Number *</Label>
                      <Input
                        id="contact_phone"
                        type="tel"
                        value={formData.contact_phone}
                        onChange={(e) => handleChange("contact_phone", e.target.value)}
                        placeholder="+255 XXX XXX XXX"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => handleChange("website", e.target.value)}
                        placeholder="https://"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      rows={3}
                    />
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