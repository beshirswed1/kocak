"use client";

import { useState, useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import { MenuCategory } from "./MenuCategory";

/**
 * Client Component (Real-Time).
 * Uses Redux to get the universal realtime menu synced from Firebase.
 * Includes search & category filter functionality.
 */
export function MenuSection() {
  const menu = useAppSelector((state) => state.restaurant.menu);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Filter menu based on search query and active category
  const filteredMenu = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return menu
      .filter((category) => {
        if (activeCategory !== "all" && category.id !== activeCategory) return false;
        return true;
      })
      .map((category) => {
        if (!query) return category;
        const filteredItems = category.items.filter(
          (item) =>
            item.name.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query)
        );
        return { ...category, items: filteredItems };
      })
      .filter((category) => category.items.length > 0);
  }, [menu, searchQuery, activeCategory]);

  // Total filtered items count
  const totalResults = useMemo(
    () => filteredMenu.reduce((sum, cat) => sum + cat.items.length, 0),
    [filteredMenu]
  );

  const hasActiveFilter = searchQuery.trim() !== "" || activeCategory !== "all";

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden" id="firebase-menu">
      <div className="absolute inset-0 bg-slate-50/50 pointer-events-none dark:bg-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-medium shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            Canlı Menü
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground tracking-tight">
            Lezzet <span className="text-primary">Menümüz</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Özenle hazırladığımız eşsiz lezzetleri keşfedin. Siparişiniz saniyeler içinde mutfağımıza iletilir.
          </p>
        </div>

        {/* ── Search & Filter Bar ── */}
        {menu.length > 0 && (
          <div className="mb-10 md:mb-14 space-y-5 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>

            {/* Search Input */}
            <div className="relative max-w-2xl mx-auto group">
              <div className={`
                absolute inset-0 rounded-2xl transition-all duration-500
                ${isSearchFocused
                  ? "bg-gradient-to-r from-primary/20 via-[#F0A84D]/20 to-primary/20 blur-xl scale-105"
                  : "bg-transparent"
                }
              `} />
              <div className={`
                relative flex items-center bg-white dark:bg-gray-900 rounded-2xl border-2 transition-all duration-300 shadow-sm
                ${isSearchFocused
                  ? "border-primary/50 shadow-lg shadow-primary/10"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }
              `}>
                {/* Search Icon */}
                <div className="pl-4 sm:pl-5 pr-1 text-gray-400 transition-colors duration-300 group-focus-within:text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <input
                  type="text"
                  placeholder="Menüde ara... (örn: kebap, beyran, salata)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="flex-1 bg-transparent py-3.5 sm:py-4 px-3 text-sm sm:text-base text-foreground placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
                />

                {/* Clear Button */}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mr-3 sm:mr-4 p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-all duration-200 hover:scale-110 active:scale-95"
                    aria-label="Aramayı temizle"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {/* "All" pill */}
              <button
                onClick={() => setActiveCategory("all")}
                className={`
                  px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border-2
                  ${activeCategory === "all"
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-primary/40 hover:text-primary hover:shadow-md"
                  }
                `}
              >
                🍽️ Tümü
              </button>

              {menu.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id === activeCategory ? "all" : category.id)}
                  className={`
                    px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border-2
                    ${activeCategory === category.id
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105"
                      : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-primary/40 hover:text-primary hover:shadow-md"
                    }
                  `}
                >
                  {category.icon ? `${category.icon} ` : ""}{category.label}
                </button>
              ))}
            </div>

            {/* Active Filter Info / Result Count */}
            {hasActiveFilter && (
              <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground animate-fade-in-up">
                <span className="flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  <span><strong className="text-foreground">{totalResults}</strong> ürün bulundu</span>
                </span>
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                  className="text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            )}
          </div>
        )}

        {/* Menu Content */}
        <div className="menu-container w-full">
          {menu.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 px-4 bg-card/60 backdrop-blur-md rounded-3xl border border-border shadow-sm animate-pulse">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="text-7xl relative drop-shadow-xl transform transition-transform hover:scale-105">🍽️</div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-center">
                Menü Yükleniyor...
              </h3>
              <p className="text-muted-foreground text-center max-w-md md:text-lg">
                Lütfen bekleyin, en taze lezzetler sizin için özenle hazırlanıyor.
              </p>
            </div>
          ) : filteredMenu.length === 0 ? (
            /* No Results State */
            <div className="flex flex-col items-center justify-center py-20 px-4 bg-card/60 backdrop-blur-md rounded-3xl border border-border shadow-sm">
              <div className="text-6xl mb-5 animate-bounce" style={{ animationDuration: "2s" }}>🔍</div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 text-center">
                Sonuç Bulunamadı
              </h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                &ldquo;<strong>{searchQuery}</strong>&rdquo; ile eşleşen ürün bulunamadı. Farklı bir arama terimi deneyin.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                className="px-6 py-2.5 bg-primary text-white rounded-full font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Tüm Menüyü Göster
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-16 md:gap-24 w-full">
              {filteredMenu.map((category) => (
                <MenuCategory
                  key={category.id}
                  title={category.label}
                  items={category.items}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}