import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadImage(
  file: string,
  folder = "taptempo"
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "auto",
  })
  return { url: result.secure_url, publicId: result.public_id }
}

export async function deleteImage(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch {
    console.warn("Failed to delete image from Cloudinary:", publicId)
  }
}

export function getPublicIdFromUrl(url: string): string | null {
  const parts = url.split("/")
  const uploadIndex = parts.indexOf("upload")
  if (uploadIndex === -1) return null
  return parts.slice(uploadIndex + 2).join("/").replace(/\.[^/.]+$/, "")
}
