const User = require ('../models/user');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const secret = process.env.JWT_SECRET;

exports.register = async (req,res) => {
    
    try {
        const {username, email, password } = req.body;
        
        //verification disponnibilité mail
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email déjà utilisé' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({username, email, password: hashedPassword});
        await user.save();

        res.status(201).json({message: 'Utilisateur enregistré avec succès'});
    } catch (err) {
        //console.error(err);
        res.status(500).json({error: `Erreur lors de l'inscription`})
    } 
};

exports.login =async (req,res) => {
    try {
        const {email, password} = req.body;

        //Recherche utilisateur
        const user =await User.findOne({ email });
        if(!user) {
            return res.status(400).json({error: "Utilisateur non trouvé"})
        }

        //Compare les mot de passe
        const isMatch = await user.comparePassword(password);
        //console.log('Résultat de la comparaison des mots de passe:', isMatch);
        
        if (!isMatch) return res.status (400).json({error: "Mot de passe incorrect"});

        // Genere un token 
        const token = jwt.sign (
            {userId: user._id, email: user.email},
            secret, 
            {expiresIn: '1h'}
        );

        res.json({
            message: 'Connexion réussie',
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            token 
        });
    } catch(err) {
        //console.error(err);
        res.status(500).json({message: 'Erreur lors de la connexion'});
    }
};