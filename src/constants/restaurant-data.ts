// ==========================================
// 🍽️ QR MENU TEMPLATE - Restaurant Config
// ==========================================

import type {
  RestaurantInfo,
  Review,
  Offer,
  HeroContent,
  AboutContent,
  VideoConfig,
  CtaContent,
  SeoConfig,
  MapConfig,
} from "@/types"

// ─── Restaurant Identity (الهوية الأساسية) ─────────────
export const defaultInfo: RestaurantInfo = {
  name: "Koçak Kebap & Beyran",
  slogan: " Geçmişten Günümüze Uzanan Lezzet Geleneği",
  description:
    "2008 yılından beri, Gaziantep'in köklü kebap kültürünü yaşatıyor ve sofralarınıza taşıyoruz. Geleneksel Antep kebaplarının kültürüne, dokusuna ve tarihsel tatlarına sadık kalarak, geçmişin lezzetlerini günümüzde de yaşatıyoruz.",
  phone: "0535 456 95 88",
  whatsapp: "+90 535 456 95 88",
  address: "incilipınar kamil ocak cd. no:1/tic15 merkez, 27000 Şehitkamil/Gaziantep",
  city: "Gaziantep",
  rating: 4.4,
  reviewCount: 180,
  avgPrice: "$$",
  hours: "08:00 - 23:00",
  googleMapsUrl: "https://maps.app.goo.gl/NRDc38gLyVWkuoCf8",
  googleMapsEmbed: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3183.539637292018!2d37.38056765943139!3d37.06845235264766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e19f57fd2a61%3A0x64949945dfe472bf!2sKo%C3%A7ak%20Kebap%20%26%20Beyran!5e0!3m2!1sar!2str!4v1775015306858!5m2!1sar!2str\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
  services: [
    "İçeride servis",
    "Açık havada oturma",
    "Paket servisi",
    "Teslimat",
    "Temassız teslimat",
    "Arabada servis (Drive-through)",
  ],
  socialMedia: {
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    email: "",
  },
}

// ─── Hero Section ────────────────────────────────────────
export const defaultHero: HeroContent = {
  badge: "4.4 Yıldız - 182 Değerlendirme",
  headline: "Geçmişten Günümüze Uzanan Lezzet Geleneği!",
  subheadline:
    "2008 yılından beri Koçak Kebap olarak Gaziantep'in köklü kebap kültürünü yaşatıyor ve sofralarınıza taşıyoruz. Gerçek Antep lezzetini keşfetmek için sizi bekliyoruz.",
}

// ─── About Section ───────────────────────────────────────
export const defaultAbout: AboutContent = {
  sectionTitle: "Hakkımızda",
  title: "Geçmişten Günümüze Uzanan Lezzet Geleneği!",
  description:
    "2008 yılından beri, Koçak Kebap olarak Gaziantep'in köklü kebap kültürünü yaşatıyor ve sofralarınıza taşıyoruz. Geleneksel Antep kebaplarının kültürüne, dokusuna ve tarihsel tatlarına sadık kalarak, geçmişin lezzetlerini günümüzde de yaşatıyoruz. Her bir kebabımız, eski usullerle, o dönemin tariflerine ve hazırlama tekniklerine bağlı kalarak özenle hazırlanıyor. Koçak Kebap'ta, tarihi tatları modern zamanlarla buluşturuyoruz ve bu kültürü yaşatmaya devam ediyoruz.\n\nSiz de bu eşsiz lezzetleri tatmak ve Antep mutfağının gerçek tadını keşfetmek için Koçak Kebap'a bekliyoruz. Sizleri ağırlamaktan mutluluk duyarız.\n\nGöksel Koçak",
  badge: "Koçak Kebap & Beyran",
  features: [
    "2008'den beri hizmetinizdeyiz",
    "Halal yemekler",
    "Kahvaltı, öğle ve akşam yemeği servisi",
    "Ücretsiz otopark",
    "Tekerlekli sandalyeye uygun",
    "Çocuklara uygun ve aile dostu",
  ],
}

// ─── Video Section ───────────────────────────────────────
export const defaultVideo: VideoConfig = {
  videoSrc: "/video.mp4",
  title: "Koçak Kebap & Beyran'ı Keşfedin",
  subtitle: "Lezzet Yolculuğumuz",
}

// ─── CTA Texts ───────────────────────────────────────────
export const defaultCta: CtaContent = {
  menuSectionTitle: "Eşsiz Lezzetlerimiz",
  menuSectionSubtitle: "Geleneksel Antep kebapları, beyran ve çok daha fazlası",
  ctaBannerTitle: "Gaziantep'in Gerçek Lezzetini Tatmaya Ne Dersiniz?",
  ctaBannerSubtitle:
    "Mutlu müşterimiz arasına katılın. Sizleri de ağırlamaktan memnuniyet duyarız.",
  menuCtaTitle: "Tam Menümüzü Keşfedin",
  menuCtaSubtitle:
    "Özenle hazırlanan geleneksel Antep kebaplarımızı ve beyran çeşitlerimizi incelemek için hemen menümüze göz atın.",
}

// ─── Map Config ──────────────────────────────────────────
export const defaultMap: MapConfig = {
  address: "incilipınar kamil ocak cd. no:1/tic15 merkez, 27000 Şehitkamil/Gaziantep",
  googleMapsUrl: "https://maps.app.goo.gl/U76X5AWorEcchBkCA",
  googleMapsEmbed: "<iframe src=\"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3183.539637292018!2d37.38056765943139!3d37.06845235264766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1531e19f57fd2a61%3A0x64949945dfe472bf!2sKo%C3%A7ak%20Kebap%20%26%20Beyran!5e0!3m2!1sar!2str!4v1775015306858!5m2!1sar!2str\" width=\"600\" height=\"450\" style=\"border:0;\" allowfullscreen=\"\" loading=\"lazy\" referrerpolicy=\"no-referrer-when-downgrade\"></iframe>",
  services: ["Ücretsiz otopark", "Tekerlekli sandalyeye uygun", "Paket Servisi", "Teslimat", "Arabada servis"],
}

// ─── SEO Config ──────────────────────────────────────────
export const defaultSeo: SeoConfig = {
  websiteUrl: "https://kocak-kebap-beyran.web.app",
  titleDefault: "Koçak Kebap & Beyran | Geçmişten Günümüze Uzanan Lezzet Geleneği",
  titleTemplate: "%s | Koçak Kebap & Beyran",
  description:
    "2008'den beri Koçak Kebap, Gaziantep'in köklü kebap geleneğini aslına sadık kalarak yaşatıyor. Tüm kebaplar, geleneksel tarifler ve eski usullerle özenle hazırlanıyor. Gerçek Antep lezzetini keşfetmek için sizi bekliyoruz.",
  keywords: ["koçak kebap", "beyran", "gaziantep kebap", "antep kebapları", "geleneksel kebap", "gaziantep restoran", "koçak kebap beyran"],
  ogImage: "/yemek.png",
  locale: "tr_TR",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Koçak Kebap & Beyran",
    servesCuisine: ["Türk Mutfağı", "Kebap", "Beyran"],
    priceRange: "$$",
  },
}

// ─── Reviews (Gerçek Yorumlar) ───────────────────────────
export const reviews: Review[] = [
  {
    id: "1",
    name: "Gizem DAĞDELEN",
    rating: 5,
    text: "Kesinlikle harika hiç düşünmeden ailenizle sevdiklerinizle birlikte lezzetli ve aynı zamanda full hizmet alacağınız bir mekan. Ramazan olmasına rağmen iftar vaktinde full+full hizmet veren bir işletme ellerinize sağlık.",
    date: "1 yıl önce",
    reviewCount: "6 Değerlendirme",
  },
  {
    id: "2",
    name: "Onur Kök",
    rating: 5,
    text: "Kesinlikle pişman olmazsınız. İstanbuldan geldik dün akşam tesadüfen eşimle yemek için burayı seçtik ama böyle bir bol porsiyon, lezzet, ikram olamaz. Hiçbir yerde ikramları çift tabak vermiyorlar böyle olmasına çok sevindik. Eşim patlıcan kebabı aldı tek başına bitirmesi imkansız ve lezzeti muhteşemdi. Bende küşleme aldım tadı enfesti. Yemek gözünüzün önünde sıfırdan hazırlanıyor bu görsellik ve güven de çok iyiydi. Fiyatlar gayet uygun. Her şey için teşekkür ederiz ağzımızda güzel bir tatla İstanbul’a gidiyoruz.",
    date: "1 yıl önce",
    reviewCount: "Yerel Rehber",
  },
  {
    id: "3",
    name: "Rotamız Oluşturuluyor",
    rating: 5,
    text: "Gaziantep’te mükemmel bir mekan, ilgileri, temizliği ve hızları ile muhteşem biz çok memnun kaldık çok lezzetli idi yediğimiz her şey iyi ki böyle mekanlar var 🙏🏻",
    date: "11 ay önce",
    reviewCount: "10 Değerlendirme",
  },
  {
    id: "4",
    name: "Ramazan bayam",
    rating: 5,
    text: "Lezzet harika esnaflık on numara fiyatlar çok iyi ama ayranın menüde ikram yazıyor olması istanbulda yaşayan bizleri mest etti gerçekten. Teşekkür ederiz Koçak Kebap 🙏🏼👏🏼",
    date: "1 yıl önce",
    reviewCount: "5 Değerlendirme",
  },
  {
    id: "5",
    name: "Fatih Krz",
    rating: 5,
    text: "Konumu ve yeri çok güzel, yemekleri zaten müthişti, Göksel usta ve çalışanlar çok ilgili, fiyatlar ortalama, mezelerin resmini ekledim.",
    date: "10 ay önce",
    reviewCount: "7 Değerlendirme",
  },
  {
    id: "6",
    name: "Sema Yaren Yavaş",
    rating: 5,
    text: "Hem lezzeti hem hizmeti çok beğendik. Emekleriniz için teşekkür ederiz. Ailemizle güzel vakit geçirebileceğimiz yeni bir alan keşfettik.",
    date: "1 yıl önce",
    reviewCount: "2 Değerlendirme",
  },
]

// ─── Offers (Varsayılan) ─────────────────────────────────
export const offers: Offer[] = [
  // {
  //   id: "1",
  //   title: "Akşam Ziyafeti",
  //   description: "4 kişilik karışık ızgara ve içecekler",
  //   discount: "%10 İndirim",
  // },
  // {
  //   id: "2",
  //   title: "Paket Servis",
  //   description: "Tüm paket siparişlerde geçerli",
  //   discount: "Ücretsiz İçecek",
  // },
]

// ─── Navigation Links ────────────────────────────────────
export const navLinks = [
  { href: "/menu", label: "Menü" },
  { href: "/", label: "Ana Sayfa" },
]
