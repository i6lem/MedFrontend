import { Component } from '@angular/core';

/** Route : `/doctor/documents` — menu : Documents */
@Component({
  selector: 'app-doctor-documents',
  templateUrl: './doctor-documents.component.html',
  standalone: false,
})
export class DoctorDocumentsComponent {
  documents = [
    { name: 'Blood-test-JohnSmith.pdf', type: 'Lab result', updatedAt: '2026-03-29' },
    { name: 'MRI-MariaGarcia.pdf', type: 'Imaging', updatedAt: '2026-03-21' },
  ];
}
