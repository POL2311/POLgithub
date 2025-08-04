
export const TOKEN_SYMBOL = "$PLRS";

export interface Continent {
  id: string;
  name: string;
  availability: number; // Total supply for this continent
  cost: number;
  image: string; // Path relative to the public directory or an external URL
  dataAiHint?: string;
  ownedCount: number; // Number currently claimed
  live: boolean;
  candyMachineId: string;
}

export const CONTINENT_TYPES: Continent[] = [
  {
    id: "africa",
    name: "Africa",
    availability: 54, // From Tokenomics landSupplyData
    cost: 1,
    image: "/images/africa1.png",
    dataAiHint: "Africa continent voxel",
    ownedCount: 0,
    live: true,
    candyMachineId: "9CETaSXuSu9ep95enmLejGbQQy3KXJUzFgs2B3EvypB4",
  },
  {
    id: "antarctica",
    name: "Antarctica",
    availability: 5, // From Tokenomics landSupplyData
    cost: 1,
    image: "/images/antarctica1.png",
    dataAiHint: "Antarctica continent voxel",
    ownedCount: 0,
    live: true,
    candyMachineId: "2k84snkF4MsopBtJrmwFC1myhjfsHeVutPXKUgMDWkXL",
  },
  {
    id: "asia",
    name: "Asia",
    availability: 49, // From Tokenomics landSupplyData
    cost: 1,
    image: "/images/asia1.png",
    dataAiHint: "Asia continent voxel",
    ownedCount: 0,
    live: true,
    candyMachineId: "DrhDzvRzdVCmv8U7wqsCAgEjWzUJAYa59tzeorYCA52A",
  },
  {
    id: "europe",
    name: "Europe",
    availability: 44, // From Tokenomics landSupplyData
    cost: 1,
    image: "/images/europe1.png",
    dataAiHint: "Europe continent voxel",
    ownedCount: 0,
    live: true,
    candyMachineId: "56oiZt4sJgbidwQY5jztb4BbUdRqMczL3GDqfmDXTyks",
  },
  {
    id: "north-america",
    name: "North America",
    availability: 22, // From Tokenomics landSupplyData
    cost: 1,
    image: "/images/northamerica1.png",
    dataAiHint: "North America continent voxel",
    ownedCount: 0,
    live: true,
    candyMachineId: "HkeyS3KjEQ5pWxVjNLXgpugCgc6ZMBJhGhZuW92mLJay",
  },
  {
    id: "oceania",
    name: "Oceania",
    availability: 14, // From Tokenomics landSupplyData
    cost: 1,
    image: "/images/oceania1.png",
    dataAiHint: "Oceania continent voxel",
    ownedCount: 0,
    live: true,
    candyMachineId: "7xwtcGs3mZ2w3BBYXw4yPJhyVUv6LZAfPdq1RPn4g68p",
  },
  {
    id: "south-america",
    name: "South America",
    availability: 12, // From Tokenomics landSupplyData
    cost: 1,
    image: "/images/southamerica1.png",
    dataAiHint: "South America continent voxel",
    ownedCount: 0,
    live: true,
    candyMachineId: "7M6TDXEAzREdb1NwoMefwsAnx4dvXr3Gm1hYYNdsbKmF",
  },
];
