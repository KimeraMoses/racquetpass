//AUTH ROUTES
export const loginRoute = () => ({
  url: `/api/v1/auth/login`,
});

export const forgotPasswordRoute = () => ({
  url: `/api/v1/auth/forgot-password`,
});
export const passwordResetRoute = (resetToken) => ({
  url: `/api/v1/auth/reset-password/${resetToken}`,
});

//SHOP ACTIONS ROUTES
export const createBusinessRoute = () => ({
  url: `/api/v1/catalog/register-business`,
});
export const editBusinessRoute = (id) => ({
  url: `/api/v1/catalog/edit-shop-settings/${id}`,
});
export const allShopsRoute = () => ({
  url: `/api/v1/shops`,
});
export const enabledShopsRoute = () => ({
  url: `/api/v1/shops/get-enabled`,
});

//SHOP ORDERS ROUTES
export const shopOrdersRoute = (id) => ({
  url: `/api/v1/catalog/orders/${id}?completed=false`,
});

export const shopOrderRoute = (id) => ({
  url: `/api/v1/orders/${id}`,
});
export const createOrdersRoute = () => ({
  url: `/api/v1/catalog/create-order`,
});

//PAYMENT ROUTES
export const subscriptionSessionRoute = () => ({
  url: `/api/v1/shops/subscription-session`,
});
export const manageSessionRoute = () => ({
  url: `/api/v1/shops/stripe-session`,
});

//RACQUET ROUTES
export const getRaquetsRoute = () => ({
  url: `/api/v1/racquets/`,
});
export const getRaquetRoute = (id) => ({
  url: `/api/v1/racquets/${id}`,
});
export const getStringsRoute = (id) => ({
  url: `/api/v1/catalog/inventory/${id}`,
});
export const newStringsRoute = () => ({
  url: `/api/v1/strings`,
});
export const editStringsRoute = (id) => ({
  url: `/api/v1/strings/${id}`,
});
