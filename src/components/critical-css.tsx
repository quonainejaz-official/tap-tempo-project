/**
 * Critical above-the-fold CSS inlined in <head>.
 * Bare minimum: box-sizing reset + body font/color.
 * Everything else (Tailwind utilities, font-face, theme tokens)
 * loads via the async globals.css stylesheet.
 */
export function CriticalCss() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `*,::before,::after{box-sizing:border-box}body{margin:0;background:hsl(var(--background));color:hsl(var(--foreground))}`,
      }}
    />
  )
}
