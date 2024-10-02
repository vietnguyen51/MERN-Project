const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
  const Dataresponse = await fetch(url,{
    method : 'POST',
    body : image
  });
};
export default uploadImage;
