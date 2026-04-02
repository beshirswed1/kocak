"use client";

import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import { updateOrderStatusInDb, deleteOrderFromDb } from "@/lib/orderService";
import {
  ClipboardList,
  CheckCircle2,
  Trash2,
  Clock,
  Hash,
  MessageSquare,
  Loader2,
  Package,
  Filter,
  ChefHat,
} from "lucide-react";
import Image from "next/image";
import type { Order, OrderStatus } from "@/types";

type FilterStatus = "all" | OrderStatus;

export default function AdminOrdersPage() {
  const { orders, loading } = useAppSelector((s) => s.orders);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 0,
    }).format(price);

  const formatTime = (ts: number) => {
    const date = new Date(ts);
    return date.toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (ts: number) => {
    const date = new Date(ts);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return "Bugün";
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return "Dün";
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "short",
    });
  };

  const handleComplete = async (orderId: string) => {
    setProcessingId(orderId);
    try {
      await updateOrderStatusInDb(orderId, "completed");
    } catch (e) {
      console.error("Sipariş tamamlanamadı:", e);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (orderId: string) => {
    setProcessingId(orderId);
    try {
      await deleteOrderFromDb(orderId);
    } catch (e) {
      console.error("Sipariş silinemedi:", e);
    } finally {
      setProcessingId(null);
    }
  };

  const statusConfig = {
    pending: {
      label: "Beklemede",
      color: "bg-amber-100 text-amber-800 border-amber-200",
      dot: "bg-amber-500",
    },
    completed: {
      label: "Tamamlandı",
      color: "bg-green-100 text-green-800 border-green-200",
      dot: "bg-green-500",
    },
    cancelled: {
      label: "İptal Edildi",
      color: "bg-red-100 text-red-800 border-red-200",
      dot: "bg-red-500",
    },
  };

  const filters: { label: string; value: FilterStatus; count?: number }[] = [
    { label: "Tümü", value: "all", count: orders.length },
    { label: "Beklemede", value: "pending", count: pendingCount },
    { label: "Tamamlandı", value: "completed", count: completedCount },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Siparişler yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 relative w-full pb-10 z-0">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-[#0A0F1C] rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-800 p-5 sm:p-8 animate-fade-in-up">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] opacity-60 animate-pulse" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-orange-500/20 rounded-full blur-[60px] opacity-40" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3 w-fit">
              <ClipboardList className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-[10px] sm:text-xs font-semibold text-gray-300 tracking-[0.2em] uppercase">
                Sipariş Yönetimi
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white tracking-tight">
              Siparişler
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Gelen siparişleri takip edin ve yönetin.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-3">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-center min-w-[80px]">
              <p className="text-2xl font-bold text-amber-400 font-mono">
                {pendingCount}
              </p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                Beklemede
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl px-4 py-3 text-center min-w-[80px]">
              <p className="text-2xl font-bold text-green-400 font-mono">
                {completedCount}
              </p>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                Tamamlandı
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Sipariş durumu filtresi">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            role="tab"
            aria-selected={filter === f.value}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${
              filter === f.value
                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary/30 hover:bg-primary/5"
            }`}
          >
            {f.label}
            {f.count !== undefined && (
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  filter === f.value
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {f.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Package className="w-10 h-10 text-gray-300" />
          </div>
          <p className="text-lg font-semibold text-gray-600">
            Sipariş bulunamadı
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {filter === "all"
              ? "Henüz sipariş gelmemiştir."
              : `"${filters.find((f) => f.value === filter)?.label}" durumunda sipariş yok.`}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6">
          {filteredOrders.map((order, idx) => {
            const sc = statusConfig[order.status];
            const isProcessing = processingId === order.id;

            return (
              <article
                key={order.id}
                className={`relative bg-white rounded-2xl sm:rounded-3xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${
                  order.status === "pending"
                    ? "border-amber-200 ring-1 ring-amber-100"
                    : "border-gray-200"
                }`}
                style={{ animationDelay: `${idx * 80}ms` }}
                aria-label={`Masa ${order.tableNumber} siparişi`}
              >
                {/* Pending pulse indicator */}
                {order.status === "pending" && (
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 animate-shimmer" />
                )}

                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-3">
                    {/* Table Badge */}
                    <div className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm">
                      <Hash className="w-3.5 h-3.5" />
                      <span>Masa {order.tableNumber}</span>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${sc.color}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${sc.dot} ${
                          order.status === "pending" ? "animate-pulse" : ""
                        }`}
                      />
                      {sc.label}
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-medium">
                      {formatDate(order.createdAt)} • {formatTime(order.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 sm:p-5 space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-gray-50 rounded-xl p-2.5 sm:p-3"
                    >
                      <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-gray-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} adet × {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="font-bold text-sm text-primary whitespace-nowrap">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}

                  {/* Note */}
                  {order.note && (
                    <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-xl p-3 mt-2">
                      <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-blue-800">{order.note}</p>
                    </div>
                  )}
                </div>

                {/* Order Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-t border-gray-100 bg-gray-50/30">
                  {/* Total */}
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground font-medium">
                      Toplam:
                    </span>
                    <span className="text-xl font-bold font-serif text-primary">
                      {formatPrice(order.totalPrice)}
                    </span>
                  </div>

                  {/* Actions */}
                  {order.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleComplete(order.id)}
                        disabled={isProcessing}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
                        aria-label={`Masa ${order.tableNumber} siparişini tamamla`}
                      >
                        {isProcessing ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                        Tamamla
                      </button>
                      <button
                        onClick={() => handleDelete(order.id)}
                        disabled={isProcessing}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 disabled:opacity-50 text-red-600 text-sm font-semibold rounded-xl border border-red-200 transition-all duration-200 active:scale-95"
                        aria-label={`Masa ${order.tableNumber} siparişini sil`}
                      >
                        <Trash2 className="w-4 h-4" />
                        Sil
                      </button>
                    </div>
                  )}

                  {order.status === "completed" && (
                    <button
                      onClick={() => handleDelete(order.id)}
                      disabled={isProcessing}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-red-600 transition-colors"
                      aria-label={`Masa ${order.tableNumber} siparişini sil`}
                    >
                      <Trash2 className="w-4 h-4" />
                      Kayıttan Sil
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
