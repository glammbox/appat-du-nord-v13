export type SpeciesTag = 'maskinonge' | 'brochet' | 'achigan' | 'dore' | 'truite' | 'tous'
export type LureType = 'bucktail' | 'crankbait' | 'swimbait' | 'topwater' | 'jig' | 'spinner' | 'cuillere' | 'softbait' | 'equipement' | 'glide-bait'

export interface Product {
  id: string
  name: string
  imageFile: string
  type: LureType
  typeFR: string
  species: SpeciesTag[]
  price: number
}

export const products: Product[] = [
  { id: 'p1', name: 'Chaos Tackle Medussa', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail', species: ['maskinonge'], price: 42 },
  { id: 'p2', name: 'Chaos Tackle Double Showgirl', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail', species: ['maskinonge'], price: 65 },
  { id: 'p3', name: 'Savage Gear 3D Line Thru Trout', imageFile: 'glide-bait.jpg', type: 'glide-bait', typeFR: 'Glide Bait', species: ['maskinonge'], price: 38 },
  { id: 'p4', name: 'Musky Innovations Bull Dawg', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait', species: ['maskinonge'], price: 35 },
  { id: 'p5', name: 'Eppinger Dardevle Spoon XL', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère', species: ['maskinonge', 'brochet'], price: 18 },
  { id: 'p6', name: 'Tackle Industries Cowgirl Bucktail', imageFile: 'bucktail.jpg', type: 'bucktail', typeFR: 'Bucktail', species: ['maskinonge'], price: 58 },
  { id: 'p7', name: 'St. Croix Musky Legend 8\'6"', imageFile: 'rod.jpg', type: 'equipement', typeFR: 'Équipement', species: ['maskinonge'], price: 385 },
  { id: 'p8', name: 'Shimano Cardiff CI4+', imageFile: 'rod.jpg', type: 'equipement', typeFR: 'Équipement', species: ['maskinonge'], price: 310 },
  { id: 'p9', name: 'PowerPro 80lb Braid', imageFile: 'rod.jpg', type: 'equipement', typeFR: 'Équipement', species: ['maskinonge'], price: 45 },
  { id: 'p10', name: 'American Fishing Wire Leader', imageFile: 'rod.jpg', type: 'equipement', typeFR: 'Équipement', species: ['maskinonge'], price: 28 },
  { id: 'p11', name: 'Frabill Power Catch Net', imageFile: 'net.jpg', type: 'equipement', typeFR: 'Équipement', species: ['maskinonge'], price: 120 },
  { id: 'p12', name: 'Savage Gear Hybrid Pike/Musky', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait', species: ['maskinonge', 'brochet'], price: 44 },
  { id: 'p13', name: 'Drifter Tackle Believer 7"', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait', species: ['maskinonge'], price: 28 },
  { id: 'p14', name: 'Ezoko Musky Inline Spinner', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner', species: ['maskinonge'], price: 32 },
  { id: 'p15', name: 'Mepps Giant Killer', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner', species: ['brochet'], price: 16 },
  { id: 'p16', name: 'Savage Gear Cannibal', imageFile: 'softplastic.jpg', type: 'softbait', typeFR: 'Softbait', species: ['brochet'], price: 14 },
  { id: 'p17', name: 'Johnson Silver Minnow', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère', species: ['brochet'], price: 12 },
  { id: 'p18', name: 'Strike King Swim Jig', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig', species: ['brochet', 'achigan'], price: 9 },
  { id: 'p19', name: 'Rapala X-Rap Magnum', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait', species: ['brochet'], price: 22 },
  { id: 'p20', name: 'Berkley Fusion19', imageFile: 'swimbait.jpg', type: 'swimbait', typeFR: 'Swimbait', species: ['brochet'], price: 11 },
  { id: 'p21', name: 'Zoom Trick Worm', imageFile: 'softplastic.jpg', type: 'softbait', typeFR: 'Softbait', species: ['achigan'], price: 8 },
  { id: 'p22', name: 'Strike King KVD 1.5', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait', species: ['achigan'], price: 18 },
  { id: 'p23', name: 'Booyah Pad Crasher', imageFile: 'topwater.jpg', type: 'topwater', typeFR: 'Topwater', species: ['achigan'], price: 14 },
  { id: 'p24', name: 'Z-Man ChatterBait', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig', species: ['achigan'], price: 16 },
  { id: 'p25', name: 'Senko 5"', imageFile: 'softplastic.jpg', type: 'softbait', typeFR: 'Softbait', species: ['achigan'], price: 12 },
  { id: 'p26', name: 'Megabass Vision 110', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait', species: ['achigan', 'dore'], price: 28 },
  { id: 'p27', name: 'Rapala Jigging Rap', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig', species: ['dore'], price: 14 },
  { id: 'p28', name: 'Northland Bro-Bug Jig', imageFile: 'jig.jpg', type: 'jig', typeFR: 'Jig', species: ['dore'], price: 8 },
  { id: 'p29', name: 'Husky Jerk HJ12', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait', species: ['dore'], price: 16 },
  { id: 'p30', name: 'Northland Crawler Harness', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner', species: ['dore'], price: 22 },
  { id: 'p31', name: 'Mepps Aglia #3', imageFile: 'spinner.jpg', type: 'spinner', typeFR: 'Spinner', species: ['truite'], price: 10 },
  { id: 'p32', name: 'Thomas Buoyant Spoon', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère', species: ['truite'], price: 9 },
  { id: 'p33', name: 'Rapala Original Floater', imageFile: 'crankbait.jpg', type: 'crankbait', typeFR: 'Crankbait', species: ['truite'], price: 12 },
  { id: 'p34', name: 'Acme Little Cleo', imageFile: 'spoon.jpg', type: 'cuillere', typeFR: 'Cuillère', species: ['truite'], price: 8 },
]
