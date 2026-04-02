"use client"

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCartOpen, updateQuantity, removeFromCart, clearCart } from "@/store/slices/cartSlice";
import { X, Minus, Plus, Trash2, ShoppingBag, Send, CheckCircle, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { submitOrder } from "@/lib/orderService";


export function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen } = useAppSelector((state) => state.cart);
  const [tableNumber, setTableNumber] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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

  // Reset success when cart opens
  useEffect(() => {
    if (isOpen) setSuccess(false);
  }, [isOpen]);

  const handleCheckout = async () => {
    if (!tableNumber.trim()) {
      setError(true);
      return;
    }
    setError(false);
    setSubmitting(true);

    try {
      await submitOrder({
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        tableNumber: tableNumber.trim(),
        note: note.trim(),
        totalPrice,
      });

      setSuccess(true);
      dispatch(clearCart());
      setTableNumber("");
      setNote("");

      // Auto-close after success
      setTimeout(() => {
        dispatch(setCartOpen(false));
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error("Sipariş gönderilemedi:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(setCartOpen(false))}
        aria-hidden="true"
      />
      <aside
        className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-sm bg-background border-l border-border shadow-2xl flex flex-col animate-slide-in-right"
        role="dialog"
        aria-label="Sipariş sepeti"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-serif font-bold text-lg">Sepetim ({totalItems})</h2>
          </div>
          <button
            onClick={() => dispatch(setCartOpen(false))}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Sepeti kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {/* Success state */}
          {success ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center animate-fade-in-up">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-scale-in">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <p className="text-xl font-bold text-green-700 mb-2">Sipariş Gönderildi!</p>
              <p className="text-sm text-muted-foreground">
                Siparişiniz mutfağa iletildi. Kısa süre içinde hazırlanacaktır.
              </p>
            </div>
          ) : items.length === 0 ? (
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
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-muted-foreground hover:text-destructive absolute top-3 right-3 transition-colors"
                      aria-label={`${item.name} ürününü kaldır`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="font-semibold text-primary text-sm mt-1">{formatPrice(item.price)}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-muted rounded-lg border border-border">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                        className="p-1 hover:bg-black/5 active:scale-90 rounded-l-lg transition-all"
                        aria-label={`${item.name} adetini azalt`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                        className="p-1 hover:bg-black/5 active:scale-90 rounded-r-lg transition-all"
                        aria-label={`${item.name} adetini artır`}
                      >
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
        {items.length > 0 && !success && (
          <div className="border-t border-border p-4 bg-card">
            <div className="flex justify-between items-center mb-4">
              <span className="text-muted-foreground font-medium">Toplam Tutar:</span>
              <span className="text-2xl font-bold font-serif text-primary">{formatPrice(totalPrice)}</span>
            </div>
            
            {/* Table Number */}
            <div className="mb-3">
              <label htmlFor="table-number" className="text-xs font-semibold text-muted-foreground mb-1 block">
                Masa Numarası *
              </label>
              <input 
                id="table-number"
                type="text" 
                placeholder="Örn: 5" 
                value={tableNumber}
                onChange={(e) => {
                  setTableNumber(e.target.value);
                  setError(false);
                }}
                className={`w-full px-4 py-2.5 bg-background border ${error ? 'border-destructive ring-1 ring-destructive' : 'border-border'} rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm`}
                aria-required="true"
                aria-invalid={error}
              />
              {error && <p className="text-xs text-destructive mt-1 font-medium" role="alert">Lütfen masa numarasını giriniz.</p>}
            </div>

            {/* Note */}
            <div className="mb-4">
              <label htmlFor="order-note" className="text-xs font-semibold text-muted-foreground mb-1 block">
                <MessageSquare className="w-3 h-3 inline mr-1" />
                Not (İsteğe bağlı)
              </label>
              <textarea
                id="order-note"
                placeholder="Özel istek veya notunuzu yazın..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none"
              />
            </div>

            <button 
              onClick={handleCheckout}
              disabled={submitting}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed text-primary-foreground font-bold py-3.5 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-95 text-lg flex justify-center items-center gap-2"
              aria-busy={submitting}
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Siparişi Gönder
                </>
              )}
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full mt-3 py-2 text-sm text-muted-foreground hover:text-destructive font-medium transition-colors"
            >
              Sepeti Temizle
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
