export default function Footer() {
  return (
    <footer
      className="shrink-0 border-t border-agro-accent/40 bg-agro-surface px-4 lg:px-6 pt-[11px] flex items-center justify-center gap-4 lg:gap-10"
      style={{ paddingBottom: 'calc(11px + env(safe-area-inset-bottom, 0px))' }}
    >
      <img src="/footer/logouni.png"        alt="Universidad del Magdalena"               className="h-[41px] sm:h-14 object-contain" />
      <img src="/footer/doradouni.png"      alt="Acreditación Institucional Alta Calidad" className="h-[41px] sm:h-14 object-contain" />
      <img src="/footer/logo_marcapais.png" alt="Colombia"                                className="h-[41px] sm:h-14 object-contain" />
      <img src="/footer/escudo_colombia.png" alt="República de Colombia"                  className="h-[41px] sm:h-14 object-contain" />
    </footer>
  )
}
