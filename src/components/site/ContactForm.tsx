'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { CheckCircle2, Loader2, AlertTriangle } from 'lucide-react'
import { contactFormSchema, type ContactFormValues } from '@/lib/validations'
import { cn } from '@/lib/utils'

const fieldClasses =
  'w-full rounded-xl border border-navy-700 bg-navy-900/60 px-4 py-3 text-sm text-cream placeholder:text-navy-400 transition-colors focus:border-mint-400 focus:outline-none focus:ring-2 focus:ring-mint-400/30'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  })

  async function onSubmit(values: ContactFormValues) {
    setStatus('idle')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('request-failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-3 rounded-2xl border border-mint-700/50 bg-mint-900/20 p-10 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-mint-400" />
        <h3 className="font-display text-xl font-semibold text-cream">Message bien reçu</h3>
        <p className="max-w-sm text-sm text-navy-300">
          Merci de nous avoir contactés. Notre équipe reviendra vers vous dans les meilleurs délais.
        </p>
        <button onClick={() => setStatus('idle')} className="mt-2 text-sm font-semibold text-mint-400 hover:text-mint-300">
          Envoyer un autre message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Anti-spam : champ invisible, un humain ne le remplit jamais */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('company')} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy-200">
            Nom complet
          </label>
          <input id="name" className={fieldClasses} placeholder="Votre nom" {...register('name')} aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-200">
            E-mail
          </label>
          <input id="email" type="email" className={fieldClasses} placeholder="vous@exemple.com" {...register('email')} aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-navy-200">
            Téléphone <span className="text-navy-500">(optionnel)</span>
          </label>
          <input id="phone" className={fieldClasses} placeholder="+235 …" {...register('phone')} />
        </div>
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-navy-200">
            Objet <span className="text-navy-500">(optionnel)</span>
          </label>
          <input id="subject" className={fieldClasses} placeholder="Objet de votre demande" {...register('subject')} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy-200">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className={cn(fieldClasses, 'resize-none')}
          placeholder="Décrivez votre besoin…"
          {...register('message')}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-xl border border-red-800/60 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          <AlertTriangle size={16} />
          Une erreur est survenue lors de l’envoi. Merci de réessayer, ou de nous écrire directement par e-mail.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-mint-500 px-6 py-3.5 text-sm font-semibold text-navy-950 transition-transform duration-300 ease-premium hover:-translate-y-0.5 hover:bg-mint-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting && <Loader2 size={16} className="animate-spin" />}
        Envoyer le message
      </button>
    </form>
  )
}
