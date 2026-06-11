import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const articles = [
  { slug: "how-to-find-bpm-song", title: "How to Find the BPM of a Song", date: "Nov 15, 2024", readTime: "8 min read", desc: "A comprehensive guide to discovering the tempo of any track using software, hardware, and tap methods." },
  { slug: "what-is-tap-tempo", title: "What Is Tap Tempo?", date: "Nov 10, 2024", readTime: "6 min read", desc: "Understanding the algorithms behind modern tap tempo systems and how they reject human error." },
  { slug: "best-bpm-house-music", title: "Best BPM for House Music", date: "Nov 5, 2024", readTime: "6 min read", desc: "Why 124 BPM became the gold standard for house, and how to use micro-adjustments for better mixing." },
  { slug: "understanding-time-signatures", title: "Understanding Time Signatures", date: "Nov 1, 2024", readTime: "8 min read", desc: "From simple 4/4 to complex 7/8, demystifying how meter affects the groove of your tracks." },
  { slug: "bpm-vs-tempo-explained", title: "BPM vs Tempo Explained", date: "Oct 28, 2024", readTime: "5 min read", desc: "Is there a difference? Breaking down the terminology of musical speed." },
  { slug: "delay-time-calculator-guide", title: "Delay Time Calculator Guide", date: "Oct 22, 2024", readTime: "6 min read", desc: "How to use millisecond calculations to perfectly sync your reverbs and delays to the track grid." },
  { slug: "metronome-training-exercises", title: "Metronome Training Exercises", date: "Oct 15, 2024", readTime: "8 min read", desc: "Five daily routines to improve your internal clock and rhythmic precision." },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-serif font-bold tracking-tight mb-4">TheTempo Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Thoughts, guides, and technical breakdowns on rhythm, tempo, and music production.
        </p>
      </div>

      <div className="grid gap-6">
        {articles.map((article, i) => (
          <Link key={article.slug} href={`/blog/${article.slug}`}>
            <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader>
                <div className="flex gap-4 text-sm text-muted-foreground mb-2 font-mono">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
                <CardTitle className="text-2xl font-serif group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="text-base mt-2 text-foreground/70">
                  {article.desc}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
