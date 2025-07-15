const jwt = require ('jsonwebtoken');
const User = require ('../models/User')

const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({message: 'Token manquant ou invalide'});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Décodé :' ,decoded)

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({message: 'Utilisateur non trouvé'})
        }

        req.user = user; //Ajout des infos utilisateurs au req
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
};

module.exports = verifyToken;