const express = require('express');

//? Mongoose pour la BDD
const mongoose = require('mongoose');

const app = express();

//? importer la root Product
const Product = require('./models/Product');


//? Connexion à la BDD
mongoose.connect("mongodb+srv://alexfavdev:alexis20@cluster0.oyormvk.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


//? Intercepte du JSON équivalent à body-parser ( corps de la requete)
app.use(express.json());


//? créer une route GET pour tous les utilisateurs
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/products', (req, res, next) => {
    const product = new Product({
        ...req.body
    });
    product.save()
        .then(() => res.status(201).json({
            product
        }))
        .catch(error => res.status(400).json({
            error
        }));
});




app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({
            _id: req.params.id
        })
        .then(product => res.status(200).json({
            product
        }))
        .catch(error => res.status(404).json({
            error
        }));
});

app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({
            _id: req.params.id
        }, {
            ...req.body,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet modifié !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
});

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Deleted !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
});

app.get('/api/products', (req, res, next) => {
    Product.find()
        .then(products => res.status(200).json({
            products
        }))
        .catch(error => res.status(400).json({
            error
        }));
});

module.exports = app;