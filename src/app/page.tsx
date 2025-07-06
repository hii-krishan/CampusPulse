import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, User, Briefcase } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
      <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary mb-4">
        Welcome to CampusPulse
      </h1>
      <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
        Your central hub for university events. Whether you're looking to discover exciting events or organize your own, we've got you covered.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Link href="/events">
          <Card className="h-full transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl cursor-pointer">
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl">For Students</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg">
                Discover events, join clubs, and connect with the campus community.
              </CardDescription>
              <div className="flex justify-center items-center mt-6 text-primary font-semibold">
                <span>Explore Events</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/organizer">
          <Card className="h-full transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-2xl cursor-pointer">
            <CardHeader className="items-center">
              <div className="p-4 bg-primary/10 rounded-full mb-4">
                <Briefcase className="w-12 h-12 text-primary" />
              </div>
              <CardTitle className="font-headline text-2xl">For Organizers</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-lg">
                Create, manage, and promote your events with powerful tools.
              </CardDescription>
              <div className="flex justify-center items-center mt-6 text-primary font-semibold">
                <span>Go to Dashboard</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
