import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss'],
  standalone: false
})
export class AddAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  minDate!: string;
  selectedSpecialty: string = '';

  specialties = [
    { label: 'Cardiology', value: 'CARDIOLOGY' },
    { label: 'Neurology', value: 'NEUROLOGY' },
    { label: 'Orthopedics', value: 'ORTHOPEDICS' },
    { label: 'Pediatrics', value: 'PEDIATRICS' },
    { label: 'Dermatology', value: 'DERMATOLOGY' }
  ];

  doctors = [
    { idDoctor: 1, fullName: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
    { idDoctor: 2, fullName: 'Dr. Michael Chen', specialty: 'Neurology' },
    { idDoctor: 3, fullName: 'Dr. Emily Davis', specialty: 'Orthopedics' }
  ];

  filteredDoctors: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      patientName: [''],
      idDoctor: [''],
      appointmentDate: [''],
      appointmentTime: ['']
    });

    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.filteredDoctors = this.doctors;
  }

  filterSpecialty(value: string): void {
    this.selectedSpecialty = value;
    this.filteredDoctors = this.doctors.filter(
      doc => doc.specialty.toUpperCase() === value
    );
    this.appointmentForm.patchValue({ idDoctor: '' });
  }

  resetForm(): void {
    this.appointmentForm.reset();
    this.selectedSpecialty = '';
    this.filteredDoctors = this.doctors;
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      console.log(this.appointmentForm.value);
    }
  }
}