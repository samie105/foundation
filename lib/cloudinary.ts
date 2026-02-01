"use server"

export async function uploadToCloudinary(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  const file = formData.get("file") as File
  
  if (!file) {
    return { success: false, error: "No file provided" }
  }

  try {
    const cloudinaryFormData = new FormData()
    cloudinaryFormData.append("file", file)
    cloudinaryFormData.append("upload_preset", "ml_default")
    cloudinaryFormData.append("folder", "donation_proofs")

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: cloudinaryFormData,
      }
    )

    const data = await response.json()

    if (data.secure_url) {
      return { success: true, url: data.secure_url }
    }

    return { success: false, error: data.error?.message || "Upload failed" }
  } catch (error) {
    console.error("Cloudinary upload error:", error)
    return { success: false, error: "Failed to upload image" }
  }
}
