const express = require ('express');
const router = express.Router();
const bcrypt = require ('bcrypt');
const User = require('../models/User')
const verifyToken = require ('../middleware/verifyToken')


//GET /users - Lister tout les utilisateurs
router.get('/', async (req, res) => {
    try{
        const users = await User.find().select('-password') // empêche le renvoie du mot de passe
        res.json(users);
    } catch (err) {
        res.status(500).json({ message:'Erreur serveur'});
    }
});

// GET /users/profil - Accès au profil de l'utilisateur connecté
router.get ('/profil', verifyToken, (req, res) => {
    res.json ({ message: 'Accès autorisé', user: req.user});
});

// Route de debug : GET /users/debug/:id
router.get('/debug/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({message: 'Aucun utilisateur trouvé avec cet ID'})
        res.json(user)
    } catch (err) {
        res.status(500).json({message: 'Erreur serveur', err});
    }
})

router.get('/:email', async (req, res) => {
    try{
        const  { username, password } = req.body;
        const user = await User.findOne({ email: req.params.email }).select('-password');
        if(!user) return res.status(400).json ({ message: 'Utilisateur non trouvé'});

        if (req.user.email !== req.params.email){
            return res.status(403).json ({message: 'Non autorisé à modifier cet utilisateur'})
        }

        if (username) user.username = username
        if (password) user.password = password


        res.json(user)
    } catch (err){
        res.status(500).json({ message: 'Erreur serveur'});
    }
});


// POST /users - Créer un nouvel utilisateur 
router.post('/', async (req,res) => {
    try {
        const {username, email, password} = req.body;

        // Verification de champs obligatoire
        if(!username || !email || !password) {
            return res.status(400).json({ message: 'Champs obligatoire' });
        }

        // Verification duplicata email 
        const existUser = await User.findOne ({ email });
        if (existUser) {
            return res.status(400).json({ message: 'Email déjà utilisé'});
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: 'Utilisateur crée avec succès'});
    }   catch(err) {
        res.status(500).json({ message : 'Erreur serveur' })
    };
});


// PUT /users/:email - Modifier un utilisateur (sauf email) 
router.put('/:email', verifyToken ,async (req,res) => {
    try{
        const { username, password } = req.body;

        if (req.user.email !== req.params.email) {
            return res.status(403).json({ message: 'Non autorisé à modifier cet utilisateur' });
        }

        const user = await User.findOne({ email: req.params.email});
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé'});

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password,10);

        await user.save();
        res.json ({ message: 'Utilisateur mis à jour avec succès'});
    } catch (err){
        res.status(500).json({message: 'Erreur serveur'});
    }
});

// DELETE /user/:email - Supprimer un utilisateur

router.delete('/:email',verifyToken, async (req, res) => {
    try {

        if (req.user.email !== req.params.email) {
            return  res.status(403).json({ message: `Manques autorisations pour supprimé l'utilisateurs`})
        }

        const deleteUser = await User.findOneAndDelete({ email: req.params.email });
        if (!deleteUser) return res.status(404).json({message: 'Utilisateur non trouvé'});

        res.json({message: 'Utilisateur supprimé'});
    }catch(err) {
        res.status(500).json({ message: 'Erreur Serveur'})
    }
})

module.exports = router;