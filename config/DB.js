const donavida = require('mongoose');

require('dotenv').config({
    path: 'variables.env'
});

const conectarDB = async () => {



    try {

        await donavida.connect(process.env.DB_DonaVida, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        console.log('BD Conectada');

    } catch (error) {

        console.log(error);
        process.exit(1);
    }

}

module.exports = conectarDB;