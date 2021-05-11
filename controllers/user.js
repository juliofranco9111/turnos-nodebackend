const { response } = require("express");
const User = require('../models/User');

const getUserByDocument = async (req, res = response) => {

    const document = req.params.document;

    try {
        const userDB = await User.findOne({ document });

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró ningún usuario con ese número de documento'
            })
        }

        res.status(200).json({
            ok: true,
            name: userDB.name,
            email :userDB.email,
            id :userDB.id,
            document :userDB.document
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }

}

const getUserById = async (req, res = response) => {

    const id = req.params.id;

    try {
        const userDB = await User.findById( id );

        if (!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró ningún usuario, por favor inicie sesión'
            })
        }

        res.status(200).json({
            ok: true,
            name: userDB.name,
            email :userDB.email,
            id :userDB.id,
            role: userDB.role,
            img: userDB.img
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor'
        });
    }

}

const getProfessionals = async (req, res = response) => {
  try {
      const users = await User.find();
     if(users){
        const professionals = []
        
        users.map( user => {
            if( user.role === 'PROFESSIONAL_ROLE' ){
                professionals.push(user)
            }
        } )

        if( professionals ){
            res.status(200).json({
                ok: true,
               professionals
            })
        }else{
            return res.status(400).json({
                ok: false,
                msg: 'No se encontró ningún profesional'
            })  
        }
     }else{
        return res.status(400).json({
            ok: false,
            msg: 'No se encontró ningún usuario'
        })
     }
    

  } catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Error del servidor'
    });
  }
}

module.exports = {
    getUserByDocument,
    getUserById,
    getProfessionals
}