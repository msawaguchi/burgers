export interface CartItem {
  id: number
  name: string
  description?: string
  price: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
  totalAmount: number
}

interface Image {
  id: number
  image: string
}

export interface ModifierItem {
  id: number
  name: string
  price: number
  maxChoices?: number
  position?: number
  visible: number
  availabilityType?: string
  qty?: number
  available?: boolean
}

export interface Modifier {
  id: number
  name: string
  minChoices: number
  maxChoices: number
  items: ModifierItem[]
}

export interface MenuItem {
  id: number
  name: string
  description: string
  alcoholic: number
  price: number
  position: number
  visible: number
  availabilityType: string
  sku: string
  images: Image[]
  available: boolean
  modifiers?: Modifier[]
}

export interface Section {
  id: number
  name: string
  description: string | null
  position: number
  visible: number
  images: Image[]
  items: MenuItem[]
}

export interface MenuState {
  id: number
  name: string
  type: string
  collapse: number
  sections: Section[]
}

export interface StateMenuSlice {
  data: MenuState | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

export interface SearchState {
  searchTerm: string
}

export interface WebSettings {
  id: number
  venueId: number
  bannerImage: string
  backgroundColour: string
  primaryColour: string
  primaryColourHover: string
  navBackgroundColour: string
}

export interface RestaurantState {
  id: number
  name: string
  internalName: string
  description: string | null
  liveFlag: number
  demoFlag: number
  address1: string
  address2: string
  address3: string | null
  city: string
  county: string
  postcode: string
  country: string
  timezoneOffset: string
  locale: string
  timeZone: string
  webSettings: WebSettings
  ccy: string
  ccySymbol: string
  currency: string
}

export interface StateRestaurantSlice {
  data: RestaurantState | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

export interface CurrencyState {
  currency: string
  locale: string
}
