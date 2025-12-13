import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

const timeline = [
  {
    year: "2008",
    title: "Foundation",
    description: "TAP was founded by a group of veteran porters and tourism advocates who recognized the need for a unified voice for mountain porters.",
  },
  {
    year: "2010",
    title: "First Training Program",
    description: "Launched our first comprehensive safety and skills training program, certifying over 200 porters in the first year.",
  },
  {
    year: "2012",
    title: "Government Recognition",
    description: "TAP was officially recognized by the Tanzanian government as the representative body for mountain porters.",
  },
  {
    year: "2014",
    title: "Healthcare Initiative",
    description: "Introduced the Porter Health Program, providing free health screenings and medical support to members.",
  },
  {
    year: "2016",
    title: "International Partnerships",
    description: "Established partnerships with international NGOs and tourism organizations to promote ethical trekking practices.",
  },
  {
    year: "2018",
    title: "Digital Registration",
    description: "Launched our digital membership system, making it easier for porters to register and access benefits.",
  },
  {
    year: "2020",
    title: "COVID-19 Response",
    description: "Provided emergency relief to over 3,000 porters affected by the tourism industry shutdown.",
  },
  {
    year: "2022",
    title: "Expansion",
    description: "Extended our programs to cover porters across all of Tanzania's major mountains and trekking routes.",
  },
  {
    year: "2024",
    title: "New Headquarters",
    description: "Opened our new headquarters in Moshi, featuring a training center and member services facility.",
  },
];

export default function History() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">History & Legacy</h1>
          <p className="text-xl text-secondary-foreground/80 max-w-3xl">
            From humble beginnings to becoming the voice of Tanzania's porters, our journey reflects the resilience and determination of the community we serve.
          </p>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-6">
                The Porter Legacy
              </h2>
              <p className="text-muted-foreground mb-4">
                For over a century, porters have been the backbone of mountain expeditions in Tanzania. Long before modern tourism, local communities guided explorers and carried supplies up the slopes of Kilimanjaro, Meru, and other peaks.
              </p>
              <p className="text-muted-foreground mb-4">
                These men and women developed an intimate knowledge of the mountains, passing down skills and traditions through generations. Their expertise in navigation, weather patterns, and survival techniques became invaluable to climbers from around the world.
              </p>
              <p className="text-muted-foreground">
                Today, we honor this legacy by ensuring that porters receive the recognition, training, and support they deserve. The spirit of service and resilience that defined the first porters continues to inspire our work at TAP.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1650668302197-7f556c34cb91?q=80&w=2070"
                alt="Historic porter expedition"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-12 text-center">
            Our Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={item.year}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-display text-xl font-bold text-secondary mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-lg shadow-lg z-10 relative">
                      {item.year}
                    </div>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Impact */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">
              Cultural Significance
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Porters are not just workers; they are cultural ambassadors who share the rich heritage of Tanzania with visitors from around the world.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-secondary mb-2">Traditional Knowledge</h3>
                <p className="text-muted-foreground">
                  Porters carry generations of wisdom about the mountains, including traditional remedies and navigation techniques.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-secondary mb-2">Community Bonds</h3>
                <p className="text-muted-foreground">
                  The porter community is tightly knit, with strong traditions of mutual support and shared responsibility.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-display text-xl font-semibold text-secondary mb-2">Songs & Stories</h3>
                <p className="text-muted-foreground">
                  Porters maintain a rich oral tradition of songs and stories that celebrate the mountains and their work.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}