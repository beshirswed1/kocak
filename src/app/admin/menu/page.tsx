"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FirebaseMenuItem } from "@/lib/menuService";
import { Plus, Edit, Trash2, Eye, EyeOff, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminMenu() {
  const [items, setItems] = useState<FirebaseMenuItem[]>([]);
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Custom Alert State
  const [notification, setNotification] = useState<{ show: boolean, type: 'success' | 'error', message: string }>({
    show: false,
    type: 'success',
    message: ''
  });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
    isAvailable: true,
    isPopular: false,
    isNew: false
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Fetch Items
    const unsubscribeItems = onSnapshot(collection(db, "menuItems"), (snapshot) => {
      const itemsList: FirebaseMenuItem[] = [];
      snapshot.forEach((doc) => {
        itemsList.push({ id: doc.id, ...doc.data() } as FirebaseMenuItem);
      });
      setItems(itemsList);
      setLoading(false);
    }, (error) => {
      console.warn("Firestore error (items):", error);
      setLoading(false);
    });

    const unsubscribeCats = onSnapshot(collection(db, "categories"), (snapshot) => {
      const catsList: { id: string, name: string }[] = [];
      snapshot.forEach((doc) => {
        catsList.push({ id: doc.id, name: doc.data().name });
      });

      // Auto-seed default categories if database is completely empty
      if (catsList.length === 0 && !loading) {
        const defaultCats = ["Ana Yemekler", "Başlangıçlar", "Ara Sıcaklar", "Tatlılar", "İçecekler"];
        for (const catName of defaultCats) {
          addDoc(collection(db, "categories"), { name: catName }).catch(console.warn);
        }
      } else {
        setCategories(catsList);
      }
    }, (error) => {
      console.warn("Firestore error (cats):", error);
    });

    // Timeout safety fallback
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timeout);
      unsubscribeItems();
      unsubscribeCats();
    };
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      image: "",
      category: categories[0]?.name || "Ana Yemekler",
      isAvailable: true,
      isPopular: false,
      isNew: false
    });
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (item: FirebaseMenuItem) => {
    setEditingId(item.id);
    setFormData({
      ...item,
      price: item.price.toString()
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      await deleteDoc(doc(db, "menuItems", id));
    }
  };

  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    await updateDoc(doc(db, "menuItems", id), {
      isAvailable: !currentStatus
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      let finalImageUrl = formData.image;
      if (!finalImageUrl) {
        finalImageUrl = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80";
      }

      const itemData = {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        image: finalImageUrl,
        category: formData.category,
        isAvailable: formData.isAvailable,
        isPopular: formData.isPopular,
        isNew: formData.isNew
      };

      // REAL DATABASE SAVE (Garantili Kayıt) - Await to ensure we strictly save to connected Firestore!
      if (editingId) {
        await updateDoc(doc(db, "menuItems", editingId), itemData);
      } else {
        await addDoc(collection(db, "menuItems"), itemData);
      }

      setIsModalOpen(false);
      resetForm();
      showNotification('success', editingId ? 'Ürün başarıyla güncellendi!' : 'Ürün başarıyla yayımlandı!');
    } catch (error: any) {
      console.error("Error saving item:", error);
      showNotification('error', `Veritabanı Hatası: ${error.message || "İnternet bağlantınızı veya Firebase izinlerinizi kontrol edin."}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h1>
          <p className="text-gray-500 text-sm mt-1">İlgili ürünleri ekleyin, güncelleyin veya silin.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition"
        >
          <Plus className="w-4 h-4" />
          Yeni Ürün Ekle
        </button>
      </div>

      {/* Item List */}
      {/* Item List — Responsive */}

      {/* Mobile: Cards (< 640px) */}
      <div className="flex flex-col gap-2.5 sm:hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
            ) : items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Henüz ürün eklenmemiş.</div>
            ) : (
            items.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-3.5 flex items-center gap-3.5 hover:bg-gray-50/50 transition">

              {/* Thumbnail */}
              <div className="w-[52px] h-[52px] min-w-[52px] rounded-lg overflow-hidden relative bg-gray-100 border border-gray-200">
                {item.image
                  ? <Image src={item.image} alt={item.name} fill className="object-cover" sizes="52px" />
                  : <ImageIcon className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                }
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-gray-500">{item.price} ₺</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">{item.category}</span>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.isAvailable ? 'Satışta' : 'Tükendi/Gizli'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button onClick={() => handleToggleAvailability(item.id, item.isAvailable)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition text-gray-500"
                  title={item.isAvailable ? 'إخفاء' : 'إظهار'}>
                  {item.isAvailable ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button onClick={() => openEditModal(item)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-50 transition text-blue-500">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition text-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            ))
  )}
          </div>

{/* Tablet / Desktop: Table (≥ 640px) */}
        <div className="hidden sm:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">

              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-6 py-4 font-medium">Görsel</th>
                  <th className="px-6 py-4 font-medium">Ürün Adı</th>
                  <th className="px-6 py-4 font-medium">Fiyat</th>
                  <th className="px-6 py-4 font-medium">Kategori</th>
                  <th className="px-6 py-4 font-medium">Durum</th>
                  <th className="px-6 py-4 font-medium text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg className="animate-spin h-6 w-6 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Ürünler Yükleniyor...
                      </div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">Henüz ürün eklenmemiş.</td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                      <td className="px-6 py-3">
                        <div className="h-12 w-12 rounded-lg overflow-hidden relative bg-gray-100 border border-gray-200">
                          {item.image ? (
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                          ) : (
                            <ImageIcon className="w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-3 font-medium text-gray-900">{item.name}</td>
                      <td className="px-6 py-3">{item.price} ₺</td>
                      <td className="px-6 py-3">{item.category}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {item.isAvailable ? "Satışta" : "Tükendi/Gizli"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleAvailability(item.id, item.isAvailable)}
                            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition"
                            title={item.isAvailable ? "Gizle" : "Göster"}
                          >
                            {item.isAvailable ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* Custom SweetAlert-like Notification Toast */}
        {notification.show && (
          <div className={`fixed top-4 right-4 z-[60] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 animate-fade-in-up border ${
            notification.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
          }`}>
            {notification.type === 'success' ? (
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            )}
            <span className="font-semibold text-sm">{notification.message}</span>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden my-auto border border-gray-200">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-xl font-bold font-serif text-primary">{editingId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h2>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition">
                  <X_Icon />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Ürün Adı <span className="text-red-500">*</span></label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Örn: Lahmacun" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Fiyat (₺) <span className="text-red-500">*</span></label>
                    <input required type="number" step="0.5" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} placeholder="0.00" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori Seçimi <span className="text-red-500">*</span></label>
                    <select required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all">
                      {categories.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Görsel Linki (URL)</label>
                    <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} placeholder="https://ornek.com/resim.jpg" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
                    <p className="text-xs text-gray-500 mt-1.5">Resim adresini (postimages.org vb.) buraya yapıştırın.</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Ürün Açıklaması (İçindekiler vb.)</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Yemeğin içeriği ve detayları..." className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"></textarea>
                </div>

                <div className="flex flex-wrap gap-6 items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 flex items-center justify-center rounded border ${formData.isAvailable ? 'bg-primary border-primary' : 'bg-white border-gray-300'}`}>
                      <input type="checkbox" checked={formData.isAvailable} onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })} className="hidden" />
                      {formData.isAvailable && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition">Satışta (Görünür)</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 flex items-center justify-center rounded border ${formData.isPopular ? 'bg-orange-500 border-orange-500' : 'bg-white border-gray-300'}`}>
                      <input type="checkbox" checked={formData.isPopular} onChange={e => setFormData({ ...formData, isPopular: e.target.checked })} className="hidden" />
                      {formData.isPopular && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-sm font-bold text-gray-700 group-hover:text-orange-500 transition text-orange-600">Popüler Ürün</span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 flex items-center justify-center rounded border ${formData.isNew ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}>
                      <input type="checkbox" checked={formData.isNew} onChange={e => setFormData({ ...formData, isNew: e.target.checked })} className="hidden" />
                      {formData.isNew && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-sm font-bold text-gray-700 group-hover:text-green-500 transition text-green-600">Yeni Ürün</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">Vazgeç</button>
                  <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition disabled:opacity-75 flex items-center gap-2">
                    {isSaving ? (
                      <><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Kaydediliyor...</>
                    ) : "Ürünü Kaydet"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
}

// Simple X Icon component inline
function X_Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
