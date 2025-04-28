import { db, storage } from '../config';
import { collection, addDoc, getDocs, getDoc, doc, updateDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  author: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  destination: 'press' | 'journal';
}

const DEFAULT_IMAGE = 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg';

export const blogService = {
  async createPost(post: Omit<BlogPost, 'id'>, imageFile?: File): Promise<string> {
    try {
      let imageUrl = post.image || DEFAULT_IMAGE;

      if (imageFile) {
        // Create a unique filename with timestamp and original name
        const timestamp = Date.now();
        const filename = `blog/${timestamp}_${imageFile.name}`;
        const storageRef = ref(storage, filename);
        
        // Upload the file
        const uploadResult = await uploadBytes(storageRef, imageFile);
        
        // Get the download URL
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      // Create the post document
      const docRef = await addDoc(collection(db, 'posts'), {
        ...post,
        image: imageUrl,
        date: new Date().toISOString()
      });

      return docRef.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  async getPosts(): Promise<BlogPost[]> {
    const q = query(collection(db, 'posts'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  },

  async getPostsByDestination(destination: 'press' | 'journal'): Promise<BlogPost[]> {
    const q = query(
      collection(db, 'posts'),
      where('destination', '==', destination)
    );
    
    try {
      const snapshot = await getDocs(q);
      // Sort the results in memory instead of using orderBy
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
      return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  async getPost(id: string): Promise<BlogPost | null> {
    const docRef = doc(db, 'posts', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as BlogPost : null;
  },

  async updatePost(id: string, post: Partial<BlogPost>, imageFile?: File): Promise<void> {
    try {
      let imageUrl = post.image;

      if (imageFile) {
        // Create a unique filename with timestamp and original name
        const timestamp = Date.now();
        const filename = `blog/${timestamp}_${imageFile.name}`;
        const storageRef = ref(storage, filename);
        
        // Upload the new image
        const uploadResult = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      const docRef = doc(db, 'posts', id);
      await updateDoc(docRef, { 
        ...post, 
        ...(imageUrl && { image: imageUrl })
      });
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  async deletePost(id: string): Promise<void> {
    await deleteDoc(doc(db, 'posts', id));
  }
};