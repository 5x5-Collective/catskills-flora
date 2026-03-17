export interface Species {
  id: number;
  commonName: string;
  latinName: string;
  family: string;
  bloomMonths: string;
  habitat: string[];
  rarity: 'common' | 'uncommon' | 'rare';
  discovered: boolean;
  description: string;
  elevation: string;
  catskillsNotes: string;
}

export const speciesData: Species[] = [
  {
    id: 1,
    commonName: "White Trillium",
    latinName: "Trillium grandiflorum",
    family: "Melanthiaceae",
    bloomMonths: "April-May",
    habitat: ["Forest", "Woodland"],
    rarity: "common",
    discovered: true,
    description: "A stunning spring ephemeral with three pure white petals that fade to pink with age. The flowers rise above three broad leaves in a whorl. One of the most beloved wildflowers of the eastern deciduous forest.",
    elevation: "500-3,500 ft",
    catskillsNotes: "Abundant in rich, moist forests throughout the Catskills. Look for large colonies on north-facing slopes in mid-spring. The transformation from white to pink marks the passage of the season."
  },
  {
    id: 2,
    commonName: "Wild Columbine",
    latinName: "Aquilegia canadensis",
    family: "Ranunculaceae",
    bloomMonths: "April-June",
    habitat: ["Rocky outcrops", "Cliffs"],
    rarity: "common",
    discovered: true,
    description: "Delicate nodding flowers with red outer sepals and yellow inner petals, featuring distinctive backward-pointing spurs. The plant's ability to grow in rocky crevices makes it a favorite of hummingbirds.",
    elevation: "300-3,000 ft",
    catskillsNotes: "Often found clinging to rocky ledges and cliff faces, especially along stream gorges. The red and yellow blooms are perfectly adapted for ruby-throated hummingbirds returning from migration."
  },
  {
    id: 3,
    commonName: "Bloodroot",
    latinName: "Sanguinaria canadensis",
    family: "Papaveraceae",
    bloomMonths: "March-April",
    habitat: ["Forest floor", "Woodland"],
    rarity: "common",
    discovered: true,
    description: "One of the earliest spring ephemerals, featuring pristine white flowers with golden centers. Named for its red-orange sap that Native Americans used as dye. Each flower emerges wrapped in a single lobed leaf.",
    elevation: "400-2,500 ft",
    catskillsNotes: "Among the first flowers to appear in Catskills forests, often blooming before the last snow melts. The flowers last only a few days but signal the true arrival of spring in the mountains."
  },
  {
    id: 4,
    commonName: "Trout Lily",
    latinName: "Erythronium americanum",
    family: "Liliaceae",
    bloomMonths: "April-May",
    habitat: ["Forest floor", "Floodplain"],
    rarity: "common",
    discovered: true,
    description: "Yellow, nodding lily-like flowers rise above distinctive mottled leaves that resemble a brown trout's markings. Forms large colonies through underground corms, though only mature plants produce flowers.",
    elevation: "300-2,800 ft",
    catskillsNotes: "Creates vast carpets of mottled foliage on Catskills forest floors. The name references both the speckled leaves and the timing of blooms coinciding with trout season."
  },
  {
    id: 5,
    commonName: "Pink Lady's Slipper",
    latinName: "Cypripedium acaule",
    family: "Orchidaceae",
    bloomMonths: "May-June",
    habitat: ["Acidic forest", "Pine-oak woodland"],
    rarity: "uncommon",
    discovered: true,
    description: "A native orchid featuring a distinctive pink, pouch-shaped flower rising between two large basal leaves. Requires specific mycorrhizal fungi to survive and can take up to 16 years to bloom from seed.",
    elevation: "500-3,200 ft",
    catskillsNotes: "Found in acidic soils under hemlock and oak. A treasured find for botanists, these orchids are indicators of undisturbed forest. Never pick or transplant—they cannot survive without their fungal partners."
  },
  {
    id: 6,
    commonName: "Bee Balm",
    latinName: "Monarda didyma",
    family: "Lamiaceae",
    bloomMonths: "July-August",
    habitat: ["Streamside", "Moist meadow"],
    rarity: "common",
    discovered: false,
    description: "Scarlet, spiky flower heads with tubular flowers arranged in whorls. A member of the mint family with aromatic foliage. The flowers are irresistible to hummingbirds and butterflies.",
    elevation: "400-3,500 ft",
    catskillsNotes: "Brightens mountain streams and wet meadows in midsummer. The leaves make an excellent tea (Oswego tea) and were used by colonists during the Revolutionary War as a substitute for imported tea."
  },
  {
    id: 7,
    commonName: "Black-eyed Susan",
    latinName: "Rudbeckia hirta",
    family: "Asteraceae",
    bloomMonths: "June-September",
    habitat: ["Meadow", "Field"],
    rarity: "common",
    discovered: false,
    description: "Cheerful yellow-orange ray flowers surrounding a dark brown central cone. The hairy stems and leaves give the plant a rough texture. A tough, drought-tolerant wildflower that thrives in disturbed sites.",
    elevation: "300-2,500 ft",
    catskillsNotes: "Abundant in Catskills meadows and old fields from early summer through fall. Often one of the first flowers to colonize cleared areas, creating golden waves across mountain pastures."
  },
  {
    id: 8,
    commonName: "Cardinal Flower",
    latinName: "Lobelia cardinalis",
    family: "Campanulaceae",
    bloomMonths: "July-September",
    habitat: ["Wetland", "Stream bank"],
    rarity: "uncommon",
    discovered: false,
    description: "Stunning spikes of brilliant scarlet tubular flowers that seem to glow in shaded wetlands. The intense red color is specifically adapted to attract hummingbirds, which are the primary pollinators.",
    elevation: "300-2,000 ft",
    catskillsNotes: "A spectacular sight along Catskills streams and wet ditches in late summer. The vivid red stands out dramatically against the green streamside vegetation. Watch for hummingbirds visiting the blooms."
  },
  {
    id: 9,
    commonName: "Joe-Pye Weed",
    latinName: "Eutrochium purpureum",
    family: "Asteraceae",
    bloomMonths: "July-September",
    habitat: ["Meadow", "Streamside"],
    rarity: "common",
    discovered: false,
    description: "Tall, stately plants topped with large, dome-shaped clusters of dusty pink-purple flowers. Named for a Native American healer who used the plant medicinally. A magnet for butterflies and bees.",
    elevation: "400-3,000 ft",
    catskillsNotes: "Towers over late summer meadows and moist areas, often reaching 6-7 feet tall. The vanilla-scented flowers are a favorite of monarch butterflies during their fall migration through the Catskills."
  },
  {
    id: 10,
    commonName: "Blue-stemmed Goldenrod",
    latinName: "Solidago caesia",
    family: "Asteraceae",
    bloomMonths: "August-October",
    habitat: ["Forest", "Woodland edge"],
    rarity: "common",
    discovered: false,
    description: "Unlike most goldenrods that prefer sun, this species thrives in woodland shade. Small yellow flower clusters appear in leaf axils along distinctive blue-green, arching stems.",
    elevation: "400-3,500 ft",
    catskillsNotes: "A graceful goldenrod that brings autumn gold to shaded Catskills forests. The arching stems with their characteristic blue-purple bloom create elegant woodland accents through October."
  },
  {
    id: 11,
    commonName: "Bottle Gentian",
    latinName: "Gentiana clausa",
    family: "Gentianaceae",
    bloomMonths: "August-October",
    habitat: ["Meadow", "Wetland"],
    rarity: "uncommon",
    discovered: false,
    description: "Deep blue-purple flowers that remain closed like bottles throughout their bloom. Only large bumblebees are strong enough to force their way inside to pollinate, making this a specialized relationship.",
    elevation: "500-3,000 ft",
    catskillsNotes: "A late-season treasure of Catskills wet meadows. The bottle-like flowers resist opening, and watching bumblebees struggle to enter is a remarkable sight in the autumn landscape."
  },
  {
    id: 12,
    commonName: "Round-lobed Hepatica",
    latinName: "Hepatica americana",
    family: "Ranunculaceae",
    bloomMonths: "March-April",
    habitat: ["Forest", "Rocky slope"],
    rarity: "common",
    discovered: false,
    description: "Among the first spring wildflowers, with delicate blue, white, or pink flowers appearing before new leaves emerge. The three-lobed leaves persist through winter, often purple-tinged beneath.",
    elevation: "400-2,800 ft",
    catskillsNotes: "Watch for these tiny blooms pushing through leaf litter in late March, often while snow still lingers. The previous year's leaves, weathered and maroon-backed, provide contrast to the fresh spring flowers."
  },
  {
    id: 13,
    commonName: "Jewelweed",
    latinName: "Impatiens capensis",
    family: "Balsaminaceae",
    bloomMonths: "June-September",
    habitat: ["Wetland", "Stream bank"],
    rarity: "common",
    discovered: false,
    description: "Orange, spotted, trumpet-shaped flowers dangle from succulent stems. When ripe, the seed capsules explode at the slightest touch, flinging seeds several feet. The sap is a traditional remedy for poison ivy.",
    elevation: "300-3,500 ft",
    catskillsNotes: "Forms dense stands along Catskills streams and in wet areas. The leaves appear silver when submerged in water, giving the plant its jewel-like name. Hummingbirds feast on the nectar-rich flowers."
  },
  {
    id: 14,
    commonName: "Black Cohosh",
    latinName: "Actaea racemosa",
    family: "Ranunculaceae",
    bloomMonths: "June-August",
    habitat: ["Forest", "Woodland"],
    rarity: "uncommon",
    discovered: false,
    description: "Tall, wandlike spires of small white flowers rise above compound leaves. The flowers have a distinctive, slightly unpleasant odor. Long used in traditional medicine, it's now threatened by overharvesting.",
    elevation: "500-2,800 ft",
    catskillsNotes: "Found in rich Catskills forests, the tall white flower spikes create ghostly presences in the summer woodland understory. Please observe but never harvest—wild populations are declining."
  },
  {
    id: 15,
    commonName: "Pipsissewa",
    latinName: "Chimaphila umbellata",
    family: "Ericaceae",
    bloomMonths: "June-August",
    habitat: ["Forest", "Coniferous woodland"],
    rarity: "rare",
    discovered: false,
    description: "A small, evergreen subshrub with waxy, nodding pink flowers and glossy, dark green leaves. The name comes from the Cree word meaning 'it breaks into small pieces,' referring to its traditional use for kidney stones.",
    elevation: "800-3,500 ft",
    catskillsNotes: "A rare treasure of Catskills conifer forests. This diminutive plant is easily overlooked but rewards careful observers with its perfect, waxy blooms in the deep shade of spruce-fir forests."
  }
];
