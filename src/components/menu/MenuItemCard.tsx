import Image from "next/image"
import { AddToCartButton } from "./AddToCartButton"
import type { MenuItem } from "@/types"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  return (
    <div
      className={`group flex flex-col bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:border-[#8C2C16]/30 ${!item.isAvailable ? "opacity-75" : ""
        }`}
    >
      {/* Image Container */}
      {/* صغرنا الارتفاع في الجوال (h-32) وكبرناه للشاشات الأكبر (sm:h-56) */}
      <div className="relative w-full h-32 xs:h-40 sm:h-56 bg-gray-50 overflow-hidden">
        <Image
          src={item.image || "/placeholder.jpg"}
          alt={item.name}
          fill
          className={`object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${!item.isAvailable ? "grayscale" : ""
            }`}
          // تعديل الـ sizes عشان الأداء يكون ممتاز مع عمودين في الجوال
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Badges Overlay */}
        {/* صغرنا حجم الشارات في الجوال عشان ما تغطي الصورة */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex flex-col gap-1.5 sm:gap-2 z-10">
          {!item.isAvailable && (
            <span className="bg-red-600/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-md shadow-sm">
              Tükendi
            </span>
          )}
          {item.isAvailable && item.isNew && (
            <span className="bg-green-600/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-md shadow-sm">
              Yeni
            </span>
          )}
          {item.isAvailable && item.isPopular && (
            <span className="bg-[#F0A84D]/90 backdrop-blur-sm text-black text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-md shadow-sm">
              Popüler
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col justify-between flex-1 p-3 sm:p-5 lg:p-6">
        <div className="flex flex-col h-full">
          {/* Title & Price Header */}
          {/* ترتيب مرن: السعر ينزل تحت العنوان في الجوال، ويصير جنبه في الشاشات الكبيرة */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-1 sm:gap-4 mb-2">
            <h4 className="font-serif font-bold text-sm sm:text-xl lg:text-2xl text-gray-900 leading-tight line-clamp-2">
              {item.name}
            </h4>
            <span className="font-sans font-bold text-[#8C2C16] text-xs sm:text-lg whitespace-nowrap bg-[#F5E6E2] px-2 py-0.5 sm:px-3 sm:py-1 rounded-md sm:rounded-lg w-fit mt-1 sm:mt-0">
              ₺{item.price}
            </span>
          </div>

          {/* Description */}
          {/* سطر واحد في الجوال عشان ما يأخذ مساحة، وسطرين في الشاشات الكبيرة */}
          <p className="text-[11px] sm:text-[14px] text-gray-500 line-clamp-1 sm:line-clamp-2 leading-relaxed mb-3 sm:mb-6">
            {item.description}
          </p>
        </div>

        {/* Add To Cart Button */}
        <div className="mt-auto">
          <AddToCartButton item={item} />
        </div>
      </div>
    </div>
  )
}