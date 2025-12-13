import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Building2, Heart, Check, ArrowRight } from "lucide-react";

const membershipTypes = [
  {
    icon: User,
    title: "Individual Porter Membership",
    description: "For active mountain porters seeking professional recognition and support.",
    benefits: [
      "Official TAP membership card and ID",
      "Access to all training programs",
      "Health screening and wellness support",
      "Emergency assistance fund",
      "Insurance scheme enrollment",
      "Job placement assistance",
      "Professional certification",
      "Networking opportunities",
    ],
    fee: "TZS 50,000 / year",
    link: "/membership/porter",
    cta: "Register as Porter",
  },
  {
    icon: Building2,
    title: "Corporate Membership",
    description: "For tour operators, lodges, and outfitters committed to ethical porter practices.",
    benefits: [
      "TAP Ethical Partner certification",
      "Access to certified porter database",
      "Staff training programs",
      "Marketing partnership opportunities",
      "Priority booking for training sessions",
      "Industry networking events",
      "Annual compliance review",
      "Brand visibility on TAP platforms",
    ],
    fee: "TZS 500,000 / year",
    link: "/membership/corporate",
    cta: "Apply for Corporate Membership",
  },
  {
    icon: Heart,
    title: "Honorary & Support Membership",
    description: "For NGOs, academics, and individuals who want to support porter welfare.",
    benefits: [
      "Recognition as TAP Supporter",
      "Regular impact reports",
      "Invitations to TAP events",
      "Volunteer opportunities",
      "Research collaboration",
      "Tax-deductible contributions",
      "Newsletter and updates",
      "Speaking engagement opportunities",
    ],
    fee: "Flexible contribution",
    link: "/membership/honorary",
    cta: "Become a Supporter",
  },
];

export default function Membership() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Membership</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Join the Tanzania Association of Porters and be part of a community dedicated to empowering and protecting mountain porters.
          </p>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
              Choose Your Membership
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer different membership categories to serve the diverse needs of our community.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {membershipTypes.map((type) => (
              <Card key={type.title} className="flex flex-col">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <type.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-display text-xl">{type.title}</CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="mb-6">
                    <p className="text-center text-2xl font-bold text-primary mb-4">{type.fee}</p>
                    <ul className="space-y-2">
                      {type.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto">
                    <Link to={type.link} className="block">
                      <Button className="w-full">
                        {type.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-6">
                Why Join TAP?
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">Professional Recognition</h3>
                    <p className="text-muted-foreground text-sm">
                      Gain official certification that validates your skills and experience.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">Continuous Learning</h3>
                    <p className="text-muted-foreground text-sm">
                      Access training programs that keep your skills current and competitive.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">Community Support</h3>
                    <p className="text-muted-foreground text-sm">
                      Be part of a network that looks out for each other in times of need.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">Your Voice Matters</h3>
                    <p className="text-muted-foreground text-sm">
                      Contribute to shaping policies that affect porter welfare and rights.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070"
                alt="Porter community"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-secondary mb-2">How do I become a member?</h3>
                <p className="text-muted-foreground">
                  Simply fill out the appropriate registration form based on your membership type. Our team will review your application and contact you within 5-7 business days.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-secondary mb-2">What documents do I need?</h3>
                <p className="text-muted-foreground">
                  Individual porters need a valid national ID and proof of experience (such as references from tour operators). Corporate members need business registration documents.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-secondary mb-2">Can I pay in installments?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer flexible payment options for individual porter memberships. Contact us to discuss a payment plan that works for you.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-secondary mb-2">How long does membership last?</h3>
                <p className="text-muted-foreground">
                  Memberships are valid for one year from the date of approval. You'll receive renewal reminders before your membership expires.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}