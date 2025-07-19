import { StatusCodes } from 'http-status-codes'
const Datastore = require('nedb-promises')
const db = Datastore.create('src/database/db.json')

const hookLogin = async (req, res) => {
  try {
    const newUser = req.body
    const existingUser = await db.findOne({ email: newUser.email })

    // Skip insertion if user already exists
    if (existingUser) {
      res.status(StatusCodes.OK).json({ message: 'User already exists. Continue login...' })
      return
    }

    // Insert new user (NeDB auto-generates _id)
    const insertedUser = await db.insert(newUser)

    res.status(StatusCodes.CREATED).json(insertedUser)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const getAll = async (req, res) => {
  try {
    // Get all users from database
    const users = await db.find({})

    res.status(StatusCodes.OK).json(users)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

const deleteByEmail = async (req, res) => {
  try {
    // Delete user by email
    await db.remove({ email: req.params.email })

    res.status(StatusCodes.OK).json({ message: `User with email: ${req.params.email} deleted successfully.` })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
  }
}

export const userController = {
  hookLogin,
  getAll,
  deleteByEmail
}
