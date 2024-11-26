# LabMobile9_Rifqi-Alrasid_C
tugas ke-9 dan ke-10

# Autentikasi Login dengan Google
Langkah-Langkah:
Konfigurasi Firebase:

Buat proyek di Firebase Console dan aktifkan Google Authentication pada menu Authentication > Sign-in Methods.
Salin Client ID dari menu Google API Console.
Inisialisasi Firebase:

Tambahkan konfigurasi Firebase di file firebase.ts:
typescript
Copy code
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_auth_domain",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_sender_id",
    appId: "your_app_id"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
Implementasi Login:

Gunakan package @codetrix-studio/capacitor-google-auth untuk mengintegrasikan autentikasi Google.
Tambahkan fungsi login pada file auth.ts:
typescript
Copy code
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

const loginWithGoogle = async () => {
    await GoogleAuth.initialize({
        clientId: 'your_client_id',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
    });

    const googleUser = await GoogleAuth.signIn();
    const idToken = googleUser.authentication.idToken;

    const credential = GoogleAuthProvider.credential(idToken);
    const result = await signInWithCredential(auth, credential);

    console.log('Logged in as:', result.user);
};
Logout:

typescript
Copy code
const logout = async () => {
    await signOut(auth);
    await GoogleAuth.signOut();
};
Menampilkan Profil Pengguna:

Informasi pengguna seperti displayName, email, dan photoURL dapat diakses melalui objek user yang diperoleh setelah login.

# SCREENSHOT APLIKASI
![Screenshot 2024-11-26 234344](https://github.com/user-attachments/assets/6890df72-c54c-41e3-97c0-1dd2eb8e6a1b)
![Screenshot 2024-11-26 234108](https://github.com/user-attachments/assets/c04fbfcf-014b-4d62-9187-278c7116b515)
![Screenshot 2024-11-26 234121](https://github.com/user-attachments/assets/dcfeff08-4670-45da-b538-cc5b7bdaa278)
![Screenshot 2024-11-26 234237](https://github.com/user-attachments/assets/ee8906dc-e55c-45e9-9f97-7e9b0238812d)
![Screenshot 2024-11-26 234315](https://github.com/user-attachments/assets/a2b1acd4-9488-4fb9-8db4-43ac129f3f28)
![Screenshot 2024-11-26 234330](https://github.com/user-attachments/assets/90c646e7-4f63-49e3-bd6a-cca3a79923fe)

# SCREENSHOT CRUD BESERTA PENJELASAN
Konfigurasi Firestore
Sebelum memulai CRUD, konfigurasi Firestore dilakukan di file firebase.ts:

typescript
Copy code
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "your_api_key",
    authDomain: "your_auth_domain",
    projectId: "your_project_id",
    storageBucket: "your_storage_bucket",
    messagingSenderId: "your_sender_id",
    appId: "your_app_id",
};

// Inisialisasi Firebase
const firebase = initializeApp(firebaseConfig);

// Inisialisasi Firestore
const db = getFirestore(firebase);

export { db };

1. Create (Menambah Data)
   ![image](https://github.com/user-attachments/assets/0e088bb2-de67-4daf-9d7d-e89ed521d3d0)
- collection(db, 'todos'): Mengacu ke koleksi todos di Firestore.
- addDoc(todoRef, {...todo}): Menambahkan dokumen baru dengan data todo.
- Timestamp.now(): Menyimpan waktu saat data ditambahkan untuk referensi waktu.

2. Read (Membaca Data)
   ![image](https://github.com/user-attachments/assets/217f8829-b161-43c0-b753-e0404142fa9e)
- query(): Membuat query untuk memfilter atau mengurutkan data.
- orderBy('createdAt', 'desc'): Mengurutkan data berdasarkan waktu pembuatan secara menurun.
- snapshot.docs.map(): Mengakses data dan ID dari setiap dokumen dalam koleksi.

3. Update (Memperbarui Data)
   ![image](https://github.com/user-attachments/assets/b7075490-1fbc-459d-8721-8ac64637e89d)
- doc(db, 'todos', id): Mengacu pada dokumen tertentu berdasarkan ID.
- updateDoc(todoDoc, {...updatedTodo}): Memperbarui data di dokumen yang ditentukan.

4. Delete (Menghapus Data)
   ![image](https://github.com/user-attachments/assets/4e670cf1-2e70-433e-9cef-f8e025f156c2)
- deleteDoc(todoDoc): Menghapus dokumen dari Firestore.
- Operasi ini bersifat permanen dan tidak dapat dibatalkan.
