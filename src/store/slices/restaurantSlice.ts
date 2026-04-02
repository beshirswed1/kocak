import { createSlice } from "@reduxjs/toolkit"
import type {
  RestaurantInfo,
  MenuCategory,
  Review,
  Offer,
  HeroContent,
  AboutContent,
  VideoConfig,
  CtaContent,
  SeoConfig,
  MapConfig,
} from "@/types"
import {
  defaultInfo,
  defaultHero,
  defaultAbout,
  defaultVideo,
  defaultCta,
  defaultSeo,
  defaultMap,
  reviews as defaultReviews,
  offers as defaultOffers,
} from "@/constants/restaurant-data"

interface RestaurantState {
  info: RestaurantInfo
  hero: HeroContent
  about: AboutContent
  video: VideoConfig
  cta: CtaContent
  seo: SeoConfig
  map: MapConfig
  menu: MenuCategory[]
  reviews: Review[]
  offers: Offer[]
}

const initialState: RestaurantState = {
  info: defaultInfo,
  hero: defaultHero,
  about: defaultAbout,
  video: defaultVideo,
  cta: defaultCta,
  seo: defaultSeo,
  map: defaultMap,
  menu: [],
  reviews: defaultReviews,
  offers: defaultOffers,
}

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    updateInfo: (state, action) => {
      state.info = { ...state.info, ...action.payload };
    },
    updateHero: (state, action) => {
      state.hero = { ...state.hero, ...action.payload };
    },
    updateAbout: (state, action) => {
      state.about = { ...state.about, ...action.payload };
    },
    updateVideo: (state, action) => {
      state.video = { ...state.video, ...action.payload };
    },
    updateCta: (state, action) => {
      state.cta = { ...state.cta, ...action.payload };
    },
    updateSeo: (state, action) => {
      state.seo = { ...state.seo, ...action.payload };
    },
    updateMap: (state, action) => {
      state.map = { ...state.map, ...action.payload };
    },
    setMenuCategories: (state, action) => {
      state.menu = action.payload;
    },
  },
})

export const {
  updateInfo,
  updateHero,
  updateAbout,
  updateVideo,
  updateCta,
  updateSeo,
  updateMap,
  setMenuCategories,
} = restaurantSlice.actions;
export default restaurantSlice.reducer
