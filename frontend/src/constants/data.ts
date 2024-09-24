import { NavItem, SidebarNavItem } from "@/types"

import { Icons } from "@/components/icons"

export interface Review{
  location:string,

}

export type User = {
  id: number
  name: string
  company: string
  role: string
  verified: boolean
  status: string
  createdAt?: Date
}


export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
]

export type Employee = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: string
  gender: string
  date_of_birth: string // Consider using a proper date type if possible
  street: string
  city: string
  state: string
  country: string
  zipcode: string
  longitude?: number // Optional field
  latitude?: number // Optional field
  job: string
  profile_picture?: string | null // Profile picture can be a string (URL) or null (if no picture)
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admindash",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "User",
    href: "/admindash/user",
    icon: "user",
    label: "user",
  },
  {
    title: "Positions",
    href: "/admindash/positions",
    icon: "add",
    label: "routes",
  },
  {
    title: "Routes",
    href: "/admindash/routes",
    icon: "add",
    label: "routes",
  },
  {
    title: "Sensor Data",
    href: "/admindash/sensor-data",
    icon: "media",
    label: "sensor",
  },
  {
    title: "Device",
    href: "/admindash/device",
    icon: "dashboard",
    label: "Device",
  },
  
  {
    title: "Government",
    href: "/admindash/govt",
    icon: "help",
    label: "govt",
  },
  // {
  //   title: "Kanban",
  //   href: "/admindash/kanban",
  //   icon: "kanban",
  //   label: "kanban",
  // },
  {
    title: "LIVE MAP",
    href: "/admindash/map",
    icon: "dashboard",
    label: "map",
  },
  {
    title: "STATIONARY MAP",
    href: "/admindash/map-stationary",
    icon: "dashboard",
    label: "map",
  },
]

export const navItemsUser: NavItem[] = [
  {
    title: "Dashboard",
    href: "/userdash",
    icon: "dashboard",
    label: "Dashboard",
  },

  {
    title: "LIVE MAP",
    href: "/userdash/map",
    icon: "dashboard",
    label: "map",
  },
  {
    title: "Profile",
    href: "/userdash/profile",
    icon: "profile",
    label: "profile",
  },
]

// data.ts
export interface Sale {
  id: number;
  name: string;
  email: string;
  amount: string;
  avatar: string;
  initials: string;
}

export const salesData: Sale[] = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "/avatars/01.png",
    initials: "OM",
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "/avatars/02.png",
    initials: "JL",
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "/avatars/03.png",
    initials: "IN",
  },
  {
    id: 4,
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    avatar: "/avatars/04.png",
    initials: "WK",
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    avatar: "/avatars/05.png",
    initials: "SD",
  },
];



export interface CardData {
  title: string;
  value: string;
  description: string;
  iconPath: string;
  iconViewBox: string;
}

export const cardData: CardData[] = [
  {
    title: "Total Users",
    value: "231",
    description: "+20.1% from last month",
    iconPath: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
    iconViewBox: "0 0 24 24",
  },
  {
    title: "Subscriptions",
    value: "50",
    description: "+180.1% from last month",
    iconPath: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    iconViewBox: "0 0 24 24",
  },
  {
    title: "Active Users",
    value: "34",
    description: "+19% from last month",
    iconPath: "M2 10h20 M2 5h20a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H2V5z",
    iconViewBox: "0 0 24 24",
  },
  {
    title: "Active IOTs",
    value: "7",
    description: "+201 since last hour",
    iconPath: "M22 12h-4l-3 9L9 3l-3 9H2",
    iconViewBox: "0 0 24 24",
  },
];

const sensorData = [
    {
      "_id": "6673a5a717d4e880a1ed75ff",
      "kei": "00",
      "value": 15,
      "calibrateValue": 0,
      "timestamp": "2022-03-01T10:00:00.000Z",
      "position": {
        "_id": "6673a5a717d4e880a1ed75fd",
        "lati": 27.695297,
        "lngi": 85.271747,
        "alti": 300,
        "route": {
          "_id": "666d74fde3c42ea208d64763",
          "start": "Start Point",
          "finish": "Finish Point",
          "complete": false,
          "owner": 1,
          "positions": [],
          "__v": 0
        },
        "sensorDataDocuments": [],
        "__v": 0
      }
    },
    {
      "_id": "6673a53d3977155c133309b2",
      "kei": "00",
      "value": 18,
      "calibrateValue": 0,
      "timestamp": "2022-03-01T10:05:00.000Z",
      "position": {
        "_id": "6673a53d3977155c133309b0",
        "lati": 27.405297,
        "lngi": 85.271748,
        "alti": 305,
        "route": {
          "_id": "666d74fde3c42ea208d64763",
          "start": "Start Point",
          "finish": "Finish Point",
          "complete": false,
          "owner": 1,
          "positions": [],
          "__v": 0
        },
        "sensorDataDocuments": [],
        "__v": 0
      }
    },
    {
      "_id": "66744294e9aec0796f4041ba",
      "kei": "00",
      "value": 20,
      "calibrateValue": 0,
      "timestamp": "2022-03-01T10:10:00.000Z",
      "position": {
        "_id": "6673a2b75ab1c205e8b61708",
        "lati": 27.565298,
        "lngi": 85.271749,
        "alti": 310,
        "route": {
          "_id": "666d74fde3c42ea208d64763",
          "start": "Start Point",
          "finish": "Finish Point",
          "complete": false,
          "owner": 1,
          "positions": [],
          "__v": 0
        },
        "sensorDataDocuments": [],
        "__v": 0
      }
    },
    {
      "_id": "667d6cfca398c538eb87e173",
      "kei": "00",
      "value": 17,
      "calibrateValue": 0,
      "timestamp": "2022-03-01T10:15:00.000Z",
      "position": {
        "_id": "667d6cfca398c538eb87e171",
        "lati": 27.725299,
        "lngi": 85.271748,
        "alti": 315,
        "__v": 0
      }
    },
    {
      "_id": "667d6cfca398c538eb87e174",
      "kei": "00",
      "value": 19,
      "calibrateValue": 0,
      "timestamp": "2022-03-01T10:20:00.000Z",
      "position": {
        "_id": "667d6cfca398c538eb87e172",
        "lati": 27.715300,
        "lngi": 85.271749,
        "alti": 320,
        "__v": 0
      }
    },
    {
      "_id": "667d6cfca398c538eb87e175",
      "kei": "00",
      "value": 116,
      "calibrateValue": 0,
      "timestamp": "2022-03-01T10:25:00.000Z",
      "position": {
        "_id": "667d6cfca398c538eb87e173",
        "lati": 27.695305,
        "lngi": 85.271750,
        "alti": 325,
        "__v": 0
      }
    }
  ];
  
  export default sensorData;