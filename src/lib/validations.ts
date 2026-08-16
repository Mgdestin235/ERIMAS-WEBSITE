import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, 'Veuillez indiquer votre nom complet.').max(120),
  email: z.string().trim().email('Adresse e-mail invalide.'),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .or(z.literal('')),
  subject: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Votre message doit contenir au moins 10 caractères.').max(4000),
  // Champ « pot de miel » anti-spam : doit rester vide.
  company: z.string().max(0).optional().or(z.literal('')),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const articleSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().min(3).max(200).regex(/^[a-z0-9-]+$/, 'Le slug ne doit contenir que des minuscules, chiffres et tirets.'),
  excerpt: z.string().trim().min(10).max(400),
  content: z.string().trim().min(20),
  coverImage: z.string().trim().optional().or(z.literal('')),
  category: z.string().trim().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']),
})

export const projectSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().min(3).max(200).regex(/^[a-z0-9-]+$/),
  client: z.string().trim().min(2).max(200),
  sector: z.string().trim().optional().or(z.literal('')),
  location: z.string().trim().optional().or(z.literal('')),
  year: z.coerce.number().int().min(2000).max(2100).optional(),
  summary: z.string().trim().min(10).max(400),
  content: z.string().trim().min(10),
  coverImage: z.string().trim().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  featured: z.boolean().optional(),
})

export const testimonialSchema = z.object({
  authorName: z.string().trim().min(2).max(160),
  authorRole: z.string().trim().optional().or(z.literal('')),
  organization: z.string().trim().optional().or(z.literal('')),
  quote: z.string().trim().min(10).max(1000),
  avatarUrl: z.string().trim().optional().or(z.literal('')),
  featured: z.boolean().optional(),
  order: z.coerce.number().int().optional(),
})

export const teamMemberSchema = z.object({
  name: z.string().trim().min(2).max(160),
  role: z.string().trim().min(2).max(160),
  bio: z.string().trim().optional().or(z.literal('')),
  photoUrl: z.string().trim().optional().or(z.literal('')),
  isFounder: z.boolean().optional(),
  order: z.coerce.number().int().optional(),
})

export const userSchema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email(),
  password: z.string().min(8).max(200).optional().or(z.literal('')),
  role: z.enum(['ADMIN', 'EDITOR']),
  isActive: z.boolean().optional(),
})
