export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  medical_record_number: string;
  room_number?: string;
  bed_number?: string;
  admission_date: string;
  discharge_date?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  allergies?: string[];
  medical_conditions?: string[];
  status: 'admitted' | 'discharged' | 'transferred';
  created_at: string;
  updated_at: string;
}