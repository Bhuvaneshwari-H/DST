
module.exports = {

    async add(req, res) {
        try {
          const patients = await Patients.create(req.body).fetch();
          return res.status(201).json(patients);
        } catch (error) {
          return res.status(500).json({ error: 'Server Error' });
        }
      },


      countpatients: async function(req, res) {
        try {
          const count = await Patients.count(); 
          return res.json({ count });
        } catch (error) {
          return res.serverError({ error: 'Internal Server Error' });
        }
      },
  
      getCountByDisease :async function(req, res) {
        const { disease } = req.query;
        try {
          const count = await Patients.count({ disease});
          res.json({ count });
        } catch (error) {
          console.error('Error fetching count by department:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },

      async countByDisease(req, res) {
  try {
    const patients = await Patients.find();
    const diseases = new Set(patients.map(patient => patient.disease));
    const counts = {};

    for (const disease of diseases) {
      const count = patients.filter(patient => patient.disease === disease).length;
      counts[disease] = count;
    }

    return res.ok(counts);
  } catch (error) {
    return res.serverError(error);
  }
},

async getPatientsByDisease(req, res) {
  try {
    const { disease } = req.query;
    // Assuming you have a Patient model
    const patients = await Patients.find({ disease });
    const patientNames = patients.map(patient => patient.name);
    return res.json({ patients :patientNames});
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
},




      async getByDoctor(req, res) {
        try {
            const doctorName = req.query.doctorName; // Extract doctor's name from query parameters
            
            // Query the database to find patients by the family doctor's name
            const patients = await Patients.find({ familydoctor: doctorName });
            
            // Return the list of patients associated with the doctor
            return res.ok(patients);
        } catch (error) {
            return res.serverError(error);
        }
    },  

    
    async getByFilter(req, res) {
      try {
        const filterType = req.query.filterType; // Extract the filter type from query parameters
        let filterValue = req.query.filterValue; // Extract the filter value from query parameters
    
        // Determine the field based on the filter type
        let filterField;
        switch (filterType) {
          case 'doctorName':
            filterField = 'familydoctor';
            break;
          case 'patientName':
            filterField = 'name';
            break;
          case 'disease':
            filterField = 'disease';
            break;
          default:
            return res.badRequest('Invalid filter type');
        }
    
        // Query the database to find patients based on the specified filter
        const patients = await Patients.find({ [filterField]: filterValue });
    
        // Return the list of filtered patients
        return res.ok(patients);
      } catch (error) {
        return res.serverError(error);
      }
    },
    

      async getSeverePatients(req, res) {
        try {
          const severePatients = await Patients.find({ severe: true }); // Assuming isSevere is a field indicating severity
          return res.json(severePatients);
        } catch (error) {
          return res.serverError(error);
        }
      },
  

      async patients(req, res) {
        try {
          // Fetch patients data from the database (e.g., using a model)
          const patients = await Patients.find(); // Assuming Doctor is your model
    
          // Send the fetched data as a response
          return res.json(patients);
        } catch (error) {
          // Handle errors
          console.error('Error fetching patients:', error);
          return res.status(500).json({ error: 'Server Error' });
        }
      },

  async deletepatient(req, res) {
    const { id } = req.params;
    try {
      // Find the doctor by ID and delete it
      const deletedPatient = await Patients.destroyOne({ id });
      if (!deletedPatient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.status(204).end(); // Respond with 204 No Content on successful deletion
    } catch (error) {
      console.error('Error deleting Patient:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  },



  async fetch(req, res) {
    try {
      const patients = await Patients.findOne({ id: req.params.id });
      if (!patients) {
        return res.notFound('Patient not found');
      }
      return res.json(doctor);
    } catch (error) {
      return res.serverError('Internal server error');
    }
  },

  async fetchById(req, res) {
    try {
      const patients = await Patients.findOne({ id: req.params.id });
      if (!patients) {
        return res.notFound('Patients not found');
      }
      return res.json(patients);
    } catch (error) {
      return res.serverError('Internal server error');
    }
  },

   
 
  async update1(req, res) {
    const patientId = req.param('id');
    const newData = req.allParams();
    try {
      const updatedPatient = await Patients.updateOne({ id: patientId }).set(newData);
      if (!updatedPatient) {
        return res.notFound('Patient not found.');
      }
      return res.ok(updatedPatient);
    } catch (error) {
      return res.serverError(error);
    }
  },

}