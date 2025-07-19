/* eslint-disable no-console */
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from '~/config/corsOptions'
import { APIs_V1 } from '~/routes/v1/'

const START_SERVER = () => {
  // Initialize Express App
  const app = express()

  // Disable Express cache
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

  // Enable cookie parser
  app.use(cookieParser())

  // Configure CORS
  app.use(cors(corsOptions))

  // Enable JSON body parsing
  app.use(express.json())

  // Setup API v1 routes
  app.use('/api-v1', APIs_V1)

  // Environment configuration
  const LOCAL_DEV_APP_PORT = 8020
  const LOCAL_DEV_APP_HOST = 'localhost'
  const AUTHOR = 'Trander'

  // Production environment (Render.com)
  if (process.env.BUILD_MODE === 'production') {
    app.listen(process.env.PORT, () => {
      console.log(`Production: Hi ${AUTHOR}, Back-end Server is running successfully at Port: ${process.env.PORT}`)
    })
  } else {
    // Local development environment
    app.listen(LOCAL_DEV_APP_PORT, LOCAL_DEV_APP_HOST, () => {
      console.log(`Local DEV: Hello ${AUTHOR}, Back-end Server is running successfully at Host: ${LOCAL_DEV_APP_HOST} and Port: ${LOCAL_DEV_APP_PORT}`)
    })
  }
}

(async () => {
  try {
    // Start server
    console.log('Starting Server...')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})()
