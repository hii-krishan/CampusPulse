import { events } from '@/lib/mock-data';
import { EventCard } from '@/components/event-card';
import { EventSuggestions } from '@/components/event-suggestions';
import { subMonths, isAfter, parseISO } from 'date-fns';

export default function EventsPage({ searchParams }: { searchParams?: { category?: string } }) {
  const category = searchParams?.category;

  const twoMonthsAgo = subMonths(new Date(), 2);

  const filteredEvents = events
    .filter(event => {
      const [year, month, day] = event.date.split('-').map(Number);
      const eventDate = new Date(year, month - 1, day);
      return isAfter(eventDate, twoMonthsAgo);
    })
    .filter(event => {
      if (!category) return true;
      return event.category === category;
    });

  const pageTitle = category ? `${category} Events` : "Discover Your Next Experience";
  const pageDescription = category 
    ? `Browse all ${category.toLowerCase()} events on campus.`
    : "Browse through a diverse range of events, from academic conferences to vibrant social gatherings.";

  return (
    <>
      <section className="bg-secondary/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
            {pageTitle}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {pageDescription}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold font-headline mb-2">No Events Found</h2>
            <p className="text-muted-foreground">Try a different category or check back later!</p>
          </div>
        )}

        <section className="mt-20">
          <EventSuggestions />
        </section>
      </div>
    </>
  );
}
