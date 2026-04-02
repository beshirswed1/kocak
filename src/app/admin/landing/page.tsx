"use client"

import { useState, useEffect } from "react"
import { useAppSelector } from "@/store/hooks"
import { db } from "@/lib/firebase"
import { doc, setDoc } from "firebase/firestore"
import { Store, MapPin, Share2, Clock, CheckCircle2, Loader2, Save } from "lucide-react"

// Helper Inputs
const Input = ({ label, value, onChange, type = "text", placeholder = "", dir = "ltr" }: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm" />
  </div>
)

const TextArea = ({ label, value, onChange, rows = 3, placeholder = "", dir="ltr" }: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
    <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir}
      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 outline-none focus:bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm leading-relaxed resize-none" />
  </div>
)

const Card = ({ title, icon: Icon, children }: any) => (
  <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 flex flex-col h-full hover:shadow-[0_4px_20px_-5px_rgba(6,81,237,0.15)] transition-shadow duration-300">
    <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-100/80">
      <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <h2 className="text-xl sm:text-2xl font-bold font-serif text-gray-900 tracking-tight">{title}</h2>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
)

export default function AdminLanding() {
  const info = useAppSelector((s) => s.restaurant.info)
  const map = useAppSelector((s) => s.restaurant.map)

  // ─── Form States ─────────────────────────
  const [infoForm, setInfoForm] = useState({
    name: "", slogan: "", description: "", phone: "", whatsapp: "", address: "",
    city: "", hours: "", rating: 0, reviewCount: 0, avgPrice: "",
    googleMapsUrl: "", googleMapsEmbed: "",
    instagram: "", facebook: "", tiktok: "", youtube: "",
  })

  // ─── Sync state from Redux ───────────────
  useEffect(() => {
    setInfoForm({
      name: info.name, slogan: info.slogan, description: info.description,
      phone: info.phone, whatsapp: info.whatsapp, address: info.address || map.address,
      city: info.city, hours: info.hours, rating: info.rating, reviewCount: info.reviewCount,
      avgPrice: info.avgPrice, googleMapsUrl: map.googleMapsUrl || info.googleMapsUrl, 
      googleMapsEmbed: map.googleMapsEmbed || info.googleMapsEmbed,
      instagram: info.socialMedia?.instagram || "", facebook: info.socialMedia?.facebook || "",
      tiktok: info.socialMedia?.tiktok || "", youtube: info.socialMedia?.youtube || "",
    })
  }, [info, map])

  // ─── Saving States ───────────────────────
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      // Save landing info
      await setDoc(doc(db, "settings", "landing"), {
        name: infoForm.name, slogan: infoForm.slogan, description: infoForm.description,
        phone: infoForm.phone, whatsapp: infoForm.whatsapp, address: infoForm.address,
        city: infoForm.city, hours: infoForm.hours, rating: Number(infoForm.rating),
        reviewCount: Number(infoForm.reviewCount), avgPrice: infoForm.avgPrice,
        socialMedia: {
          instagram: infoForm.instagram, facebook: infoForm.facebook,
          tiktok: infoForm.tiktok, youtube: infoForm.youtube,
        },
      }, { merge: true })

      // Save map
      await setDoc(doc(db, "settings", "map"), {
        address: infoForm.address, 
        googleMapsUrl: infoForm.googleMapsUrl,
        googleMapsEmbed: infoForm.googleMapsEmbed,
      }, { merge: true })

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: any) {
      console.warn("Update error:", e)
      alert(`Hata: ${e.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 bg-white p-6 sm:p-8 rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 relative overflow-hidden">
        {/* Background purely for aesthetics */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 w-full md:w-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-gray-900 tracking-tight text-center md:text-left">
            Restoran Ayarları
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-lg leading-relaxed text-center md:text-left">
            Buradan restoranınızın temel bilgilerini, iletişim kanallarını ve sosyal medya hesaplarını hızlı ve düzenli bir şekilde yönetebilirsiniz.
          </p>
        </div>

        <div className="relative z-10 w-full md:w-auto mt-4 md:mt-0">
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className={`w-full md:w-auto px-8 py-4 sm:py-3.5 rounded-2xl transition-all active:scale-95 disabled:opacity-75 font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-primary/20 text-sm sm:text-base ${
              saved ? "bg-green-500 hover:bg-green-600 shadow-green-500/20 text-white" : "bg-primary hover:bg-primary/90 text-white"
            }`}
          >
            {saving ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Kaydediliyor...</>
            ) : saved ? (
              <><CheckCircle2 className="w-5 h-5" /> Başarıyla kaydedildi!</>
            ) : (
              <><Save className="w-5 h-5" /> İçerikleri Kaydet</>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Kolon 1 */}
        <div className="space-y-6 sm:space-y-8">
          <Card title="Temel Bilgiler" icon={Store}>
            <Input label="Restoran Adı" value={infoForm.name} onChange={(v: string) => setInfoForm({...infoForm, name: v})} dir="auto" />
            <Input label="Kısa Slogan" value={infoForm.slogan} onChange={(v: string) => setInfoForm({...infoForm, slogan: v})} dir="auto" />
            <TextArea label="Hakkımızda / Kısaca İşletmeniz" value={infoForm.description} onChange={(v: string) => setInfoForm({...infoForm, description: v})} rows={5} dir="auto" />
          </Card>

          <Card title="Sosyal Medya Adresleri" icon={Share2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="Instagram" value={infoForm.instagram} onChange={(v: string) => setInfoForm({...infoForm, instagram: v})} placeholder="https://instagram.com/..." dir="ltr" />
              <Input label="Facebook" value={infoForm.facebook} onChange={(v: string) => setInfoForm({...infoForm, facebook: v})} placeholder="https://facebook.com/..." dir="ltr" />
              <Input label="TikTok" value={infoForm.tiktok} onChange={(v: string) => setInfoForm({...infoForm, tiktok: v})} placeholder="https://tiktok.com/@..." dir="ltr" />
              <Input label="YouTube" value={infoForm.youtube} onChange={(v: string) => setInfoForm({...infoForm, youtube: v})} placeholder="https://youtube.com/@..." dir="ltr" />
            </div>
          </Card>
        </div>

        {/* Kolon 2 */}
        <div className="space-y-6 sm:space-y-8">
          <Card title="İletişim & Konum" icon={MapPin}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="Telefon Numarası" value={infoForm.phone} onChange={(v: string) => setInfoForm({...infoForm, phone: v})} type="tel" dir="ltr" />
              <Input label="WhatsApp Numarası" value={infoForm.whatsapp} onChange={(v: string) => setInfoForm({...infoForm, whatsapp: v})} placeholder="905xxxxxxxxx" dir="ltr" />
            </div>
            <Input label="Şehir / Bölge" value={infoForm.city} onChange={(v: string) => setInfoForm({...infoForm, city: v})} dir="auto" />
            <TextArea label="Açık Adres" value={infoForm.address} onChange={(v: string) => setInfoForm({...infoForm, address: v})} rows={2} dir="auto" />
            
            <div className="pt-5 mt-3 border-t border-gray-100/80 space-y-5">
              <h3 className="text-sm font-bold text-gray-900 border-l-4 border-primary pl-3">Harita Yapılandırması</h3>
              <Input label="Yol Tarifi (Google Haritalar URL)" value={infoForm.googleMapsUrl} onChange={(v: string) => setInfoForm({...infoForm, googleMapsUrl: v})} placeholder="https://maps.app.goo.gl/..." dir="ltr" />
              <TextArea label="Web Sitesi Harita Kodu (Iframe Embed)" value={infoForm.googleMapsEmbed} onChange={(v: string) => setInfoForm({...infoForm, googleMapsEmbed: v})} rows={3} placeholder="<iframe src='...'></iframe>" dir="ltr" />
            </div>
          </Card>

          <Card title="Çalışma Saatleri & Puanlar" icon={Clock}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input label="Çalışma Saatleri" value={infoForm.hours} onChange={(v: string) => setInfoForm({...infoForm, hours: v})} placeholder="Örn: 11:00 - 01:00" dir="ltr" />
              <Input label="Fiyat Seviyesi" value={infoForm.avgPrice} onChange={(v: string) => setInfoForm({...infoForm, avgPrice: v})} placeholder="Örn: $$" dir="ltr" />
              <Input label="Google Puanı" value={infoForm.rating} onChange={(v: string) => setInfoForm({...infoForm, rating: Number(v)})} type="number" dir="ltr" />
              <Input label="Değerlendirme Sayısı" value={infoForm.reviewCount} onChange={(v: string) => setInfoForm({...infoForm, reviewCount: Number(v)})} type="number" dir="ltr" />
            </div>
          </Card>
        </div>

      </div>
    </div>
  )
}