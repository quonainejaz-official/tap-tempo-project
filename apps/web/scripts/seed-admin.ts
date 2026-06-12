import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

const uri = process.env.MONGODB_URI!
const adminEmail = process.env.ADMIN_EMAIL || "Taptempous@gmail.com"
const adminPassword = process.env.ADMIN_PASSWORD || "Ppuyyu@77"

async function seed() {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const db = client.db("taptempo")
    const admins = db.collection("admins")

    const existing = await admins.findOne({ email: adminEmail })
    if (existing) {
      console.log("Admin already exists, updating password...")
      const hashed = await bcrypt.hash(adminPassword, 12)
      await admins.updateOne(
        { email: adminEmail },
        { $set: { password: hashed, username: "admin", email: adminEmail } },
      )
      console.log("Admin password updated.")
    } else {
      const hashed = await bcrypt.hash(adminPassword, 12)
      await admins.insertOne({
        username: "admin",
        email: adminEmail,
        password: hashed,
      })
      console.log("Admin user created.")
    }
  } finally {
    await client.close()
  }
}

seed().catch(console.error)
