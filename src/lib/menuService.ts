import { MenuItem } from "@/types";

/**
 * Our new strict Firebase-compatible MenuItem type based on the requirements.
 * This can live here or override the global types.
 */
export type FirebaseMenuItem = {
  id: string; // Keep ID for keys & unique references
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  isAvailable: boolean;
  isPopular: boolean;
  isNew: boolean;
};

/**
 * Fetch menu items from the primary data source.
 * This is currently an abstraction layer returning placeholder structured data.
 * Once Firebase is integrated, replace the contents of this function with Firestore queries.
 */
export async function getMenuItems(): Promise<FirebaseMenuItem[]> {
  // Simulate network delay for SSR data fetching demonstration
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Placeholder data that strictly follows the FirebaseMenuItem type.
  // This will be replaced by: 
  // const snapshot = await getDocs(collection(db, "menuItems"));
  // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FirebaseMenuItem));

  return [
    {
      id: "f1",
      name: "Çiğ Köfte",
      price: 230,
      description: "İnce bulgur, salça, patates, baharatlar ile özel hazırlanmış yöresel lezzet.",
      image: "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800",
      category: "Başlangıçlar",
      isAvailable: true,
      isPopular: true,
      isNew: false,
    },
    {
      id: "f2",
      name: "Beyran Çorbası",
      price: 395,
      description: "Günlük taze hazırlanan, kuzu eti ve pirinç ile sunulan özel şifa çorbası.",
      image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800",
      category: "Çorbalar",
      isAvailable: true,
      isPopular: true,
      isNew: false,
    },
    {
      id: "f3",
      name: "Soğan Kebabı",
      price: 550,
      description: "Kuzu kıyma, kuzu kuyruk yağı, kışlık kuru soğan ve nar ekşisi ile.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
      category: "Ana Yemekler",
      isAvailable: true,
      isPopular: true,
      isNew: true,
    },
    {
      id: "f4",
      name: "Firik Pilavı",
      price: 155,
      description: "Özel firik buğdayından yapılan, dumanı üstünde yöresel pilav.",
      image: "https://images.unsplash.com/photo-1601314115166-f18731f49615?auto=format&fit=crop&q=80&w=800",
      category: "Pilavlar",
      isAvailable: false,
      isPopular: false,
      isNew: false,
    },
    {
      id: "f5",
      name: "Alinazik",
      price: 495,
      description: "Özenle hazırlanmış kuzu eti, közlenmiş patlıcan ve sarımsaklı yoğurt uyumu.",
      image: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800",
      category: "Ana Yemekler",
      isAvailable: true,
      isPopular: true,
      isNew: false,
    }
  ];
}
