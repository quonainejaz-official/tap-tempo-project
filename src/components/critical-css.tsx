/**
 * Critical above-the-fold CSS inlined in <head> to eliminate render-blocking.
 * Only contains styles needed for the homepage hero and above-the-fold content.
 * Full stylesheet loads asynchronously via globals.css.
 */
export function CriticalCss() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
/* Tailwind preflight reset — critical for first paint */
*,::before,::after{box-sizing:border-box;border-color:currentColor}
body{margin:0;font-family:var(--app-font-sans,'DM Sans',system-ui,sans-serif);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;background:hsl(var(--background));color:hsl(var(--foreground))}

/* Hero section above-the-fold */
.hero-container{max-width:1200px;margin:0 auto;padding:0 1rem}
@media(min-width:640px){.hero-container{padding:0 1.5rem}}
@media(min-width:1024px){.hero-container{padding:0 2rem}}

/* Font fallback — prevent FOUT for hero text */
.font-serif{font-family:var(--app-font-serif,'Instrument Serif',Georgia,serif)}
.font-mono{font-family:var(--app-font-mono,'JetBrains Mono',monospace)}

/* Primary color flash prevention */
.text-primary{color:hsl(var(--primary))}
.bg-primary\/10{background-color:hsl(var(--primary)/0.1)}
`,
      }}
    />
  )
}
