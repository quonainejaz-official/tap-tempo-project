"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Loader2, Sparkles, RotateCcw, Eye, PencilLine, ImageOff, Image } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AiContentResult {
  title: string
  slug: string
  excerpt: string
  metaTitle: string
  metaDescription: string
  content: string
}

interface AiContentGeneratorProps {
  type: "blog" | "page"
  onContentGenerated: (result: AiContentResult) => void
  onBack: () => void
}

export function AiContentGenerator({ type, onContentGenerated, onBack }: AiContentGeneratorProps) {
  const [prompt, setPrompt] = useState("")
  const [includeImages, setIncludeImages] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState<AiContentResult | null>(null)
  const [previewTab, setPreviewTab] = useState<"preview" | "raw">("preview")

  const handleGenerate = async () => {
    if (!prompt.trim()) return
    setGenerating(true)
    setResult(null)
    try {
      const res = await fetch("/api/generate-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type, includeImages }),
      })
      const data = await res.json()
      setResult({
        title: data.title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        metaTitle: data.metaTitle || "",
        metaDescription: data.metaDescription || "",
        content: data.content || "<p>Failed to generate content. Please try again.</p>",
      })
    } catch {
      setResult({
        title: "",
        slug: "",
        excerpt: "",
        metaTitle: "",
        metaDescription: "",
        content: "<p>An error occurred. Please try again.</p>",
      })
    } finally {
      setGenerating(false)
    }
  }

  const handleEditInEditor = () => {
    if (result) onContentGenerated(result)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Content Generator
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Describe what {type === "blog" ? "blog post" : "page"} you want and AI will generate it.
          </p>
        </div>
        <Button variant="outline" onClick={onBack} size="sm">
          Back to Manual
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="prompt">Describe your {type === "blog" ? "blog post" : "page"}</Label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                type === "blog"
                  ? 'e.g. "A beginner-friendly guide to understanding time signatures in music production. Cover 4/4, 3/4, 6/8 and how they affect rhythm."'
                  : 'e.g. "Create a page about music production tips covering home studio setup, essential gear for beginners, and recording techniques."'
              }
              rows={5}
              className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant={includeImages ? "default" : "outline"}
              size="sm"
              onClick={() => setIncludeImages(!includeImages)}
              className="gap-2"
            >
              {includeImages ? <Image className="h-4 w-4" /> : <ImageOff className="h-4 w-4" />}
              {includeImages ? "With Images" : "Without Images"}
            </Button>
          </div>

          <Button onClick={handleGenerate} disabled={!prompt.trim() || generating} className="gap-2">
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate {type === "blog" ? "Blog Post" : "Page"}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Preview
            </CardTitle>
            <div className="flex items-center gap-2">
              <Tabs value={previewTab} onValueChange={(v) => setPreviewTab(v as "preview" | "raw")}>
                <TabsList className="h-8">
                  <TabsTrigger value="preview" className="text-xs">Preview</TabsTrigger>
                  <TabsTrigger value="raw" className="text-xs">HTML</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Show generated metadata */}
            {result.title && (
              <div className="text-sm text-muted-foreground space-y-1 pb-3 border-b">
                <div><span className="font-medium text-foreground">Title:</span> {result.title}</div>
                <div><span className="font-medium text-foreground">Slug:</span> {result.slug}</div>
                {result.excerpt && <div><span className="font-medium text-foreground">Excerpt:</span> {result.excerpt}</div>}
                {result.metaTitle && <div><span className="font-medium text-foreground">Meta Title:</span> {result.metaTitle}</div>}
                {result.metaDescription && <div><span className="font-medium text-foreground">Meta Description:</span> {result.metaDescription}</div>}
              </div>
            )}

            {previewTab === "preview" ? (
              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-a:text-primary border rounded-xl p-4 max-h-[400px] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: result.content }}
              />
            ) : (
              <pre className="bg-muted rounded-xl p-4 text-xs font-mono overflow-x-auto max-h-[400px] overflow-y-auto whitespace-pre-wrap">
                {result.content}
              </pre>
            )}

            <div className="flex gap-3 pt-2">
              <Button onClick={handleEditInEditor} className="gap-2">
                <PencilLine className="h-4 w-4" />
                Edit in Editor
              </Button>
              <Button variant="outline" onClick={handleGenerate} className="gap-2">
                <RotateCcw className="h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
