export default function CausticsOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden opacity-[0.06]" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="caustics">
            <feTurbulence type="turbulence" baseFrequency="0.015 0.008" numOctaves="3" seed="5" result="noise" />
            <feColorMatrix type="luminanceToAlpha" in="noise" result="alpha" />
            <feComponentTransfer in="alpha" result="light">
              <feFuncA type="discrete" tableValues="0 0 0.3 0.6 0.3 0 0" />
            </feComponentTransfer>
            <feGaussianBlur in="light" stdDeviation="15" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#caustics)" />
      </svg>
    </div>
  );
}
