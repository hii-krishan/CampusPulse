import { events } from '@/lib/mock-data';
import { EventCard } from '@/components/event-card';
import { EventSuggestions } from '@/components/event-suggestions';

export default function EventsPage() {
  return (
    <>
      <section className="bg-secondary/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-2">
            Discover Your Next Experience
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through a diverse range of events, from academic conferences to vibrant social gatherings.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <section className="mt-20">
          <EventSuggestions />
        </section>
      </div>
    </>
  );
}
