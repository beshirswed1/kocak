import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  mobileMenuOpen: boolean
  activeCategory: string
}

const initialState: UIState = {
  mobileMenuOpen: false,
  activeCategory: "baslangiclar",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false
    },
    setActiveCategory(state, action: PayloadAction<string>) {
      state.activeCategory = action.payload
    },
  },
})

export const { toggleMobileMenu, closeMobileMenu, setActiveCategory } =
  uiSlice.actions
export default uiSlice.reducer
