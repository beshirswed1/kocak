"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Utensils, Folders, FileText, LogOut, Loader2, ClipboardList } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const info = useAppSelector((s) => s.restaurant.info);
  const pendingCount = useAppSelector((s) => s.orders.orders.filter((o) => o.status === "pending").length);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser && pathname !== "/admin/login") {
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  // If on login page, don't wait for auth state to show the form to avoid slowness
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // حالة التحميل (Loading State) - متجاوبة للجوال واللابتوب
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Skeleton Sidebar - Desktop Only */}
        <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col animate-pulse">
          <div className="p-6 border-b border-gray-100 h-20"></div>
          <div className="flex-1 p-4 space-y-4 mt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-gray-100 rounded-xl"></div>
            ))}
          </div>
        </aside>

        {/* Skeleton Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center bg-gray-50 w-full">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <div className="text-gray-500 font-medium animate-pulse">
            Sistem Yükleniyor...
          </div>
        </main>
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by useEffect
  }



  const navItems = [
    { label: "Dashboard", mobileLabel: "Panel", icon: LayoutDashboard, href: "/admin" },
    { label: "Siparişler", mobileLabel: "Sipariş", icon: ClipboardList, href: "/admin/orders", badge: pendingCount },
    { label: "Ürünler", mobileLabel: "Ürünler", icon: Utensils, href: "/admin/menu" },
    { label: "Kategoriler", mobileLabel: "Kategori", icon: Folders, href: "/admin/categories" },
    { label: "Ana Sayfa Düzeni", mobileLabel: "Tasarım", icon: FileText, href: "/admin/landing" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* 1. TOP HEADER FOR MOBILE (Mobile Only) */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 px-4 py-3 flex items-center justify-between shadow-sm">
        <h2 className="text-xl font-bold font-serif text-primary">{info.name} Admin</h2>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          title="Çıkış Yap"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* 2. SIDEBAR FOR DESKTOP (Desktop Only) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 flex-col z-20 shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center h-20">
          <h2 className="text-2xl font-bold font-serif text-primary">{info.name} Admin</h2>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-gray-600 hover:bg-primary/10 hover:text-primary"
                  }`}
              >
                <item.icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                {item.label}
                {item.badge ? (
                  <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600'} animate-pulse`}>
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* 3. MAIN CONTENT AREA */}
      {/* في الجوال: نترك مساحة فوق (pt-20) وتحت (pb-24) عشان الشريط العلوي والسفلي */}
      {/* في اللابتوب: المحتوى ياخذ مساحته الطبيعية بدون مسافات إضافية */}
      <main className="flex-1 h-full overflow-y-auto w-full">
        <div className="p-4 pt-20 pb-24 md:p-8 md:pt-8 md:pb-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* 4. BOTTOM NAVIGATION FOR MOBILE (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 pb-safe shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center px-2 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-2xl transition-all duration-300 ${isActive
                    ? "text-primary"
                    : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 relative ${isActive ? "bg-primary/10" : ""}`}>
                  <item.icon className={`w-5 h-5 ${isActive ? "scale-110" : ""}`} />
                  {item.badge ? (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className={`text-[10px] font-semibold tracking-wide ${isActive ? "font-bold" : ""}`}>
                  {item.mobileLabel}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

    </div>
  );
}