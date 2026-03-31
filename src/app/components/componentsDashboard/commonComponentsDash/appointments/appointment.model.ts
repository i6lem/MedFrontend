export interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'confirmed';
  location?: string;
}