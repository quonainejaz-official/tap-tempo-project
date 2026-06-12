"use client"

import { useCallback, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import ImageExtension from "@tiptap/extension-image"
import { Button } from "@/components/ui/button"
import { Bold, Italic, Heading2, List, ListOrdered, Image, Undo, Redo } from "lucide-react"

interface RichEditorProps {
  content: string
  onChange: (html: string) => void
}

export function RichEditor({ content, onChange }: RichEditorProps) {
  const [uploading, setUploading] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit, ImageExtension],
    content: content || "<p>Start writing...</p>",
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
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })
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

  if (!editor) return null

  return (
    <div className="border rounded-xl overflow-hidden">
      <div className="flex flex-wrap gap-1 p-2 border-b bg-muted/30">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
        >
          <Heading2 className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <List className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <ListOrdered className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={handleImageUpload} disabled={uploading}>
          <Image className="w-4 h-4" />
        </ToolbarButton>
        <div className="ml-auto flex gap-1">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
            <Undo className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
            <Redo className="w-4 h-4" />
          </ToolbarButton>
        </div>
      </div>
      <EditorContent
        editor={editor}
        className="prose prose-sm dark:prose-invert max-w-none p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  )
}

function ToolbarButton({
  children,
  onClick,
  active,
  disabled,
}: {
  children: React.ReactNode
  onClick: () => void
  active?: boolean
  disabled?: boolean
}) {
  return (
    <Button
      type="button"
      variant={active ? "secondary" : "ghost"}
      size="sm"
      className="h-8 w-8 p-0"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}
