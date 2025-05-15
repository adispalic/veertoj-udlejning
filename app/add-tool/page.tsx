'use client';
import { useEffect } from "react";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/app/lib/firebase";

export default function AddTool() {
  const [toolName, setToolName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log("Signed in anonymously");
      })
      .catch((error) => {
        console.error("Anonymous sign-in failed:", error);
      });
  }, []);

  const categories = [
    "Elværktøj",
    "Have- og Parkudstyr",
    "Transportudstyr",
    "Måleværktøj",
    "Slibe- og Skæreudstyr"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = "";
      if (image) {
        const storageRef = ref(storage, `tools/${image.name}`);
        const metadata = {
          contentType: image.type
        };
        const snapshot = await uploadBytes(storageRef, image, metadata);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "tools"), {
        name: toolName,
        category,
        price: Number(price),
        description,
        imageUrl,
        createdAt: new Date()
      });

      console.log("Submit virker", { toolName, category, price, description });
      
      alert("Værktøjet blev gemt!");
      setToolName("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImage(null);
    } catch (err) {
      console.error("Fejl ved oprettelse:", err);
      alert("Noget gik galt. Prøv igen.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4">Opret nyt værktøj</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Navn</label>
          <input
            type="text"
            value={toolName}
            onChange={(e) => setToolName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Kategori</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Vælg kategori</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Pris pr. dag (DKK)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Beskrivelse</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Billede</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full"
          />
        </div>

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Gem værktøj
        </button>
      </form>
    </div>
  );
}
