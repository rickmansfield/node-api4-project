// require('dotenv').config()
// const express = require('express')
const server = require('./api/server.js');

const PORT = process.env.PORT || 9000;


server.listen(PORT, () => {
    console.log('Listening on PORT:', PORT);
});