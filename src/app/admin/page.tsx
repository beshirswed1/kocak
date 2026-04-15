"use client";

import { useAppSelector } from "@/store/hooks";
const useDynamic = () => useAppSelector((s) => s.restaurant.info);
import { Utensils, Folders, FileText, Sparkles, ArrowRight, Activity, ClipboardList } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const info = useDynamic();
  const orders = useAppSelector(s => s.orders.items);
  const pendingOrders = orders.filter(o => o.status === "pending").length;
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("tr-TR", { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // إضافة تدرجات لونية فخمة لكل كرت
  const cards = [
    {
      title: "Sipariş Yönetimi",
      icon: ClipboardList,
      href: "/admin/orders",
      desc: "Gelen siparişleri görüntüle, onayla veya iptal et.",
      color: "from-red-500 to-rose-600",
      glow: "group-hover:shadow-red-500/20",
      badge: pendingOrders > 0 ? `${pendingOrders} Yeni` : undefined
    },
    {
      title: "Ürün Yönetimi",
      icon: Utensils,
      href: "/admin/menu",
      desc: "Menüdeki ürünleri ekle, düzenle veya sil. Lezzetleri yönetin.",
      color: "from-orange-500 to-red-600",
      glow: "group-hover:shadow-orange-500/20"
    },
    {
      title: "Kategori Yönetimi",
      icon: Folders,
      href: "/admin/categories",
      desc: "Ürün kategorilerini yönetin ve hiyerarşiyi kusursuzlaştırın.",
      color: "from-blue-500 to-indigo-600",
      glow: "group-hover:shadow-blue-500/20"
    },
    {
      title: "Ana Sayfa Düzeni",
      icon: FileText,
      href: "/admin/landing",
      desc: "Kampanyaları, popüler bölümünü ve metinleri anında yayınlayın.",
      color: "from-emerald-500 to-teal-600",
      glow: "group-hover:shadow-emerald-500/20"
    }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 relative w-full pb-10 z-0">
      {/* إضاءة محيطية في الخلفية للفخامة */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none -z-10 rounded-3xl blur-3xl" />

      {/* لوحة الترحيب الأسطورية (Hero Banner) */}
      <div className="relative overflow-hidden bg-[#0A0F1C] rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-800 p-5 sm:p-8 md:p-10 animate-fade-in-up">
        {/* تأثيرات إضاءة متحركة داخل اللوحة */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px] opacity-60 animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-blue-500/20 rounded-full blur-[60px] opacity-40" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="w-full md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 shadow-sm w-fit">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
              <span className="text-[10px] sm:text-xs font-semibold text-gray-300 tracking-[0.2em] uppercase">Sistem Aktif</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight mb-3">
              Hoş Geldiniz, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0A84D] to-primary">Yönetici</span>
            </h1>

            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
              {info.name} dijital komuta merkezindesiniz. Tüm operasyonları buradan bilimsel bir kesinlikle yönetebilirsiniz.
            </p>
          </div>

          {/* العنصر التقني (الساعة وحالة الاتصال) - يظهر بشكل أنيق في الجوال أيضاً */}
          <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end bg-white/5 backdrop-blur-md p-4 rounded-xl sm:rounded-2xl border border-white/10 w-full md:w-auto mt-2 md:mt-0 shadow-inner">
            <div className="flex items-center gap-2 mb-0 md:mb-1">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 animate-pulse" />
              <span className="text-gray-300 font-medium text-xs sm:text-sm">Canlı Bağlantı</span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-widest">
              {time || "Yükleniyor"}
            </div>
          </div>
        </div>
      </div>

      {/* شبكة الكروت التفاعلية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {cards.map((card, idx) => (
          <Link
            href={card.href}
            key={card.title}
            className={`group relative bg-white/80 backdrop-blur-xl p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden ${card.glow}`}
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            {/* تأثير الإضاءة الخلفية عند التمرير الماوس */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                {/* الأيقونة بحركتها الأسطورية */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br ${card.color} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <card.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-md" />
                </div>

                {/* سهم الدخول والبادج */}
                <div className="flex items-center gap-2">
                  {card.badge && (
                    <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-sm animate-pulse">
                      {card.badge}
                    </span>
                  )}
                  <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-2">
                  {card.desc}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}