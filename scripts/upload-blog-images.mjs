import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const files = [
  "blog_pics/featured-image-common-metronome-mistakes.jpg",
  "blog_pics/why-metronome-practice-feels-difficult-musician.jpg",
  "blog_pics/metronome-mistakes-increasing-bpm-too-quickly.png",
  "blog_pics/milliseconds-in-music-beginner-guide.png",
  "blog_pics/milliseconds-vs-seconds-audio-timing.png",
  "blog_pics/where-milliseconds-are-used-in-music-production.png",
]

for (const file of files) {
  const result = await cloudinary.uploader.upload(file, {
    folder: "taptempo",
  })
  console.log(`${file} =>`)
  console.log(`  url: ${result.secure_url}`)
  console.log(`  publicId: ${result.public_id}`)
}
