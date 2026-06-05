import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import PriceTicker from '@/components/PriceTicker'
import { StatsSection, Footer } from '@/components/Sections'
import { PartnerLogoStrip } from '@/components/SubtleMonetization'

// ─────────────────────────────────────────────────────────────────────────────
// Homepage — identical structure to original, plus:
//   PriceTicker     → above hero, commodity prices + email capture
//   PartnerLogoStrip → below hero, paid brand placement strip
// AboutSection, ProductsSection, CertificationsSection, ContactSection
// are NOT here — they live on their own pages (/about /products etc)
// exactly as in the original.
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />
      <PriceTicker />
      <HeroSection />
      <PartnerLogoStrip />
      <StatsSection />
      <Footer />
    </>
  )
}
