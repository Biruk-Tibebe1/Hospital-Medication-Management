export interface Medication {
  id: string;
  name: string;
  generic_name?: string;
  dosage_form: string;
  strength: string;
  manufacturer?: string;
  description?: string;
  side_effects?: string[];
  contraindications?: string[];
  created_at: string;
  updated_at: string;
}

export interface MedicationPrescription {
  id: string;
  patient_id: string;
  medication_id: string;
  doctor_id: string;
  dosage: string;
  frequency: string;
  route: 'oral' | 'injection' | 'topical' | 'inhalation' | 'other';
  start_date: string;
  end_date?: string;
  instructions?: string;
  status: 'active' | 'completed' | 'discontinued';
  created_at: string;
  updated_at: string;
}

export interface MedicationAdministration {
  id: string;
  prescription_id: string;
  nurse_id: string;
  scheduled_time: string;
  administered_time?: string;
  dosage_given?: string;
  status: 'scheduled' | 'administered' | 'missed' | 'refused';
  notes?: string;
  side_effects_observed?: string;
  created_at: string;
  updated_at: string;
}