import { db, storage } from '../config';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface Collection {
  id?: string;
  title: string;
  season: string;
  year: string;
  headline: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

export const collectionService = {
  async createCollection(collection: Omit<Collection, 'id'>, coverImageFile?: File, galleryFiles?: File[]): Promise<string> {
    let coverImageUrl = collection.coverImage;
    let galleryUrls = [...collection.galleryImages];

    if (coverImageFile) {
      const storageRef = ref(storage, `collections/${Date.now()}_${coverImageFile.name}`);
      await uploadBytes(storageRef, coverImageFile);
      coverImageUrl = await getDownloadURL(storageRef);
    }

    if (galleryFiles) {
      const uploadPromises = galleryFiles.map(async (file) => {
        const storageRef = ref(storage, `collections/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      });
      galleryUrls = await Promise.all(uploadPromises);
    }

    const docRef = await addDoc(collection(db, 'collections'), {
      ...collection,
      coverImage: coverImageUrl,
      galleryImages: galleryUrls
    });

    return docRef.id;
  },

  async getCollections(): Promise<Collection[]> {
    const q = query(collection(db, 'collections'), orderBy('year', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Collection));
  },

  async getCollection(id: string): Promise<Collection | null> {
    const docRef = doc(db, 'collections', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Collection : null;
  },

  async updateCollection(id: string, collection: Partial<Collection>, coverImageFile?: File, galleryFiles?: File[]): Promise<void> {
    let coverImageUrl = collection.coverImage;
    let galleryUrls = collection.galleryImages ? [...collection.galleryImages] : undefined;

    if (coverImageFile) {
      const storageRef = ref(storage, `collections/${Date.now()}_${coverImageFile.name}`);
      await uploadBytes(storageRef, coverImageFile);
      coverImageUrl = await getDownloadURL(storageRef);
    }

    if (galleryFiles) {
      const uploadPromises = galleryFiles.map(async (file) => {
        const storageRef = ref(storage, `collections/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return getDownloadURL(storageRef);
      });
      galleryUrls = await Promise.all(uploadPromises);
    }

    const docRef = doc(db, 'collections', id);
    await updateDoc(docRef, {
      ...collection,
      ...(coverImageUrl && { coverImage: coverImageUrl }),
      ...(galleryUrls && { galleryImages: galleryUrls })
    });
  },

  async deleteCollection(id: string): Promise<void> {
    await deleteDoc(doc(db, 'collections', id));
  }
};