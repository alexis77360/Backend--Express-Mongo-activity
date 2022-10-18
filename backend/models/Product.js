const mongoose = require('mongoose');

//? Création du schéma de données
const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Boolean, required: true }
});

//? Exporter le modèle pour pouvoir l'utiliser dans d'autres fichiers
module.exports = mongoose.model('Product', productSchema);