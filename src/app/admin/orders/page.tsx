"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { CheckCircle2, XCircle, Trash2, Clock, MapPin, Utensils, MessageSquareText } from "lucide-react";
import { orderService } from "@/services/orderService";
import type { OrderStatus } from "@/types";

export default function OrdersPage() {
  // Orders from Redux store, already sorted by createdAt desc via Firebase query
  const orders = useAppSelector(s => s.orders.items);
  const [filter, setFilter] = useState<"all" | OrderStatus>("pending");

  const pendingCount = orders.filter(o => o.status === "pending").length;
  const completedCount = orders.filter(o => o.status === "completed").length;
  const cancelledCount = orders.filter(o => o.status === "cancelled").length;

  const filteredOrders = orders.filter(o => filter === "all" || o.status === filter);

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    try {
      await orderService.updateOrderStatus(id, status);
    } catch(e) {
      alert("Durum güncellenirken bir hata oluştu.");
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Bu siparişi tamamen silmek istediğinize emin misiniz?")) {
      try {
         await orderService.deleteOrder(id);
      } catch(e) {
         alert("Sipariş silinirken bir hata oluştu.");
      }
    }
  }

  const formatPrice = (p: number) => new Intl.NumberFormat("tr-TR", {style:"currency",currency:"TRY",minimumFractionDigits:0}).format(p);

  const formatTime = (timestamp: any) => {
    if (!timestamp) return "Az önce";
    const d = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return d.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch(status) {
      case "pending": return <span className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-full text-xs">Bekliyor</span>;
      case "completed": return <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs">Tamamlandı</span>;
      case "cancelled": return <span className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full text-xs">İptal Edildi</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">Sipariş Yönetimi</h1>
          <p className="text-gray-500 text-sm mt-1">Müşterilerden gelen siparişleri canlı olarak takip edin ve yönetin.</p>
        </div>
        
        {/* Filters */}
        <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto hide-scrollbar w-full md:w-auto">
          {(["pending", "completed", "cancelled", "all"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 md:flex-none whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                filter === f ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f === "all" && `Tümü (${orders.length})`}
              {f === "pending" && `Bekleyenler (${pendingCount})`}
              {f === "completed" && `Tamamlananlar (${completedCount})`}
              {f === "cancelled" && `İptal Edilenler (${cancelledCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.length === 0 ? (
          <div className="col-span-full bg-white p-10 rounded-3xl border border-dashed border-gray-300 flex flex-col items-center justify-center text-center opacity-70">
            <Utensils className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-lg font-medium text-gray-600">Bu kategoride hiç sipariş bulunmuyor</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className={`bg-white rounded-2xl shadow-sm border ${order.status === "pending" ? "border-orange-200" : "border-gray-100"} overflow-hidden flex flex-col transition-all hover:shadow-md`}>
              
              {/* Card Header text & status */}
              <div className={`p-4 border-b flex justify-between items-start ${order.status === "pending" ? "bg-orange-50/50" : "bg-gray-50"}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm ${order.status === "pending" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"}`}>
                    {order.tableNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 leading-tight">Masa {order.tableNumber}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3" />
                      {formatTime(order.createdAt)}
                    </div>
                  </div>
                </div>
                {getStatusBadge(order.status)}
              </div>

               {/* Note */}
               {order.note && (
                <div className="mx-4 mt-4 bg-yellow-50 text-yellow-800 p-3 rounded-lg flex gap-2 items-start text-sm border border-yellow-200/50">
                  <MessageSquareText className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="font-medium">{order.note}</span>
                </div>
              )}

              {/* Items */}
              <div className="p-4 flex-1 space-y-3">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700 bg-gray-100 w-6 h-6 flex items-center justify-center rounded-md">{item.quantity}x</span>
                      <span className="text-gray-900 font-medium">{item.name}</span>
                    </div>
                    <span className="text-gray-500">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              {/* Card Footer (Total & Actions) */}
              <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 font-medium text-sm">Toplam Tutar:</span>
                  <span className="text-xl font-bold text-primary font-serif">{formatPrice(order.totalPrice)}</span>
                </div>

                {order.status === "pending" ? (
                   <div className="grid grid-cols-2 gap-2">
                     <button 
                       onClick={() => handleUpdateStatus(order.id, "cancelled")} 
                       className="flex items-center justify-center gap-1 py-2.5 px-2 bg-red-50 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-100 transition-colors"
                     >
                       <XCircle className="w-4 h-4" /> İptal Et
                     </button>
                     <button 
                       onClick={() => handleUpdateStatus(order.id, "completed")} 
                       className="flex items-center justify-center gap-1 py-2.5 px-2 bg-green-500 text-white rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors shadow-sm"
                     >
                       <CheckCircle2 className="w-4 h-4" /> Tamamla
                     </button>
                   </div>
                ) : (
                  <button 
                    onClick={() => handleDelete(order.id)} 
                    className="w-full flex items-center justify-center gap-1 py-2 bg-white text-red-500 border border-red-200 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Kaydı Sil
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
