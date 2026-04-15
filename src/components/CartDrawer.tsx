"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCartOpen, updateQuantity, removeFromCart, clearCart } from "@/store/slices/cartSlice";
import { X, Minus, Plus, Trash2, ShoppingBag, Loader2, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";


export function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const info = useAppSelector((state) => state.restaurant.info);
  const [tableNumber, setTableNumber] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", minimumFractionDigits: 0 }).format(price);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleCheckout = async () => {
    if (!tableNumber.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);

    try {
      const { orderService } = await import("@/services/orderService");
      
      const orderItems = items.map(i => ({
        id: i.id,
        name: i.name,
        price: i.price,
        image: i.image || "",
        quantity: i.quantity
      }));
      
      await orderService.submitOrder({
        items: orderItems,
        tableNumber: tableNumber.trim(),
        note: note.trim(),
        totalPrice
      });
      
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        dispatch(clearCart());
        dispatch(setCartOpen(false));
        setTableNumber("");
        setNote("");
      }, 3000);
    } catch (err: any) {
      console.error("Sipariş gönderilirken hata oluştu:", err);
      // alert the specific error to help with debugging
      alert(`Siparişiniz gönderilirken bir hata oluştu: ${err.message || err.code || err}. Lütfen ekran görüntüsü alıp iletin.`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => dispatch(setCartOpen(false))} />
      <div className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-sm bg-background border-l border-border shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-serif font-bold text-lg">Sepetim ({totalItems})</h2>
          </div>
          <button onClick={() => dispatch(setCartOpen(false))} className="p-2 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center opacity-70">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">Sepetiniz Boş</p>
              <p className="text-sm text-muted-foreground">Menüden harika lezzetler ekleyebilirsiniz.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-card border border-border p-3 rounded-xl shadow-sm relative group">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm leading-tight pr-5">{item.name}</h3>
                    <button onClick={() => dispatch(removeFromCart(item.id))} className="text-muted-foreground hover:text-destructive absolute top-3 right-3 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="font-semibold text-primary text-sm mt-1">{formatPrice(item.price)}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-muted rounded-lg border border-border">
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className="p-1 hover:bg-black/5 active:scale-90 rounded-l-lg transition-all">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="p-1 hover:bg-black/5 active:scale-90 rounded-r-lg transition-all">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 bg-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground font-medium">Toplam Tutar:</span>
              <span className="text-2xl font-bold font-serif text-primary">{formatPrice(totalPrice)}</span>
            </div>
            
            {success ? (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl flex flex-col items-center justify-center gap-2 mb-4 animate-in fade-in zoom-in">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
                <p className="font-bold text-center">Siparişiniz Alındı!</p>
                <p className="text-sm text-center">Birazdan hazırlanmaya başlayacak.</p>
              </div>
            ) : (
              <div className="mb-4 space-y-3">
                <div>
                  <input 
                    type="text" 
                    placeholder="Masa Numarası (Örn: 5)" 
                    value={tableNumber}
                    onChange={(e) => {
                      setTableNumber(e.target.value);
                      setError(false);
                    }}
                    className={`w-full px-4 py-2 bg-background border ${error ? 'border-destructive ring-1 ring-destructive' : 'border-border'} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`}
                  />
                  {error && <p className="text-xs text-destructive mt-1 font-medium">Lütfen masa numarasını giriniz.</p>}
                </div>
                <div>
                  <textarea 
                    placeholder="Notunuz (İsteğe Bağlı) - Örn: Acısız olsun" 
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    rows={2}
                  />
                </div>
              </div>
            )}

            {!success && (
              <>
                <button 
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                  {loading ? "Gönderiliyor..." : "Siparişi Gönder"}
                </button>
                <button onClick={() => dispatch(clearCart())} className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-destructive font-medium transition-colors">
                  Sepeti Temizle
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
