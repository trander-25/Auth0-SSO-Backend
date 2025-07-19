import express from 'express'
import { userController } from '~/controllers/userController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

// Private: Auth0 user login hook (requires access token)
Router.route('/private/hook/login')
  .post(authMiddleware.auth0JwtCheck, userController.hookLogin)

// Private: Get all users (requires access token)
Router.route('/private/get_all')
  .get(authMiddleware.auth0JwtCheck, userController.getAll)

// Public: Get all users (no authentication required)
Router.route('/public/get_all')
  .get(userController.getAll)

// Public: Delete user by email (for testing)
Router.route('/public/delete/:email')
  .delete(userController.deleteByEmail)

export const userRoute = Router
