const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const Professional = require('../models/Professional');

const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    const userDB = await User.findOne({ email });

    if (userDB) {
        return res.status(400).json({
            ok: false,
            msg: `Ya existe un usuario registrado con el correo ${email}`
        })
    }

    try {
        const user = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generar JWT
        const token = await generateJWT(user.id, user.name);


        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            role: user.role,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }


};


const createUserProfessional = async (req, res = response) => {

    const { email, password } = req.body;

    const professionalDB = await Professional.findOne({ email });

    if (professionalDB) {
        return res.status(400).json({
            ok: false,
            msg: `Ya existe un usuario registrado con el correo ${email}`
        })
    }

    try {
        const professional = new Professional(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        professional.password = bcrypt.hashSync(password, salt);

        await professional.save();

        // Generar JWT
        const token = await generateJWT(professional.id, professional.name);


        res.status(201).json({
            ok: true,
            uid: professional.id,
            name: professional.name,
            role: professional.role,
            specialty: professional.specialty,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }


};


const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: `No existe un usuario registrado con el correo ${email}`
            })
        }

        // Validar el password encriptado
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        // Generar JWT
        const token = await generateJWT(userDB.id, userDB.name);

        res.status(200).json({
            ok: true,
            uid: userDB.id,
            token,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }




}



const renewToken = async (req, res = response) => {

    const { uid, name } = req;

    const token = await generateJWT(uid, name);


    res.json({
        ok: true,
        token,
        uid,
        name
    });
}


module.exports = {
    createUser,
    loginUser,
    renewToken,
    createUserProfessional
}