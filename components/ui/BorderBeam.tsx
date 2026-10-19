// A gold spark that travels around its parent's border, in the style of Magic UI's <BorderBeam>.
// The parent must be `relative`.
export default function BorderBeam({ size = 160, duration = 9 }: { size?: number; duration?: number }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden [mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)] border-2 border-transparent"
    >
      <div
        className="motion-safe-only absolute aspect-square bg-gradient-to-l from-gold-light via-gold to-transparent"
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          animation: `border-beam ${duration}s linear infinite`,
        }}
      />
    </div>
  );
}
