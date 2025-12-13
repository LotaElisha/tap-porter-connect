import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Users, Award, Globe } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Dignity",
    description: "Every porter deserves respect, fair treatment, and recognition for their invaluable contribution.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in the power of collective action and mutual support among porters.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest standards in training, safety, and professional conduct.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "We are committed to practices that benefit both porters and the environment.",
  },
];

const leadership = [
  {
    name: "John Moshi",
    role: "Chairman",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    name: "Grace Mwanga",
    role: "Executive Director",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
  },
  {
    name: "Emmanuel Kimaro",
    role: "Training Coordinator",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
  },
  {
    name: "Amina Hassan",
    role: "Welfare Officer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
  },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">About TAP</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            The Tanzania Association of Porters is the leading professional body dedicated to the welfare, advocacy, and professional development of mountain porters in Tanzania.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-gradient-warm border-none">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h2 className="font-display text-2xl font-bold text-secondary mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To advocate for the rights and welfare of mountain porters, provide comprehensive training and professional development opportunities, and ensure that porters are recognized as essential partners in Tanzania's tourism industry.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-warm border-none">
              <CardContent className="p-8">
                <Eye className="h-12 w-12 text-primary mb-4" />
                <h2 className="font-display text-2xl font-bold text-secondary mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  A Tanzania where every porter is valued, protected, and empowered to achieve their full potential, contributing to a sustainable and ethical tourism industry that benefits all stakeholders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do at TAP.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-6">
                  <value.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-secondary mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">Our Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated team leading TAP's mission.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader) => (
              <Card key={leader.name} className="overflow-hidden">
                <img
                  src={leader.image}
                  alt={leader.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="p-4 text-center">
                  <h3 className="font-display text-lg font-semibold text-secondary">{leader.name}</h3>
                  <p className="text-sm text-muted-foreground">{leader.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">What We Do</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Advocacy</h3>
              <p className="text-secondary-foreground/80">
                We advocate for fair wages, proper working conditions, and legal protections for all porters.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Training</h3>
              <p className="text-secondary-foreground/80">
                We provide comprehensive training programs in safety, first aid, customer service, and leadership.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">Welfare</h3>
              <p className="text-secondary-foreground/80">
                We offer healthcare support, insurance schemes, and emergency assistance to porters and their families.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}