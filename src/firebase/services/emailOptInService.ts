import { db } from '../config';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';

export interface EmailOptIn {
  id?: string;
  email: string;
  createdAt: string;
}

export const emailOptInService = {
  async addEmail(email: string): Promise<string> {
    // Check if email already exists
    const q = query(collection(db, 'emailOptIns'), where('email', '==', email));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      throw new Error('Email already subscribed');
    }

    const docRef = await addDoc(collection(db, 'emailOptIns'), {
      email,
      createdAt: new Date().toISOString()
    });

    return docRef.id;
  },

  async getEmails(): Promise<EmailOptIn[]> {
    const q = query(collection(db, 'emailOptIns'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as EmailOptIn));
  }
};