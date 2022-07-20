export const loginRoute = () => ({
  url: `/api/v1/auth/login`,
});

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
