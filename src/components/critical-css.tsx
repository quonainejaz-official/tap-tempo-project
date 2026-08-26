/**
 * Critical above-the-fold CSS inlined in <head>.
 * Box-sizing reset + theme tokens + body font/color.
 * Everything else (Tailwind utilities, font-face)
 * loads via the async globals.css stylesheet.
 */
export function CriticalCss() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `*,::before,::after{box-sizing:border-box}:root{--accent-color:216 100% 46%;--destructive-color:3 100% 59%;--background:0 0% 98%;--foreground:0 0% 9%;--card:0 0% 100%;--card-foreground:0 0% 9%;--primary:var(--accent-color);--primary-foreground:0 0% 100%;--secondary:0 0% 96%;--secondary-foreground:0 0% 9%;--muted:0 0% 92%;--muted-foreground:0 0% 38%;--border:0 0% 90%;--destructive:var(--destructive-color);--destructive-foreground:0 0% 100%;--radius:0.75rem;--app-font-sans:'DM Sans',sans-serif;--app-font-mono:'JetBrains Mono',monospace}.dark{--background:0 0% 4%;--foreground:0 0% 98%;--card:0 0% 7%;--card-foreground:0 0% 98%;--secondary:0 0% 9%;--secondary-foreground:0 0% 98%;--muted:0 0% 15%;--muted-foreground:0 0% 65%;--border:0 0% 15%;--destructive-foreground:0 0% 100%}body{margin:0;background:hsl(var(--background));color:hsl(var(--foreground));font-family:var(--app-font-sans);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}`,
      }}
    />
  )
}
