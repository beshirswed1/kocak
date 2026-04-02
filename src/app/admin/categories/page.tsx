"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Plus, Edit, Trash2 } from "lucide-react";

export default function AdminCategories() {
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
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Fetch Categories
    const unsubscribe = onSnapshot(collection(db, "categories"), async (snapshot) => {
      const catsList: { id: string, name: string }[] = [];
      snapshot.forEach((doc) => {
        catsList.push({ id: doc.id, name: doc.data().name });
      });

      // Auto-seed default categories if database is completely empty
      if (catsList.length === 0 && !loading) {
        const defaultCats = ["Ana Yemekler", "Başlangıçlar", "Ara Sıcaklar", "Tatlılar", "İçecekler"];
        try {
          // Add them in background to permanently save the categories in Firestore!
          for (const catName of defaultCats) {
            addDoc(collection(db, "categories"), { name: catName }).catch(console.warn);
          }
        } catch (e) {
          console.warn("Seeding failed", e);
        }
      } else {
        setCategories(catsList);
        setLoading(false);
      }
    }, (error) => {
      console.warn("Firestore error:", error);
      setLoading(false);
    });

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setName("");
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (cat: { id: string, name: string }) => {
    setEditingId(cat.id);
    setName(cat.name);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string, catName: string) => {
    if (window.confirm(`'${catName}' kategorisini silmek istediğinize emin misiniz?`)) {
      await deleteDoc(doc(db, "categories", id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);

    try {
      // REAL DATABASE SAVE (Garantili Kayıt) - Await to ensure we strictly save to connected Firestore!
      if (editingId) {
        await updateDoc(doc(db, "categories", editingId), { name });
      } else {
        await addDoc(collection(db, "categories"), { name });
      }

      setIsModalOpen(false);
      resetForm();
      showNotification('success', editingId ? 'Kategori başarıyla güncellendi!' : 'Yeni kategori eklendi!');
    } catch (error: any) {
      console.error("Error saving category:", error);
      showNotification('error', `Hata: ${error.message || "İnternet bağlantınız koptu, tekrar deneyin."}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
        {/* قسم النصوص */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Kategori Yönetimi
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Ürün kategorilerini ekleyin veya düzenleyin.
          </p>
        </div>

        {/* زر الإضافة */}
        <button
          onClick={openAddModal}
          className="bg-primary text-white px-4 py-3 sm:py-2 rounded-xl sm:rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all duration-200 shadow-sm active:scale-95 w-full sm:w-auto font-medium"
        >
          <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
          Yeni Kategori Ekle
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-4 font-medium">Kategori Adı</th>
                <th className="px-6 py-4 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} className="text-center py-12">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg className="animate-spin h-6 w-6 text-primary mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Kategoriler Yükleniyor...
                    </div>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={2} className="text-center py-8 text-gray-500">Henüz kategori eklenmemiş. Lütfen ekleyin.</td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="border-t border-gray-100 hover:bg-gray-50/50">
                    <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 text-blue-500 hover:bg-blue-50 rounded transition"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
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
        <div className={`fixed top-4 right-4 z-[60] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transform transition-all duration-300 animate-fade-in-up border ${notification.type === 'success' ? 'bg-green-50 text-green-800 border-green-200' : 'bg-red-50 text-red-800 border-red-200'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold font-serif text-primary">{editingId ? "Kategoriyi Düzenle" : "Yeni Kategori Ekle"}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori Adı <span className="text-red-500">*</span></label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Örn: Ana Yemekler" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">Vazgeç</button>
                <button type="submit" disabled={saving} className="px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition disabled:opacity-75 flex items-center gap-2">
                  {saving ? (
                    <><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Kaydediliyor...</>
                  ) : "Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
