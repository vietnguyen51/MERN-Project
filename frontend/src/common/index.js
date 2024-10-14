const backendDomain = "http://localhost:8080"; // Địa chỉ backend của bạn

const SummaryApi = {
  // User APIs
  signUP: {
    url: `${backendDomain}/api/signup`,
    method: "post", // Chữ thường để tránh lỗi khi gọi fetch
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post", // Chữ thường
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
    url: `${backendDomain}/api/product-details`,  // Sửa lại kiểu tĩnh, không dùng hàm để tránh lỗi
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

  createPaypalOrder: {
    url: `${backendDomain}/api/paypal/create-order`,
    method: "post",
  },
  executePaypalPayment: {
    url: `${backendDomain}/api/paypal/execute-payment`,
    method: "post",
  },
  category: {
    getAll: {
      url: `${backendDomain}/api/categories`, // API để lấy tất cả các danh mục
      method: "get",
    },
    getByGender: (gender) => ({
      url: `${backendDomain}/api/categories/gender/${gender}`, // API theo giới tính (men, women)
      method: "get",
    }),
    getByProductType: (type) => ({
      url: `${backendDomain}/api/categories/type/${type}`, // API theo loại sản phẩm (shoes, bags, etc.)
      method: "get",
    }),
    getBySubCategory: (gender, subCategory) => ({
      url: `${backendDomain}/api/categories/${gender}/${subCategory}`, // API theo giới tính và danh mục con
      method: "get",
    }),
  },
};

export default SummaryApi;
