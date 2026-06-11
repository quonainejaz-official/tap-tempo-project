import { useRoute, Link } from "wouter";
import { articles } from "./blog";
import { ChevronLeft } from "lucide-react";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-primary hover:underline">Return to blog</Link>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to blog
      </Link>

      <header className="mb-12">
        <h1 className="text-5xl font-serif font-bold tracking-tight mb-6 leading-tight">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground font-mono text-sm border-b pb-6">
          <span>By TheTapTempo Team</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-primary">
        <p className="lead text-xl text-muted-foreground mb-8">
          {article.desc}
        </p>

        <h2>The Importance of Rhythm</h2>
        <p>
          Rhythm is the foundation of all music. Whether you're producing a four-to-the-floor house banger or recording a classical ensemble, understanding how tempo dictates the emotional response of the listener is paramount.
        </p>

        <p>
          When you use a tool like TheTapTempo, you aren't just calculating a number—you're establishing the heartbeat of your track. An algorithm that rejects human error and finds the true mean of your input is critical.
        </p>

        <h3>Technical Considerations</h3>
        <p>
          Most DAWs default to 120 BPM. While this is a perfectly valid tempo, it's rarely the right one for the specific groove you're trying to achieve. Using tap tempo allows you to translate the rhythm in your head into the grid of your DAW.
        </p>
        
        <ul>
          <li><strong>Outlier Rejection:</strong> A good tap tempo system ignores that one early click.</li>
          <li><strong>Weighted Averages:</strong> As you lock into the groove, your recent taps should matter more than your first few.</li>
          <li><strong>Translation:</strong> Once you have the BPM, calculating your delay times precisely in milliseconds bridges the gap between rhythm and space.</li>
        </ul>

        <p>
          Experiment with micro-tempos. The difference between 124 BPM and 124.5 BPM might seem mathematically insignificant, but on a dancefloor, it changes the way bodies move.
        </p>
      </div>
    </article>
  );
}
