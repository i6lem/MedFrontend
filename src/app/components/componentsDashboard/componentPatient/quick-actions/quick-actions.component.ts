import { Component, Output, EventEmitter } from '@angular/core';
import { QuickAction, QUICK_ACTIONS } from './quick-actions.model';
import { Appointment } from '../../commonComponentsDash/appointments/appointment.model';
import { AppointmentsService } from '../../commonComponentsDash/appointments/appointments.service';
import { AddAppointmentComponent } from '../../commonComponentsDash/appointments/add-appointment/add-appointment.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quick-actions',
  standalone: true,
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.scss',
  imports: [CommonModule, AddAppointmentComponent]
})
export class QuickActionsComponent {
  appointments: Appointment[] = [];
  showAddModal: boolean = false;

   constructor(private service: AppointmentsService) {}

  // List of available quick actions
  actions: QuickAction[] = QUICK_ACTIONS;

  // Emit when an action is clicked
  @Output() actionClicked = new EventEmitter<QuickAction['id']>();

  /**
   * Handle action button click
   */
  onActionClick(action: QuickAction): void {
    this.actionClicked.emit(action.id);
  }
  openAddForm(): void {
    this.showAddModal = true;
  }

  closeAddForm(): void {
    this.showAddModal = false;
  }
  loadAppointments(): void {
    this.service.getAll().subscribe(data => this.appointments = data);
  }
}
