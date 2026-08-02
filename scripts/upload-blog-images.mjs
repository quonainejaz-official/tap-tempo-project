import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const files = [
  "blog_pics/featured-multiple-bpm-song-infographic.webp.webp",
  "blog_pics/why-songs-change-tempo-infographic.webp.webp",
  "blog_pics/how-to-measure-variable-bpm-song-infographic.webp.webp",
]

for (const file of files) {
  const result = await cloudinary.uploader.upload(file, {
    folder: "taptempo",
  })
  console.log(`${file} =>`)
  console.log(`  url: ${result.secure_url}`)
  console.log(`  publicId: ${result.public_id}`)
}
