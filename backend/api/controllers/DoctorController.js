module.exports = {
    async create(req, res) {
      try {
        const doctor = await Doctor.create(req.body).fetch();
        return res.status(201).json(doctor);
      } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
      }
    },

    async plus(req, res) {
      try {
        const doctor = await Doctor.create(req.body).fetch();
        return res.status(201).json(doctor);
      } catch (error) {
        return res.status(500).json({ error: 'Server Error' });
      }
    },

    // api/controllers/DoctorController.js


    async getDoctorsByDepartment(req, res) {
      try {
        const { department } = req.query; // Access query parameters using req.query
    
        // Fetch doctors based on the provided department
        const doctors = await Doctor.find({ department });
    
        // Extract names of doctors from the fetched data
        const doctorNames = doctors.map(doctor => doctor.name);
    
        return res.json({ doctors: doctorNames });
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }
    },
    

  async countByDepartment(req, res) {
    try {
      const doctors = await Doctor.find();
      const departments = new Set(doctors.map(doctor => doctor.department));
      const counts = {};

      for (const department of departments) {
        const count = doctors.filter(doctor => doctor.department === department).length;
        counts[department] = count;
      }

      return res.ok(counts);
    } catch (error) {
      return res.serverError(error);
    }
  },



    countDoctors: async function(req, res) {
      try {
        const count = await Doctor.count(); // Assuming Doctor is your model
        return res.json({ count });
      } catch (error) {
        return res.serverError({ error: 'Internal Server Error' });
      }
    },

    getCountByDepartment :async function(req, res) {
      const { department } = req.query;
      try {
        const count = await Doctor.count({ department });
        res.json({ count });
      } catch (error) {
        console.error('Error fetching count by department:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },


    async fetchExperiencedDoctors(req, res) {
      try {
        // Fetch doctors data from the database (replace this with your actual database model)
        const doctors = await Doctor.find();
  
        // Filter the doctors based on experience (you may adjust this logic according to your data structure)
        const experiencedDoctors = doctors.filter(doctor => doctor.experience >= 10); // Example: Fetch doctors with experience of 10 years or more
  
        return res.json(experiencedDoctors); // Send the experienced doctors as JSON response
      } catch (error) {
        console.error('Error fetching experienced doctors:', error);
        return res.serverError('Internal server error'); // Handle error gracefully
      }
    },


    // DoctorController.js

    async fetchDoctorAvailability(req, res) {
      try {
        const doctorId = req.params.doctorId; // Extract doctor ID from request params
        const doctor = await Doctor.findOne({ id: doctorId }); // Find doctor by ID
    
        if (!doctor) {
          return res.notFound('Doctor not found');
        }
    
        // Determine availability status based on the `doctoravailable` attribute
        const availabilityStatus = doctor.doctoravailable ? 'available' : 'not available'; // Adjusted to use 'doctoravailable' attribute
    
        // Return doctor name and availability status
        return res.json({
          doctor: doctor.name, // Assuming 'name' attribute represents the doctor's name
          doctoravailable: availabilityStatus // Adjusted to use 'doctoravailable' attribute
        });
      } catch (error) {
        console.error('Error fetching doctor availability:', error);
        return res.serverError('Internal server error');
      }
    },    
    
    


    

    async doctors(req, res) {
      try {
        // Fetch doctors data from the database (e.g., using a model)
        const doctors = await Doctor.find(); // Assuming Doctor is your model
  
        // Send the fetched data as a response
        return res.json(doctors);
      } catch (error) {
        // Handle errors
        console.error('Error fetching doctors:', error);
        return res.status(500).json({ error: 'Server Error' });
      }
    },

// api/controllers/DoctorController.js


  async fetch(req, res) {
    try {
      const doctor = await Doctor.findOne({ id: req.params.id });
      if (!doctor) {
        return res.notFound('Doctor not found');
      }
      return res.json(doctor);
    } catch (error) {
      return res.serverError('Internal server error');
    }
  },

  async fetchById(req, res) {
    try {
      const doctor = await Doctor.findOne({ id: req.params.id });
      if (!doctor) {
        return res.notFound('Doctor not found');
      }
      return res.json(doctor);
    } catch (error) {
      return res.serverError('Internal server error');
    }
  },

   
      async update(req, res) {
        const doctorId = req.param('id');
        const newData = req.allParams();
        try {
          const updatedDoctor = await Doctor.updateOne({ id: doctorId }).set(newData);
          if (!updatedDoctor) {
            return res.notFound('Doctor not found.');
          }
          return res.ok(updatedDoctor);
        } catch (error) {
          return res.serverError(error);
        }
      },


    async deleteDoctor(req, res) {
        const { id } = req.params;
        try {
          // Find the doctor by ID and delete it
          const deletedDoctor = await Doctor.destroyOne({ id });
          if (!deletedDoctor) {
            return res.status(404).json({ error: 'Doctor not found' });
          }
          res.status(204).end(); // Respond with 204 No Content on successful deletion
        } catch (error) {
          console.error('Error deleting doctor:', error);
          res.status(500).json({ error: 'Server Error' });
        }
      }
      
};
