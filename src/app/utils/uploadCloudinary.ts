export default async function uploadCloudinary(files: Array<File>) {
  const urls = [] as string[];
  if (!files || files.length <= 0) {
    return { success: false, message: "No file uploaded" };
  }

  const uploadPromises = files.map(async (file) => {
    const newFormData = new FormData();
    newFormData.append("file", file as Blob);
    newFormData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: newFormData,
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.error?.message || "Failed to upload image",
          urls: null,
        };
      }

      const data = await response.json();
      return {
        success: true,
        message: "Uploaded successfully",
        url: data.secure_url,
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "error", urls: null };
    }
  });
  const results = await Promise.all(uploadPromises);
  const successfulUploads = results
    .filter((result) => result.success)
    .map((result) => result.url);
  const failedUploads = results.filter((result) => !result.success);

  return {
    success: failedUploads.length === 0,
    message: failedUploads.length > 0 ? "Some uploads failed" : "All uploads ",
    urls: successfulUploads,
    errors: failedUploads,
  };
}
