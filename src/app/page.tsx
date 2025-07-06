import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, User, Briefcase, Calendar, Mic, Award } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative text-center py-24 md:py-32 px-4 overflow-hidden bg-background">
        <div className="absolute -top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl -z-0" />
        <div className="absolute -bottom-1/4 right-1/4 w-1/2 h-1/2 bg-secondary/20 rounded-full blur-3xl -z-0" />

        <div className="container mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold font-headline bg-gradient-to-br from-primary via-primary/80 to-foreground/80 bg-clip-text text-transparent mb-4 tracking-tight">
            Feel the Pulse of Campus
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
            Your central hub for university events. Discover, connect, and engage with what's happening.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild>
                  <Link href="/events">Explore Events <ArrowRight className="ml-2" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                  <Link href="/organizer">Organizer Dashboard</Link>
              </Button>
          </div>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
            {/* For Students Card */}
            <Link href="/events" className="group">
              <div className="bg-card p-8 rounded-2xl border border-border/20 h-full flex flex-col items-center text-center transform group-hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/10">
                <div className="p-4 bg-primary/10 rounded-full mb-6 ring-8 ring-background">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h2 className="font-headline text-3xl font-bold mb-3">For Students</h2>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Explore a world of opportunities. Find events, join clubs, and make your university experience unforgettable.
                </p>
                <div className="flex items-center text-primary font-semibold">
                  <span>Explore Events</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
            
            {/* For Organizers Card */}
            <Link href="/organizer" className="group">
              <div className="bg-card p-8 rounded-2xl border border-border/20 h-full flex flex-col items-center text-center transform group-hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/10">
                <div className="p-4 bg-primary/10 rounded-full mb-6 ring-8 ring-background">
                  <Briefcase className="w-12 h-12 text-primary" />
                </div>
                <h2 className="font-headline text-3xl font-bold mb-3">For Organizers</h2>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Bring your ideas to life. Create, manage, and promote your events with a suite of powerful AI tools.
                </p>
                 <div className="flex items-center text-primary font-semibold">
                  <span>Go to Dashboard</span>
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Categories Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold font-headline mb-4">There's Something for Everyone</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">From tech talks to art shows, there's always something exciting happening on campus.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <Link href="/events?category=Conference" className="flex flex-col items-center gap-3 p-6 rounded-lg bg-background/50 hover:bg-background transition-colors shadow-sm border border-transparent hover:border-border/50 cursor-pointer">
                    <Calendar className="w-10 h-10 text-primary" />
                    <span className="font-semibold text-lg">Conferences</span>
                </Link>
                <Link href="/events?category=Music" className="flex flex-col items-center gap-3 p-6 rounded-lg bg-background/50 hover:bg-background transition-colors shadow-sm border border-transparent hover:border-border/50 cursor-pointer">
                    <Mic className="w-10 h-10 text-primary" />
                    <span className="font-semibold text-lg">Music & Talks</span>
                </Link>
                 <Link href="/events?category=Competition" className="flex flex-col items-center gap-3 p-6 rounded-lg bg-background/50 hover:bg-background transition-colors shadow-sm border border-transparent hover:border-border/50 cursor-pointer">
                    <Award className="w-10 h-10 text-primary" />
                    <span className="font-semibold text-lg">Competitions</span>
                </Link>
                 <Link href="/events?category=Workshop" className="flex flex-col items-center gap-3 p-6 rounded-lg bg-background/50 hover:bg-background transition-colors shadow-sm border border-transparent hover:border-border/50 cursor-pointer">
                    <Briefcase className="w-10 h-10 text-primary" />
                    <span className="font-semibold text-lg">Workshops</span>
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
