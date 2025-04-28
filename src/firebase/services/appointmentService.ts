import { db } from '../config';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';

export interface Appointment {
  id?: string;
  name: string;
  email: string;
  date: string;
  time: string;
  purpose: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export const appointmentService = {
  async createAppointment(appointment: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointment,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    return docRef.id;
  },

  async getAppointments(): Promise<Appointment[]> {
    const q = query(collection(db, 'appointments'), orderBy('date', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
  },

  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    const q = query(
      collection(db, 'appointments'),
      where('date', '==', date),
      orderBy('time', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
  },

  async updateAppointmentStatus(id: string, status: Appointment['status'], notes?: string): Promise<void> {
    const docRef = doc(db, 'appointments', id);
    await updateDoc(docRef, { status, ...(notes && { notes }) });
  },

  async deleteAppointment(id: string): Promise<void> {
    await deleteDoc(doc(db, 'appointments', id));
  }
};