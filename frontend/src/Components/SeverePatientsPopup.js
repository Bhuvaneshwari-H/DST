import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function SeverePatientsPopup({ isOpen, onClose, severePatients }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          border: '2px solid red', // Apply red border
        },
      }}
    >
      <DialogTitle>List of Severe Patients</DialogTitle>
      <DialogContent>
        <ul>
          {Array.isArray(severePatients) && severePatients.map(patient => (
            <li style={{listStyle:'none'}} key={patient.id}>{`${patient.name}: ${patient.description}`}</li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SeverePatientsPopup;
