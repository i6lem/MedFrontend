import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { Appointment } from '../appointment.model';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  standalone: false
})
export class AppointmentListComponent implements OnInit {

  appointments: Appointment[] = [];
  selectedStatus: string = 'all'; // Par défaut, tous les statuts
  selectedDate: string = 'all'; // Par défaut, toutes les dates

  constructor(private service: AppointmentsService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.service.getAll().subscribe(data => this.appointments = data);
  }

  cancel(id: number): void {
    this.service.cancel(id);
    this.loadAppointments(); // Rafraîchir la liste après l'annulation
  }

  getStatusClass(status: string): string {
    return {
      scheduled: 'badge-scheduled',
      completed: 'badge-completed',
      cancelled: 'badge-cancelled',
      confirmed: 'badge-confirmed'
    }[status] || '';
  }

  // Méthode pour filtrer par statut
  filterByStatus(appointments: Appointment[]): Appointment[] {
    if (this.selectedStatus === 'all') {
      return appointments;
    }
    return appointments.filter(appt => appt.status === this.selectedStatus);
  }

  // Méthode pour filtrer par date (par exemple, "today" ou "all")
  filterByDate(appointments: Appointment[]): Appointment[] {
    if (this.selectedDate === 'all') {
      return appointments;
    }
    const today = new Date();
    return appointments.filter(appt => {
      const appointmentDate = new Date(appt.date);
      return appointmentDate.toDateString() === today.toDateString(); // Compare uniquement la date sans l'heure
    });
  }

  // Combine les filtres de statut et de date
  getFilteredAppointments(): Appointment[] {
    let filteredAppointments = this.filterByStatus(this.appointments);
    filteredAppointments = this.filterByDate(filteredAppointments);
    return filteredAppointments;
  }
}