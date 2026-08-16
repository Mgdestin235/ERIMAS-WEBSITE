import { SiteHeader } from '@/components/site/SiteHeader'
import { SiteFooter } from '@/components/site/SiteFooter'
import { CustomCursor } from '@/components/motion/CustomCursor'
import { IntroLoader } from '@/components/motion/IntroLoader'
import { PageTransition } from '@/components/motion/PageTransition'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IntroLoader />
      <CustomCursor />
      <SiteHeader />
      <main className="pt-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter />
    </>
  )
}
