import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Lightbulb, Heart, Users, Award, Globe, GraduationCap, Handshake, Shield, Banknote } from "lucide-react";

const objectives = [
  {
    icon: Users,
    title: "Unity & Solidarity",
    description: "Unite porters for solidarity and cooperation to strengthen their collective voice.",
  },
  {
    icon: GraduationCap,
    title: "Training & Development",
    description: "Provide regular training on profession, health, safety, and leadership skills.",
  },
  {
    icon: Shield,
    title: "Rights Advocacy",
    description: "Advocate for the social and economic interests of all members.",
  },
  {
    icon: Award,
    title: "Economic Projects",
    description: "Establish and manage social and economic projects for member benefit.",
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "Collaborate with tourism and porter-related institutions for mutual growth.",
  },
  {
    icon: Globe,
    title: "Environmental Conservation",
    description: "Promote environmental conservation and sustainable tourism practices.",
  },
  {
    icon: Heart,
    title: "Equipment & Safety",
    description: "Ensure every mountain climber and porter has adequate equipment for safety.",
  },
  {
    icon: Banknote,
    title: "Fair Payment",
    description: "Ensure porters are paid fairly through their bank accounts.",
  },
];

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

import loishiyePhoto from "@/assets/loishiye-lenoy-mollel.png";

const leadership = [
  {
    name: "Mohamed Ally Mkoma",
    role: "Mwenyekiti (Chairman)",
    image: null,
  },
  {
    name: "Loishiye Lenoy Mollel",
    role: "Makamu Mwenyekiti (Vice Chairman)",
    image: loishiyePhoto,
  },
  {
    name: "Katibu Mkuu",
    role: "General Secretary",
    image: null,
  },
  {
    name: "Mtunza Hazina",
    role: "Treasurer",
    image: null,
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
            The Tanzania Association of Porters (Chama cha Wapagazi Tanzania) is the leading professional body dedicated to the welfare, advocacy, and professional development of mountain porters in Tanzania.
          </p>
        </div>
      </section>

      {/* Purpose, Mission & Vision */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-warm border-none">
              <CardContent className="p-8">
                <Lightbulb className="h-12 w-12 text-primary mb-4" />
                <h2 className="font-display text-2xl font-bold text-secondary mb-2">Nia (Purpose)</h2>
                <p className="text-muted-foreground">
                  To bring all Tanzanian porters under one umbrella for cooperation, training, development, and collective advocacy of their rights.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-warm border-none">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mb-4" />
                <h2 className="font-display text-2xl font-bold text-secondary mb-2">Lengo (Mission)</h2>
                <p className="text-muted-foreground">
                  To create a conducive working environment for porters and help them achieve sustainable welfare through training, rights advocacy, and social and economic opportunities.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-warm border-none">
              <CardContent className="p-8">
                <Eye className="h-12 w-12 text-primary mb-4" />
                <h2 className="font-display text-2xl font-bold text-secondary mb-2">Maono (Vision)</h2>
                <p className="text-muted-foreground">
                  To be the leading national body representing and elevating the lives of Tanzanian porters to the highest professional, social, and economic standards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">Malengo (Objectives)</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our eight core objectives guide our work in supporting and empowering porters across Tanzania.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((objective) => (
              <Card key={objective.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <objective.icon className="h-10 w-10 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-lg font-semibold text-secondary mb-2">{objective.title}</h3>
                  <p className="text-sm text-muted-foreground">{objective.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
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
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">Uongozi (Leadership)</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated team leading TAP's mission.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader) => (
              <Card key={leader.name} className="overflow-hidden">
                {leader.image ? (
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-muted flex items-center justify-center">
                    <Users className="h-20 w-20 text-muted-foreground/40" />
                  </div>
                )}
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
