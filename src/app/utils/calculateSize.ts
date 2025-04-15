export const sizeCalculator = (files: File[]) => {
  //validate format
  const validFormats = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
    "image/gif",
  ];
  // const isValidFormat = files.every((file) => validFormats.includes(file.type));
  for (const file of files) {
    if (!validFormats.includes(file.type)) {
      return {
        success: false,
        message: "Invalid file format",
      };
    }

    if (file.size > 1024 * 1024) {
      return {
        success: false,
        message: "File size exceeds 1MB",
      };
    }
  }

  return {
    success: true,
    message: "size is ok",
  };
};
