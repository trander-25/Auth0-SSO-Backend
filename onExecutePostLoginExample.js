// @ts-nocheck
/**
 * Auth0 onExecutePostLogin Flow example for backend API integration
 */
const axios = require('axios')

const RENDER_API_ENDPOINT = '{your-render-api-endpoint}'
const AUTH0_CLIENT_ID = '{your-client-id}'
const AUTH0_CLIENT_SECRET = '{your-client-secret}'
const AUTH0_DOMAIN = '{your-auth0-domain}'

exports.onExecutePostLogin = async (event, api) => {
  // console.log('event.secrets: ', event.secrets)
  // const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } = event.secrets

  // Get access token from Auth0 for API access
  const getAccessToken = async () => {
    const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: RENDER_API_ENDPOINT,
      grant_type: 'client_credentials'
    })
    return response.data.access_token
  }
  const accessToken = await getAccessToken()

  try {
    // User info from Auth0 login
    // Save user to backend database
    await axios.post(`${RENDER_API_ENDPOINT}/api-v1/users/private/hook/login`, event.user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    let errorMessage = error.message // Default error message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message // API error message
    }
    api.access.deny(errorMessage)
  }
}
