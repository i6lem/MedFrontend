import { Component } from '@angular/core';

/** Route : `/doctor/suivi-chronique` — menu : Chronic care */
@Component({
  selector: 'app-doctor-suivi-chronique',
  templateUrl: './doctor-suivi-chronique.component.html',
  standalone: false,
})
export class DoctorSuiviChroniqueComponent {
  chronicCases = [
    { patient: 'John Smith', condition: 'Hypertension', risk: 'Medium' },
    { patient: 'Sarah Kim', condition: 'Diabetes', risk: 'High' },
  ];
}
