import cloudinaryApiClient from "../apis/cloudinary-api";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "a2xkldo5");

  return await cloudinaryApiClient().post("/image/upload", formData);
};
