import { CaptionGenerator } from "@/components/caption-generator";
import { PosterAssistant } from "@/components/poster-assistant";

export default function AiToolsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">AI Assistant Tools</h1>
        <p className="text-muted-foreground">Leverage AI to create more engaging event content.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <CaptionGenerator />
        <PosterAssistant />
      </div>
    </div>
  );
}
