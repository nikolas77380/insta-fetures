// import modular routes
import webRoutes from "./web"
import authRoutes from "./auth";

// import userRoutes from "../modules/user/routes"

export default [...webRoutes, ...authRoutes];
