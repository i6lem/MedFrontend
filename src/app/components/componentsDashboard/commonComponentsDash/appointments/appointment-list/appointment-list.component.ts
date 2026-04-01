import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { Appointment } from '../appointment.model';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  appointments: Appointment[] = [];
  selectedStatus: string = 'all';
  startDate: string = '';
  endDate: string = '';

  constructor(private service: AppointmentsService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.service.getAll().subscribe(data => this.appointments = data);
  }

  onStatusChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedStatus = select.value;
  }

  onStartDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.startDate = input.value;
  }

  onEndDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.endDate = input.value;
  }

  cancel(id: number): void {
    this.service.cancel(id);
    this.loadAppointments();
  }
  

  confirm(id: number): void {
    const appt = this.appointments.find(a => a.id === id);
    if (appt && appt.status === 'scheduled') appt.status = 'confirmed';
  }

  update(id: number): void {
    console.log('Update appointment:', id);
  }

  getStatusClass(status: string): string {
    return {
      scheduled: 'status-scheduled',
      completed: 'status-completed',
      cancelled: 'status-cancelled',
      confirmed: 'status-confirmed'
    }[status] || '';
  }

  getStatusDisplay(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  getStatusCount(status: string): number {
    return this.appointments.filter(appt => appt.status === status).length;
  }

  filterByStatus(appointments: Appointment[]): Appointment[] {
    if (this.selectedStatus === 'all') {
      return appointments;
    }
    return appointments.filter(appt => appt.status === this.selectedStatus);
  }

  filterByDateRange(appointments: Appointment[]): Appointment[] {
    if (!this.startDate && !this.endDate) {
      return appointments;
    }
    return appointments.filter(appt => {
      const appointmentDate = new Date(appt.date);
      appointmentDate.setHours(0, 0, 0, 0);
      let isInRange = true;
      if (this.startDate) {
        const start = new Date(this.startDate);
        start.setHours(0, 0, 0, 0);
        isInRange = isInRange && appointmentDate >= start;
      }
      if (this.endDate) {
        const end = new Date(this.endDate);
        end.setHours(23, 59, 59, 999);
        isInRange = isInRange && appointmentDate <= end;
      }
      return isInRange;
    });
  }

  getFilteredAppointments(): Appointment[] {
    let filtered = this.filterByStatus(this.appointments);
    filtered = this.filterByDateRange(filtered);
    return filtered;
  }

  clearFilters(): void {
    this.selectedStatus = 'all';
    this.startDate = '';
    this.endDate = '';
  }

  get hasActiveFilters(): boolean {
    return this.selectedStatus !== 'all' || !!this.startDate || !!this.endDate;
  }

  formatDate(dateValue: Date | string): string {
    const date = new Date(dateValue);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
