const backendDomain = "http://localhost:8080"; // Địa chỉ backend của bạn

const SummaryApi = {
  // User APIs
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

  // Product APIs
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
  searchProduct: {
    url: `${backendDomain}/api/search-products`,
    method: "get",
  },

  // Order APIs
  createOrder: {
    url: `${backendDomain}/api/create-order`,
    method: "post",
  },
  getAllOrders: {
    url: `${backendDomain}/api/orders`,
    method: "get",
  },

  // PayPal APIs
  createPaypalOrder: {
    url: `${backendDomain}/api/paypal/create-order`,
    method: "post",
  },
  executePaypalPayment: {
    url: `${backendDomain}/api/paypal/execute-payment`,
    method: "post",
  },

  // Category APIs
  category: {
    getAll: {
      url: `${backendDomain}/api/categories`,
      method: "get",
    },
    getByGender: (gender) => ({
      url: `${backendDomain}/api/categories/gender/${gender}`,
      method: "get",
    }),
    getByProductType: (type) => ({
      url: `${backendDomain}/api/categories/type/${type}`,
      method: "get",
    }),
    getBySubCategory: (gender, subCategory) => ({
      url: `${backendDomain}/api/categories/${gender}/${subCategory}`,
      method: "get",
    }),
  },
};

export default SummaryApi;
