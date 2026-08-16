import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TestimonialForm } from '@/components/admin/forms/TestimonialForm'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Témoignage' }

export default async function AdminTestimonialEditPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'nouveau'
  const testimonial = isNew ? null : await prisma.testimonial.findUnique({ where: { id: params.id } })

  if (!isNew && !testimonial) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-cream">{isNew ? 'Nouveau témoignage' : 'Modifier le témoignage'}</h1>
      </div>
      <TestimonialForm initial={testimonial} />
    </div>
  )
}
