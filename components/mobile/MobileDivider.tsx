// Section divider for the mobile view — on-theme: dashed emerald rails fading
// toward a glitching mono token with chromatic aberration.
export default function MobileDivider() {
  return (
    <div className="px-8 py-12" aria-hidden>
      <div className="flex items-center gap-3">
        {/* left dashed rail, fading in toward center */}
        <span
          className="h-px flex-1"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(16,185,129,0.3) 0 4px, transparent 4px 11px)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 85%)",
            maskImage: "linear-gradient(90deg, transparent, #000 85%)",
          }}
        />

        {/* center glitch token */}
        <span className="relative flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-emerald-400/40" />
          <span
            className="bg-symbol-glitch font-mono text-[11px] tracking-[0.25em] text-emerald-400/70 leading-none"
            style={{
              fontFamily: "var(--font-space-mono)",
              textShadow: "1.5px 0 rgba(255,0,60,0.55), -1.5px 0 rgba(0,240,255,0.55)",
            }}
          >
            &lt;/&gt;
          </span>
          <span className="w-1 h-1 rounded-full bg-emerald-400/40" />
        </span>

        {/* right dashed rail, fading out from center */}
        <span
          className="h-px flex-1"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(16,185,129,0.3) 0 4px, transparent 4px 11px)",
            WebkitMaskImage: "linear-gradient(270deg, transparent, #000 85%)",
            maskImage: "linear-gradient(270deg, transparent, #000 85%)",
          }}
        />
      </div>
    </div>
  );
}
