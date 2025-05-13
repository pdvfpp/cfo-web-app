import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc
} from "firebase/firestore";
import { db } from "./firebase";

const mapsCol = collection(db, "maps");

// List all saved map names
export async function listMaps() {
  const snap = await getDocs(mapsCol);
  return snap.docs.map(d => d.id);
}

// Save or overwrite a map
export async function saveMap(name, shapeAlliances, allianceColors) {
  await setDoc(doc(mapsCol, name), { shapeAlliances, allianceColors });
}

// Load a named map
export async function loadMap(name) {
  const snap = await getDoc(doc(mapsCol, name));
  return snap.exists() ? snap.data() : null;
}

// Delete a map
export async function deleteMap(name) {
  await deleteDoc(doc(mapsCol, name));
}