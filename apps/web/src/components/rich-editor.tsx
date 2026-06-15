"use client"

import { useCallback, useState, useRef } from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ImageExtension from "@tiptap/extension-image"
import LinkExtension from "@tiptap/extension-link"
import HighlightExtension from "@tiptap/extension-highlight"
import PlaceholderExtension from "@tiptap/extension-placeholder"
import TextAlignExtension from "@tiptap/extension-text-align"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Link as LinkIcon,
  Image,
  Highlighter,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  CodeSquare,
  RemoveFormatting,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RichEditorProps {
  content: string
  onChange: (html: string) => void
}

export function RichEditor({ content, onChange }: RichEditorProps) {
  const [uploading, setUploading] = useState(false)
  const [linkOpen, setLinkOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")
  const linkInputRef = useRef<HTMLInputElement>(null)
  const activeEditorRef = useRef<Editor | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      ImageExtension.configure({ inline: false, allowBase64: true }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-primary underline" },
      }),
      HighlightExtension.configure({ multicolor: true }),
      PlaceholderExtension.configure({
        placeholder: "Start writing your content here...",
      }),
      TextAlignExtension.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const handleImageUpload = useCallback(async () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      setUploading(true)
      const formData = new FormData()
      formData.append("file", file)
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData })
        const data = await res.json()
        if (data.url) {
          editor?.chain().focus().setImage({ src: data.url }).run()
        }
      } catch (e) {
        console.error("Upload failed", e)
      } finally {
        setUploading(false)
      }
    }
    input.click()
  }, [editor])

  const openLinkDialog = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes("link").href || ""
    setLinkUrl(prev)
    activeEditorRef.current = editor
    setLinkOpen(true)
    setTimeout(() => linkInputRef.current?.focus(), 100)
  }, [editor])

  const applyLink = useCallback(() => {
    const ed = activeEditorRef.current || editor
    if (!ed) return
    if (linkUrl.trim()) {
      ed.chain().focus().extendMarkRange("link").setLink({ href: linkUrl.trim() }).run()
    } else {
      ed.chain().focus().extendMarkRange("link").unsetLink().run()
    }
    setLinkOpen(false)
    setLinkUrl("")
  }, [editor, linkUrl])

  if (!editor) return null

  return (
    <>
      <div className="border rounded-xl overflow-hidden bg-background">
        {/* Row 1: Text formatting */}
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b bg-muted/30">
          <span className="text-[10px] uppercase text-muted-foreground font-semibold mr-1 hidden sm:inline">Text</span>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold (Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            active={editor.isActive("highlight")}
            title="Highlight"
          >
            <Highlighter className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            active={editor.isActive("code")}
            title="Inline Code"
          >
            <Code className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-5 bg-border mx-1" />

          <span className="text-[10px] uppercase text-muted-foreground font-semibold mr-1 hidden sm:inline">Heading</span>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            active={editor.isActive("heading", { level: 1 })}
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-5 bg-border mx-1" />

          <span className="text-[10px] uppercase text-muted-foreground font-semibold mr-1 hidden sm:inline">Block</span>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <CodeSquare className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Minus className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-5 bg-border mx-1" />

          <ToolbarButton
            onClick={openLinkDialog}
            active={editor.isActive("link")}
            title="Insert Link"
          >
            <LinkIcon className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={handleImageUpload} disabled={uploading} title="Insert Image">
            <Image className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            title="Clear Formatting"
          >
            <RemoveFormatting className="w-4 h-4" />
          </ToolbarButton>

          <div className="w-px h-5 bg-border mx-1" />

          <span className="text-[10px] uppercase text-muted-foreground font-semibold mr-1 hidden sm:inline">Align</span>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight className="w-4 h-4" />
          </ToolbarButton>

          <div className="ml-auto flex gap-0.5">
            <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo (Ctrl+Z)">
              <Undo className="w-4 h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo (Ctrl+Shift+Z)">
              <Redo className="w-4 h-4" />
            </ToolbarButton>
          </div>
        </div>

        <EditorContent
          editor={editor}
          className="prose prose-sm dark:prose-invert max-w-none p-4 min-h-[400px] focus:outline-none [&_.ProseMirror]:min-h-[380px]"
        />

        {/* Word count */}
        <div className="flex justify-end px-3 py-1.5 border-t bg-muted/20 text-xs text-muted-foreground">
          {editor.storage.characterCount?.words?.() ?? editor.getText().split(/\s+/).filter(Boolean).length} words
        </div>
      </div>

      <Dialog open={linkOpen} onOpenChange={setLinkOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>URL</Label>
              <Input
                ref={linkInputRef}
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    applyLink()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLinkOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyLink}>
              {linkUrl ? "Apply" : "Remove Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function ToolbarButton({
  children,
  onClick,
  active,
  disabled,
  title,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  disabled?: boolean
  title?: string
}) {
  return (
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      size="sm"
      className="h-8 w-8 p-0"
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </Button>
  )
}
