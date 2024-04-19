/**
 * Doctor.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: 'string', required: true },
    department: { type: 'string', required: true },
    experience: { type: 'string', required: true },
    gender: { type: 'string', required: true },
    city: { type: 'string', required: true },
    country: { type: 'string', required: true },
    specialization: { type: 'string', required: true },
    patientsServed: { type: 'string', required: true }, // Update attribute name
    doctoravailable: { type: 'boolean', defaultsTo: false },

  }
};


