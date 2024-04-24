// customScript.js

const sails = require('sails');

// Start Sails.js application
sails.lift({
    // Sails.js configuration options, if any
}, (err) => {
    if (err) {
        console.error('Error occurred while lifting Sails.js application:', err);
        return;
    }
    console.log('Sails.js application lifted successfully');
});
