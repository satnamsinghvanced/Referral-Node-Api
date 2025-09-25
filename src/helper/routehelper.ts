const COMMON_ROUTES = {
  ROOT: "/",
  ID_PARAM: "/:id"
};

const AUTH_ROUTE = {
  LOGIN: "/login",
  SIGN_IN: "/register",
  LOGOUT: `/logout${COMMON_ROUTES.ID_PARAM}`
}

const ROUTES = {
  USERS: "/users",
  SUBSCRIPTIONS: "/subscriptions",
  ROLES: "/role",
  PAYMENTS: "/payment",
  PERMISSION: "/permission",
  PRACTICE_TYPE: "/practice",
  REFERRER: "/referrer",
};

export { COMMON_ROUTES, ROUTES, AUTH_ROUTE };