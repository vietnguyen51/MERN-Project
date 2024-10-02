const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product"); // Thay thế với giá trị đúng nếu cần

  const dataResponse = await fetch(url, {
    method: "POST",
    body: formData,
  });

  return dataResponse.json();
};

export default uploadImage;
