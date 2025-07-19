import { auth } from 'express-oauth2-jwt-bearer'

// Auth0 JWT verification using RS256 algorithm with automatic public key retrieval
const auth0JwtCheck = auth({
  audience: 'https://abcxyz.onrender.com', // Replace with your actual audience
  issuerBaseURL: 'https://dev-abcxyz.us.auth0.com/', // Replace with your actual Auth0 domain,
  tokenSigningAlg: 'RS256'
})

export const authMiddleware = {
  auth0JwtCheck
}
