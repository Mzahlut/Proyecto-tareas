import user from "../models/user.model.js";
import byCrypt from "bcryptjs";
import createAccessToken from "../libs/jwt.js";



export const register = async (req, res) => {
    const { email, password, username } = req.body
    try {

      const userFound = await user.findOne({email})
      if(userFound) return res.status(400).json(['The email is already in use'])


        const passwordHash = await byCrypt.hash(password, 10)

        const newUser = new user({
            username,
            email,
            password: passwordHash
        })

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved.id })


        res.cookie('token', token)


        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }


}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {

        const userFound = await user.findOne({ email })

        if (!userFound) {
            return res.status(400).json([{ message: 'user not found' }])
        }

        const isMatch = await byCrypt.compare(password, userFound.password)

        if (!isMatch) return res.status(400).json({ message: 'Incorrect password' })



        const token = await createAccessToken({ id: userFound.id })


        res.cookie('token', token)


        res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

export const logout = async (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const profile = async (req, res) => {

    console.log(req.user)
    const userFound = await user.findById(req.user.id)
    if (!userFound) return res.status(404).json({ message: "Usuario no encontrado" })

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })


}