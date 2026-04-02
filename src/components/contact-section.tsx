"use client"

import { useState } from "react"
import { Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { useAppSelector } from "@/store/hooks"
import { useReveal } from "@/hooks/use-reveal"

export function ContactSection() {
  const info = useAppSelector((s) => s.restaurant.info)
  const { ref, visible } = useReveal()
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const whatsappMsg = encodeURIComponent(
      `Merhaba, ben ${formState.name}.\nTelefon: ${formState.phone}\n\n${formState.message}`
    )
    window.open(`https://wa.me/${info.whatsapp}?text=${whatsappMsg}`, "_blank")
    setSubmitted(true)
  }

  return (
    <section id="iletisim" className="bg-background py-20" ref={ref}>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact Info */}
          <div className={visible ? "animate-slide-in-left" : "opacity-0"}>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              İletişim
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Bize Ulaşın
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-pretty">
              Rezervasyon, sipariş veya sorularınız için bize ulaşabilirsiniz.
              Sizi ağırlamaktan mutluluk duyarız.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {/* Phone */}
              <a
                href={`tel:${info.phone}`}
                className="group flex items-center gap-4 rounded-xl bg-card border border-border p-4 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                  <Phone className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Telefon</p>
                  <p className="text-sm text-muted-foreground">{info.phone}</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${info.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl bg-card border border-border p-4 transition-all duration-300 hover:shadow-lg hover:border-[#25D366]/30 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366]/10 transition-all duration-300 group-hover:bg-[#25D366] group-hover:scale-110">
                  <MessageCircle className="h-5 w-5 text-[#25D366] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Hızlı mesaj gönderin</p>
                </div>
              </a>

              {/* Address */}
              <a
                href={"https://maps.app.goo.gl/Jg22HA4KQAFMYeTBA"}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl bg-card border border-border p-4 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                  <MapPin className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Adres</p>
                  <p className="text-sm text-muted-foreground">
                    {info.address}
                  </p>
                </div>
              </a>

              {/* Hours */}
              <div className="flex items-center gap-4 rounded-xl bg-card border border-border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Çalışma Saatleri</p>
                  <p className="text-sm text-muted-foreground">{info.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`rounded-2xl bg-card border border-border p-8 shadow-xl ${visible ? "animate-slide-in-right" : "opacity-0"
              }`}
          >
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4 animate-bounce-gentle">
                  <Send className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Mesajınız İletiliyor!</h3>
                <p className="text-muted-foreground max-w-sm">
                  WhatsApp uygulamasına yönlendiriliyorsunuz. Lütfen mesajınızı oradan gönderin.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 rounded-full border border-border text-sm font-medium hover:bg-secondary transition-colors"
                >
                  Yeni Mesaj Gönder
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-foreground mb-6">Bize Mesaj Gönderin</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Adınız Soyadınız
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                      placeholder="Örn: Ahmet Yılmaz"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Telefon Numaranız
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all"
                      placeholder="Örn: 05xx xxx xx xx"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all resize-none"
                      placeholder="Size nasıl yardımcı olabiliriz?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>WhatsApp'tan Gönder</span>
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
