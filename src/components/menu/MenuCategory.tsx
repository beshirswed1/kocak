import { MenuItemCard } from "./MenuItemCard";
import type { MenuItem } from "@/types";

interface MenuCategoryProps {
  title: string;
  items: MenuItem[];
}

export function MenuCategory({ title, items }: MenuCategoryProps) {
  if (items.length === 0) return null;

  return (
    <section className="scroll-mt-24 mb-16" id={title.toLowerCase().replace(/\s+/g, '-')}>
      <h3 className="font-serif text-2xl font-bold mb-6 flex items-center gap-3 text-foreground">
        <span className="w-8 h-[2px] bg-primary/50"></span>
        {title}
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
        {items.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
