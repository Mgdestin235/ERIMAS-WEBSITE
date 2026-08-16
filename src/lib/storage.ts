/**
 * Abstraction de stockage média. Deux implémentations :
 *  - "local"  : écrit dans /public/uploads (par défaut, aucune dépendance externe).
 *  - "s3"     : compatible tout endpoint S3 (Cloudflare R2, Supabase Storage, AWS S3),
 *               activée en renseignant STORAGE_DRIVER=s3 et les variables S3_* (.env.example).
 *
 * L'appelant (API /api/media) n'a jamais à connaître le mécanisme choisi.
 */
import { randomUUID } from 'crypto'
import path from 'path'
import { mkdir, unlink, writeFile } from 'fs/promises'

export type UploadInput = {
  buffer: Buffer
  filename: string
  mimeType: string
}

export type UploadResult = {
  url: string
  storageKey: string
}

export interface StorageAdapter {
  upload(input: UploadInput): Promise<UploadResult>
  remove(storageKeyOrUrl: string): Promise<void>
}

function safeExtension(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  return /^\.[a-z0-9]{1,8}$/.test(ext) ? ext : ''
}

class LocalStorageAdapter implements StorageAdapter {
  private uploadsDir = path.join(process.cwd(), 'public', 'uploads')

  async upload({ buffer, filename }: UploadInput): Promise<UploadResult> {
    await mkdir(this.uploadsDir, { recursive: true })
    const key = `${randomUUID()}${safeExtension(filename)}`
    await writeFile(path.join(this.uploadsDir, key), buffer)
    return { url: `/uploads/${key}`, storageKey: key }
  }

  async remove(storageKeyOrUrl: string): Promise<void> {
    const key = storageKeyOrUrl.replace(/^\/?uploads\//, '')
    try {
      await unlink(path.join(this.uploadsDir, key))
    } catch {
      // Fichier déjà absent — non bloquant.
    }
  }
}

class S3StorageAdapter implements StorageAdapter {
  private bucket = process.env.S3_BUCKET as string
  private publicBaseUrl = process.env.S3_PUBLIC_BASE_URL as string

  private async client() {
    const { S3Client } = await import('@aws-sdk/client-s3')
    return new S3Client({
      region: process.env.S3_REGION || 'auto',
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
      },
    })
  }

  async upload({ buffer, filename, mimeType }: UploadInput): Promise<UploadResult> {
    const { PutObjectCommand } = await import('@aws-sdk/client-s3')
    const key = `${randomUUID()}${safeExtension(filename)}`
    const s3 = await this.client()
    await s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      })
    )
    return { url: `${this.publicBaseUrl.replace(/\/$/, '')}/${key}`, storageKey: key }
  }

  async remove(storageKeyOrUrl: string): Promise<void> {
    const { DeleteObjectCommand } = await import('@aws-sdk/client-s3')
    const key = storageKeyOrUrl.replace(`${this.publicBaseUrl}/`, '').replace(/^\//, '')
    const s3 = await this.client()
    await s3.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }))
  }
}

export function getStorageAdapter(): StorageAdapter {
  const driver = process.env.STORAGE_DRIVER || 'local'
  return driver === 's3' ? new S3StorageAdapter() : new LocalStorageAdapter()
}

export const ACCEPTED_MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf']
export const MAX_UPLOAD_SIZE_BYTES = 8 * 1024 * 1024 // 8 Mo
