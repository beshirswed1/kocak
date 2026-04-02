"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import {
  updateInfo,
  updateHero,
  updateAbout,
  updateVideo,
  updateCta,
  updateSeo,
  updateMap,
  setMenuCategories,
} from "@/store/slices/restaurantSlice";
import { setOrders } from "@/store/slices/ordersSlice";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, collection, query, orderBy } from "firebase/firestore";
import type { MenuCategory, MenuItem, Order } from "@/types";

export function FirebaseSyncProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 1. Listen to Landing Info (basic restaurant info)
    const unsubInfo = onSnapshot(doc(db, "settings", "landing"), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        dispatch(updateInfo({
          name: data.name,
          slogan: data.slogan,
          description: data.description,
          phone: data.phone,
          whatsapp: data.whatsapp,
          address: data.address,
          ...(data.city && { city: data.city }),
          ...(data.rating && { rating: data.rating }),
          ...(data.reviewCount && { reviewCount: data.reviewCount }),
          ...(data.avgPrice && { avgPrice: data.avgPrice }),
          ...(data.hours && { hours: data.hours }),
          ...(data.googleMapsUrl && { googleMapsUrl: data.googleMapsUrl }),
          ...(data.googleMapsEmbed && { googleMapsEmbed: data.googleMapsEmbed }),
          ...(data.services && { services: data.services }),
          ...(data.socialMedia && { socialMedia: data.socialMedia }),
        }));
      }
    });

    // 2. Listen to Hero content
    const unsubHero = onSnapshot(doc(db, "settings", "hero"), (docSnap) => {
      if (docSnap.exists()) {
        dispatch(updateHero(docSnap.data()));
      }
    });

    // 3. Listen to About content
    const unsubAbout = onSnapshot(doc(db, "settings", "about"), (docSnap) => {
      if (docSnap.exists()) {
        dispatch(updateAbout(docSnap.data()));
      }
    });

    // 4. Listen to Video config
    const unsubVideo = onSnapshot(doc(db, "settings", "video"), (docSnap) => {
      if (docSnap.exists()) {
        dispatch(updateVideo(docSnap.data()));
      }
    });

    // 5. Listen to CTA content
    const unsubCta = onSnapshot(doc(db, "settings", "cta"), (docSnap) => {
      if (docSnap.exists()) {
        dispatch(updateCta(docSnap.data()));
      }
    });

    // 6. Listen to SEO config
    const unsubSeo = onSnapshot(doc(db, "settings", "seo"), (docSnap) => {
      if (docSnap.exists()) {
        dispatch(updateSeo(docSnap.data()));
      }
    });

    // 7. Listen to Map config
    const unsubMap = onSnapshot(doc(db, "settings", "map"), (docSnap) => {
      if (docSnap.exists()) {
        dispatch(updateMap(docSnap.data()));
      }
    });

    // 8. Listen to Categories & Menu Items
    const unsubCats = onSnapshot(collection(db, "categories"), (catSnap) => {
      const dbCategories: {id: string, name: string}[] = [];
      catSnap.forEach(c => dbCategories.push({ id: c.id, name: c.data().name }));

      const unsubItems = onSnapshot(collection(db, "menuItems"), (itemSnap) => {
        const allItems: MenuItem[] = [];
        itemSnap.forEach(d => allItems.push({ id: d.id, ...d.data() } as MenuItem));

        const availableItems = allItems.filter(i => i.isAvailable);

        const menuPayload: MenuCategory[] = [];
        
        dbCategories.forEach(cat => {
          const matchingItems = availableItems.filter(i => i.category === cat.name);
          if (matchingItems.length > 0) {
            menuPayload.push({
              id: cat.id,
              label: cat.name,
              items: matchingItems
            });
          }
        });

        const knownCatNames = dbCategories.map(c => c.name);
        const orphanItems = availableItems.filter(i => !knownCatNames.includes(i.category));
        if (orphanItems.length > 0) {
          menuPayload.push({
            id: "other",
            label: "Diğer Lezzetler",
            items: orphanItems
          });
        }

        const popularAndNewItems = allItems.filter(i => i.isPopular || i.isNew);
        popularAndNewItems.forEach(item => {
          const catEntry = menuPayload.find(c => c.label === item.category);
          if (catEntry) {
            const exists = catEntry.items.find(i => i.id === item.id);
            if (!exists) catEntry.items.push(item);
          } else {
            menuPayload.push({
              id: item.category || "featured",
              label: item.category || "Özel Ürünler",
              items: [item]
            });
          }
        });

        dispatch(setMenuCategories(menuPayload));
      });

      return () => unsubItems();
    });

    // 9. Listen to Orders (real-time for admin dashboard)
    const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsubOrders = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData: Order[] = [];
      snapshot.forEach((d) => {
        ordersData.push({ id: d.id, ...d.data() } as Order);
      });
      dispatch(setOrders(ordersData));
    });

    return () => {
      unsubInfo();
      unsubHero();
      unsubAbout();
      unsubVideo();
      unsubCta();
      unsubSeo();
      unsubMap();
      unsubCats();
      unsubOrders();
    };
  }, [dispatch]);

  return null;
}
