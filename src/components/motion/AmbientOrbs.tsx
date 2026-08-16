/**
 * Orbes de lumière ambiante — profondeur discrète en arrière-plan.
 * Animation CSS pure (GPU), désactivée automatiquement par la règle
 * prefers-reduced-motion globale définie dans globals.css.
 */
export function AmbientOrbs({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="animate-orb-float-1 absolute -left-32 -top-40 h-[36rem] w-[36rem] rounded-full bg-navy-600/30 blur-[110px]" />
      <div className="animate-orb-float-2 absolute -right-24 top-1/3 h-[30rem] w-[30rem] rounded-full bg-mint-700/20 blur-[120px]" />
      <div className="animate-orb-float-3 absolute bottom-[-10rem] left-1/4 h-[28rem] w-[28rem] rounded-full bg-navy-500/20 blur-[100px]" />
    </div>
  )
}
