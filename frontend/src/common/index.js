const backendDomain = "http://localhost:8080";

const SummaryApi = {
  signUP: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/api/get-product`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/update-product`,
    method: "post",
  },
  menProduct: {
    url: `${backendDomain}/api/men-products`,
    method: "get",
  },
  womenProduct: {
    url: `${backendDomain}/api/women-products`,
    method: "get",
  },
  productDetails: {
    url: `${backendDomain}/api/product-details`,
    method: "get",
  },
  // Thêm API để tạo đơn hàng
  createOrder: {
    url: `${backendDomain}/api/create-order`,
    method: "post",
  },
  getAllOrders: {
    url: `${backendDomain}/api/orders`,
    method: "get",
  },

};

export default SummaryApi;
