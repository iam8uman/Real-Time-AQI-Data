import { Icons } from "@/components/icons"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
  description?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export interface Role {
  id: number
  name: string
}

export interface User {
  id: number
  email: string
  password: string
  isVerified: boolean
  firstName: string
  lastName: string
  roles?: Role[]
  createdAt: Date
  deviceId?: string
}

export enum deviceType {
  STATIONERY = "STATIONERY",
  MOBILE = "MOBILE",
  LAPTOP = "LAPTOP",
  TABLET = "TABLET",
  OTHER = "OTHER",
}

export interface SensorData {
  _id: string
  kei: number
  value: number
  timestamp: string
}

export interface SensorDataType {
    data: SensorData[]
    total: number
}


export interface OSMData {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    house_number: string;
    road: string;
    hamlet: string;
    town: string;
    city: string;
    state_district: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: [string, string, string, string];
};


export interface Device {
  _id: string
  serialNo: string
  type: deviceType
  owner: string
}

export interface ApiData<T> {
  map(arg0: (item: any) => import("react").JSX.Element): import("react").ReactNode
  data: T[]
  total: number
}

export interface FetchParams {
  url: string
  filters: Range[]
  page?: number
  pageSize?: number
  rangeFields: string[]
  type?: string
  where?: Where
  who?: string
}

// types/index.ts
export interface Range {
  property: string
  lower: string
  upper: string
}

export interface LeadStatus {
  PAID: "PAID"
  UNPAID: "UNPAID"
}

export interface Lead {
  name: string
  email: string
  phone: string
  // status: LeadsStatus;
  address: string
  id: number
  revenuePotential: number
}

export interface Customer {
  name: string
  email: string
  phone: string
  profile: string
  address: string
  id: number
  revenuePotential: number
}

export interface Routes {
  id: string
  start: string
  finish: string
  complete: boolean
  owner: number
  positions: any[]
}

export interface Position {
  _id: string
  lati: number
  lngi: number
  alti: number
  route: Routes
  sensorData: any[]
}

export interface Segment {
  id: number
  name: string
  description: string
  createdAt: string
  userId: number
}

export interface QueryParams extends FetchParams {
  headers?: Record<string, string> // New headers property
  whereFilters?: WhereFilter[] // Add whereFilters property with default value
}

export interface WhereFilter {
  property: string // The property to filter on
  operator?: "<" | "<=" | ">" | ">=" | "=" | "" // The comparison operator (optional)
  value?: string | number // The value to compare against (optional)
}
interface Where {
  [key: string]: string | number | boolean
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren
