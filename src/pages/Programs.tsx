import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, GraduationCap, Heart, Languages, Users, Award, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: Shield,
    title: "Mountain Safety Training",
    description: "Comprehensive training on altitude sickness prevention, emergency response, and mountain rescue techniques.",
    features: [
      "Altitude sickness recognition and prevention",
      "Emergency first aid certification",
      "Weather pattern interpretation",
      "Route safety assessment",
      "Equipment inspection and maintenance",
    ],
    duration: "5 days",
    certification: "TAP Safety Certificate",
  },
  {
    icon: Heart,
    title: "Health & Wellness Program",
    description: "Regular health screenings, fitness training, and nutrition guidance tailored for high-altitude work.",
    features: [
      "Annual health screenings",
      "Fitness assessment and training",
      "Nutrition counseling",
      "Mental health support",
      "Injury prevention workshops",
    ],
    duration: "Ongoing",
    certification: "Health Clearance Card",
  },
  {
    icon: GraduationCap,
    title: "Professional Development",
    description: "Skills enhancement programs covering leadership, customer service, and career advancement.",
    features: [
      "Leadership and team management",
      "Customer service excellence",
      "Conflict resolution",
      "Financial literacy",
      "Career planning",
    ],
    duration: "3 days",
    certification: "Professional Porter Certificate",
  },
  {
    icon: Languages,
    title: "Language Skills",
    description: "English language training to improve communication with international climbers and tourists.",
    features: [
      "Basic to intermediate English",
      "Tourism-specific vocabulary",
      "Cultural communication",
      "Conversation practice",
      "Written communication basics",
    ],
    duration: "8 weeks",
    certification: "Language Proficiency Certificate",
  },
  {
    icon: Users,
    title: "Guide Training Program",
    description: "Advanced training for porters looking to become certified mountain guides.",
    features: [
      "Advanced navigation skills",
      "Group leadership techniques",
      "Natural history and ecology",
      "Cultural interpretation",
      "Business and marketing basics",
    ],
    duration: "4 weeks",
    certification: "TAP Guide License",
  },
  {
    icon: Award,
    title: "Certification Program",
    description: "Official TAP certification that verifies a porter's training, experience, and professional standing.",
    features: [
      "Skills verification",
      "Experience documentation",
      "Background check",
      "Reference verification",
      "Ongoing compliance monitoring",
    ],
    duration: "Varies",
    certification: "TAP Professional Porter ID",
  },
];

export default function Programs() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Our Programs</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            Comprehensive training and development programs designed to empower porters with the skills, knowledge, and certifications they need to excel in their profession.
          </p>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Card key={program.title} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-muted">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <program.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="font-display text-xl">{program.title}</CardTitle>
                      <CardDescription className="mt-1">{program.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h4 className="font-semibold text-secondary mb-2">What You'll Learn:</h4>
                    <ul className="space-y-1">
                      {program.features.map((feature) => (
                        <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>{" "}
                      <span className="font-medium text-secondary">{program.duration}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Certification:</span>{" "}
                      <span className="font-medium text-secondary">{program.certification}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment CTA */}
      <section className="py-20 bg-gradient-warm">
        <div className="container text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-6">
            Ready to Advance Your Career?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of porters who have enhanced their skills and advanced their careers through TAP programs. Become a registered member to access our full range of training opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/membership/porter">
              <Button size="lg">
                Register as a Porter
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Us for Details
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Training Schedule */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
              Upcoming Training Sessions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              View our upcoming training schedule and register for sessions that fit your availability.
            </p>
          </div>
          <div className="bg-muted rounded-lg p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Training schedules are updated regularly. Contact us or check back soon for the latest session dates.
            </p>
            <Link to="/contact">
              <Button>Inquire About Training</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}