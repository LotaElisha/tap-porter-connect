import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Play, Clock, Calendar, ExternalLink, Mic, Users, Mountain } from "lucide-react";
import { Link } from "react-router-dom";

const featuredEpisode = {
  title: "The Unsung Heroes: A Porter's Journey to Uhuru Peak",
  description: "In this episode, we follow the incredible story of Emanuel, a veteran porter with over 15 years of experience, as he shares the challenges, triumphs, and life lessons learned from carrying dreams to the Roof of Africa.",
  duration: "45 min",
  date: "December 2024",
  image: "https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?q=80&w=800",
};

const episodes = [
  {
    id: 1,
    title: "Safety First: Modern Training for Mountain Porters",
    description: "Exploring TAP's comprehensive safety training programs and how they're transforming the industry.",
    duration: "32 min",
    date: "November 2024",
  },
  {
    id: 2,
    title: "From Porter to Leader: Women in Mountain Climbing",
    description: "Celebrating the growing number of women porters and their unique contributions to Tanzania's tourism.",
    duration: "38 min",
    date: "October 2024",
  },
  {
    id: 3,
    title: "Preserving Our Environment: Porters as Stewards",
    description: "How porters are leading conservation efforts on Kilimanjaro and other Tanzanian mountains.",
    duration: "28 min",
    date: "September 2024",
  },
  {
    id: 4,
    title: "Fair Wages, Fair Treatment: The Advocacy Journey",
    description: "TAP's ongoing work to ensure all porters receive fair compensation and dignified working conditions.",
    duration: "41 min",
    date: "August 2024",
  },
];

const platforms = [
  { name: "Spotify", icon: "🎵", url: "#" },
  { name: "Apple Podcasts", icon: "🎧", url: "#" },
  { name: "YouTube", icon: "📺", url: "#" },
  { name: "Google Podcasts", icon: "🎙️", url: "#" },
];

export default function Podcast() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-secondary text-secondary-foreground overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/20 rounded-full">
              <Headphones className="h-8 w-8 text-primary" />
            </div>
            <span className="text-primary font-medium">TAP Podcast</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Porters Podcast
          </h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl mb-8">
            Real stories from the mountains. Hear directly from Tanzania's porters as they share their experiences, wisdom, and the untold stories behind every summit success.
          </p>
          <div className="flex flex-wrap gap-4">
            {platforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 rounded-full transition-colors"
              >
                <span>{platform.icon}</span>
                <span className="text-sm font-medium">{platform.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Now Playing</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mt-3">
              Featured Episode
            </h2>
          </div>
          
          <Card className="overflow-hidden max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2">
              <div className="relative">
                <img
                  src={featuredEpisode.image}
                  alt={`${featuredEpisode.title} - TAP Porters Podcast featured episode`}
                  loading="lazy"
                  className="w-full h-full object-cover min-h-[300px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                <Button
                  size="lg"
                  className="absolute bottom-6 left-6 rounded-full w-14 h-14 p-0"
                >
                  <Play className="h-6 w-6 ml-1" />
                </Button>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredEpisode.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {featuredEpisode.date}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-secondary mb-4">
                  {featuredEpisode.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {featuredEpisode.description}
                </p>
                <Button className="mt-6 w-fit">
                  Listen Now
                  <Headphones className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Episode List */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">All Episodes</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mt-3">
              Recent Episodes
            </h2>
          </div>
          
          <div className="grid gap-6 max-w-4xl mx-auto">
            {episodes.map((episode) => (
              <Card key={episode.id} className="hover:shadow-lg transition-all">
                <CardContent className="p-6 flex items-center gap-6">
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 rounded-full w-12 h-12"
                  >
                    <Play className="h-5 w-5 ml-0.5" />
                  </Button>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-secondary mb-1">
                      {episode.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {episode.description}
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {episode.duration}
                    </span>
                    <span>{episode.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About the Podcast */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mic className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-secondary mb-2">
                  Authentic Voices
                </h3>
                <p className="text-sm text-muted-foreground">
                  Hear directly from porters sharing their own stories in their own words.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mountain className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-secondary mb-2">
                  Mountain Wisdom
                </h3>
                <p className="text-sm text-muted-foreground">
                  Life lessons and insights from decades of experience on Kilimanjaro.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-secondary mb-2">
                  Community Stories
                </h3>
                <p className="text-sm text-muted-foreground">
                  Celebrating the families and communities behind every porter.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Have a Story to Share?
          </h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-xl mx-auto">
            We're always looking for porters with inspiring stories. Become a guest on the Porters Podcast.
          </p>
          <Link to="/contact">
            <Button size="lg">
              Contact Us
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
