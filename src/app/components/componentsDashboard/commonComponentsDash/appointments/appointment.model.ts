export interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  date: Date | string;
  time: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  location: string;
}