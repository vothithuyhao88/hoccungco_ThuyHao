import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut, 
  signInAnonymously,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  getDocFromServer,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";
import { UserProfile, Message, QuizQuestion, LessonChapter } from "../types";

const effectiveFirebaseConfig = firebaseConfig || {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

// Initialize Firebase App & Services
export const app = !getApps().length ? initializeApp(effectiveFirebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();


// Standard Error Handling Enum and Function required by Firebase skill
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test Connection
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"));
    console.log("Firestore connection test passed.");
  } catch (error) {
    if (error instanceof Error && error.message.includes("offline")) {
      console.warn("Firestore client is offline or network restricted.");
    }
  }
}

// --- USER AUTHENTICATION & PROFILES IN FIRESTORE ---

export async function saveUserProfileToFirestore(uid: string, profile: UserProfile, email?: string) {
  const userRef = doc(db, "users", uid);
  try {
    const dataToSave = {
      uid,
      fullName: profile.fullName,
      className: profile.className || "",
      role: profile.role,
      email: email || profile.email || "",
      teacherCode: profile.teacherCode || "",
      updatedAt: new Date().toISOString()
    };
    await setDoc(userRef, dataToSave, { merge: true });
    return dataToSave;
  } catch (err) {
    console.error("Error saving user profile to Firestore:", err);
    handleFirestoreError(err, OperationType.WRITE, `users/${uid}`);
  }
}

export async function getUserProfileFromFirestore(uid: string): Promise<UserProfile | null> {
  const userRef = doc(db, "users", uid);
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (err) {
    console.error("Error fetching user profile from Firestore:", err);
    return null;
  }
}

export const ADMIN_DEFAULT_PROFILE: UserProfile = {
  uid: "teacher_admin_thuyhao",
  fullName: "Cô Thuý Hào",
  role: "teacher",
  className: "Giáo viên Quản trị",
  email: "vothithuyhao88@gmail.com",
  teacherCode: "Thuyhao88@"
};

export function checkIsAdminCredentials(usernameInput: string, passwordInput: string): boolean {
  if (!usernameInput && !passwordInput) return false;
  
  const normUser = (usernameInput || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9@]/g, "");

  const cleanPass = (passwordInput || "").trim();

  const isUserMatch = 
    normUser === "thuyhao" ||
    normUser === "thuyhsoa" ||
    normUser === "cothuyhao" ||
    normUser === "cothuyhsoa" ||
    normUser === "admin" ||
    normUser === "thuyhao88" ||
    normUser === "thuyhsoa88" ||
    normUser === "cothuyhao88" ||
    normUser === "vothithuyhao" ||
    normUser === "vothithuyhao88" ||
    normUser === "vothithuyhao88@gmail.com" ||
    normUser === "clbanhsao1@gmail.com" ||
    normUser === "haotin10@gmail.com";

  const isPassMatch = 
    cleanPass === "Thuyhsoa88@" ||
    cleanPass === "thuyhsoa88@" ||
    cleanPass === "Thuyhsoa88" ||
    cleanPass === "thuyhsoa88" ||
    cleanPass === "Thuyhao88@" ||
    cleanPass === "thuyhao88@" ||
    cleanPass === "Thuyhao88" ||
    cleanPass === "thuyhao88" ||
    cleanPass === "Thuyhao@" ||
    cleanPass === "thuyhao@" ||
    cleanPass === "Thuyhao" ||
    cleanPass === "thuyhao" ||
    cleanPass === "Thuyhsoa" ||
    cleanPass === "thuyhsoa" ||
    cleanPass === "123456";

  // If password is the master teacher code Thuyhsoa88@ / Thuyhao88@ or username is Thuyhao/Thuyhsoa with valid pass
  return (
    (isUserMatch && isPassMatch) || 
    cleanPass === "Thuyhsoa88@" || 
    cleanPass === "thuyhsoa88@" ||
    cleanPass === "Thuyhao88@" || 
    cleanPass === "thuyhao88@"
  );
}

export async function registerWithEmailAndPassword(
  fullName: string,
  email: string,
  pass: string,
  role: "student" | "teacher",
  className?: string,
  teacherCode?: string
): Promise<UserProfile> {
  const isTeacherAccount = 
    role === "teacher" || 
    email.toLowerCase() === "vothithuyhao88@gmail.com" ||
    email.toLowerCase() === "clbanhsao1@gmail.com" || 
    email.toLowerCase() === "haotin10@gmail.com" || 
    pass === "Thuyhsoa88@" ||
    pass === "thuyhsoa88@" ||
    pass === "Thuyhao88@" ||
    pass === "thuyhao88@";

  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  const user = userCredential.user;

  const finalName = fullName || (isTeacherAccount ? "Cô Thuý Hào" : "Học sinh THPT");
  await updateProfile(user, { displayName: finalName });

  const profile: UserProfile = {
    uid: user.uid,
    fullName: finalName,
    email: user.email || email,
    role: isTeacherAccount ? "teacher" : "student",
    className: isTeacherAccount ? "Giáo viên Quản trị" : (className || "Khối Tin THPT"),
    teacherCode: isTeacherAccount ? (teacherCode || "Thuyhsoa88@") : undefined
  };

  await saveUserProfileToFirestore(user.uid, profile, email);
  return profile;
}

export async function loginWithEmailAndPassword(
  emailInput: string,
  pass: string
): Promise<UserProfile> {
  const rawInput = emailInput.trim();
  const cleanPass = pass.trim();

  // Instant Check for Admin Account: Thuyhao / Thuyhao88@
  if (checkIsAdminCredentials(rawInput, cleanPass)) {
    const adminProfile: UserProfile = { ...ADMIN_DEFAULT_PROFILE };
    
    // Save locally immediately so session is active without waiting for network
    localStorage.setItem("app_user_profile", JSON.stringify(adminProfile));

    // Asynchronous non-blocking Firebase synchronization in background
    (async () => {
      try {
        const targetEmail = "vothithuyhao88@gmail.com";
        let authUid = adminProfile.uid || "teacher_admin_thuyhao";

        if (!auth.currentUser || auth.currentUser.email !== targetEmail) {
          try {
            const cred = await signInWithEmailAndPassword(auth, targetEmail, cleanPass);
            authUid = cred.user.uid;
          } catch (signInErr: any) {
            try {
              const cred = await createUserWithEmailAndPassword(auth, targetEmail, cleanPass);
              authUid = cred.user.uid;
              await updateProfile(cred.user, { displayName: "Cô Thuý Hào" });
            } catch (_) {
              if (auth.currentUser) {
                authUid = auth.currentUser.uid;
              }
            }
          }
        } else {
          authUid = auth.currentUser.uid;
        }

        adminProfile.uid = authUid;
        await setDoc(doc(db, "users", authUid), {
          uid: authUid,
          fullName: "Cô Thuý Hào",
          className: "Giáo viên Quản trị",
          role: "teacher",
          email: targetEmail,
          teacherCode: "Thuyhao88@",
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (err) {
        console.warn("Background Firebase auth sync notice:", err);
      }
    })();

    return adminProfile;
  }

  // Normal Student / Other User Email Login
  let cleanUsername = rawInput.toLowerCase().replace(/[\s_.-]+/g, "");
  let normalizedEmail = rawInput.toLowerCase();
  if (!normalizedEmail.includes("@")) {
    normalizedEmail = `${cleanUsername}@thuyhao.edu.vn`;
  }

  let userCredential;
  try {
    userCredential = await signInWithEmailAndPassword(auth, normalizedEmail, pass);
  } catch (err: any) {
    const isUserNotFound = 
      err.code === "auth/user-not-found" || 
      err.code === "auth/invalid-credential" ||
      err.message?.includes("invalid-credential");
    
    if (isUserNotFound) {
      try {
        userCredential = await createUserWithEmailAndPassword(auth, normalizedEmail, pass);
        if (userCredential.user) {
          const displayName = rawInput || "Học sinh THPT";
          await updateProfile(userCredential.user, { displayName });
        }
      } catch (regErr: any) {
        throw regErr;
      }
    } else {
      throw err;
    }
  }

  const user = userCredential.user;
  let profile = await getUserProfileFromFirestore(user.uid);

  const defaultRole = "student";
  const defaultName = user.displayName || rawInput || "Học sinh THPT";
  const defaultClass = "Khối Tin THPT";

  if (!profile) {
    profile = {
      uid: user.uid,
      fullName: defaultName,
      email: user.email || normalizedEmail,
      role: defaultRole,
      className: defaultClass
    };
    await saveUserProfileToFirestore(user.uid, profile, user.email || normalizedEmail);
  }

  return profile;
}

// --- MESSAGES IN FIRESTORE ---

export async function saveMessageToFirestore(message: {
  id?: string;
  sender: "user" | "teacher";
  text: string;
  userId: string;
  userName?: string;
  userRole?: string;
  attachment?: any;
}) {
  const path = "messages";
  try {
    const docData = {
      sender: message.sender,
      text: message.text,
      userId: message.userId,
      userName: message.userName || "Học sinh",
      userRole: message.userRole || "student",
      attachment: message.attachment || null,
      timestamp: serverTimestamp(),
      createdAtIso: new Date().toISOString()
    };
    const colRef = collection(db, path);
    const docRef = await addDoc(colRef, docData);
    return docRef.id;
  } catch (err) {
    console.error("Error saving message to Firestore:", err);
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export function subscribeToMessages(userId: string, callback: (messages: Message[]) => void) {
  const path = "messages";
  try {
    const colRef = collection(db, path);
    // Listen to messages for this user or general teacher responses
    const q = query(colRef, where("userId", "==", userId), limit(100));
    
    return onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map((d) => {
        const data = d.data();
        let dateObj = new Date();
        if (data.timestamp && typeof data.timestamp.toDate === "function") {
          dateObj = data.timestamp.toDate();
        } else if (data.createdAtIso) {
          dateObj = new Date(data.createdAtIso);
        }
        return {
          id: d.id,
          sender: data.sender,
          text: data.text,
          timestamp: dateObj,
          attachment: data.attachment || undefined
        };
      });
      // Sort chronologically
      msgs.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      callback(msgs);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, path);
    });
  } catch (err) {
    console.error("Error subscribing to messages:", err);
    return () => {};
  }
}

// --- QUIZ RESULTS IN FIRESTORE ---

export interface QuizResultRecord {
  id?: string;
  userId: string;
  userName: string;
  userClass: string;
  score: number;
  totalQuestions: number;
  grade: string;
  topicId: string;
  createdAt?: string;
}

export async function saveQuizResultToFirestore(result: QuizResultRecord) {
  const path = "quiz_results";
  try {
    const colRef = collection(db, path);
    const docData = {
      ...result,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString()
    };
    const docRef = await addDoc(colRef, docData);
    return docRef.id;
  } catch (err) {
    console.error("Error saving quiz result to Firestore:", err);
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export function subscribeToQuizResults(callback: (results: QuizResultRecord[]) => void) {
  const path = "quiz_results";
  try {
    const colRef = collection(db, path);
    const q = query(colRef, limit(50));
    return onSnapshot(q, (snapshot) => {
      const records: QuizResultRecord[] = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      } as QuizResultRecord));
      records.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
      callback(records);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, path);
    });
  } catch (err) {
    console.error("Error subscribing to quiz results:", err);
    return () => {};
  }
}

// --- LESSON CHAPTERS IN FIRESTORE ---

export async function seedInitialChaptersToFirestore(chapters: LessonChapter[]) {
  const path = "lessons";
  try {
    const colRef = collection(db, path);
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) {
      console.log("Seeding initial chapters to Firestore...");
      for (const ch of chapters) {
        const docRef = doc(db, path, ch.id);
        await setDoc(docRef, {
          ...ch,
          createdAt: new Date().toISOString()
        });
      }
      console.log("Initial chapters seeded successfully.");
    }
  } catch (err) {
    console.error("Error seeding chapters to Firestore:", err);
  }
}

export function subscribeToLessons(callback: (lessons: LessonChapter[]) => void) {
  const path = "lessons";
  try {
    const colRef = collection(db, path);
    return onSnapshot(colRef, (snapshot) => {
      const lessons: LessonChapter[] = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
      } as LessonChapter));
      callback(lessons);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, path);
    });
  } catch (err) {
    console.error("Error subscribing to lessons:", err);
    return () => {};
  }
}

// --- GLOBAL AI CONFIG IN FIRESTORE (settings/ai_config) ---

export interface GlobalAIConfigRecord {
  apiKey: string;
  defaultModel?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export async function getGlobalAIConfigFromFirestore(): Promise<GlobalAIConfigRecord | null> {
  const docRef = doc(db, "settings", "ai_config");
  try {
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as GlobalAIConfigRecord;
    }
    return null;
  } catch (err) {
    console.warn("Could not fetch global AI config from Firestore:", err);
    return null;
  }
}

export async function saveGlobalAIConfigToFirestore(data: {
  apiKey: string;
  defaultModel?: string;
  updatedBy?: string;
}): Promise<void> {
  const docRef = doc(db, "settings", "ai_config");
  const path = "settings/ai_config";
  try {
    const payload: GlobalAIConfigRecord = {
      apiKey: data.apiKey.trim(),
      defaultModel: data.defaultModel || "gemini-2.5-flash",
      updatedBy: data.updatedBy || auth.currentUser?.email || auth.currentUser?.uid || "Admin",
      updatedAt: new Date().toISOString()
    };
    await setDoc(docRef, payload, { merge: true });
  } catch (err) {
    console.error("Error saving global AI config to Firestore:", err);
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

