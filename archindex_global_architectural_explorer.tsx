import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Building2, MapPin, Ruler, Layers, Calendar, 
  ExternalLink, Download, Heart, Grid, Table as TableIcon, 
  X, Filter, Sparkles, Compass, ArrowUpDown, ChevronRight,
  Share2, Award, Info, SlidersHorizontal, Check
} from 'lucide-react';

// Comprehensive database of all landmark buildings discussed
const BUILDINGS_DATA = [
  {
    id: "toha-1",
    name: "ToHA 1 (Totseret HaAretz 1)",
    city: "Tel Aviv",
    country: "Israel",
    architects: ["Ron Arad Architects", "Yashar Architects"],
    primaryArchitect: "Ron Arad / Yashar Architects",
    typology: "Office & Commercial",
    heightMeters: 107,
    heightFeet: 351,
    floors: 29,
    yearBuilt: 2019,
    rehab: "Delivered in 2019; ongoing smart-building integration achieving regional benchmark LEED Platinum.",
    style: "Contemporary / Parametric",
    address: "6 Totseret HaAretz St, Tel Aviv-Yafo, Israel",
    imageUrl: "https://images.adsttc.com/media/images/5d13/c96f/284d/d1e4/6800/00eb/newsletter/feature_-_8771_06.jpg",
    explanation: "An iceberg-inspired structural geometry engineered to drastically minimize the street footprint and thermal radiation. The tower rests upon just three structural 'legs' housing primary mechanical equipment, reserving 95% of the street plane for public botanical gardens. The volume widens up to 3,400 m² floorplates at mid-height before tapering inward at the crown, wrapped in an angled faceted skin of custom Dekton sintered stone panels and high-efficiency glass around an open central atrium.",
    notableTenant: "Akamai, WeWork, High-Tech Consortia",
    coordinates: "32.0725,34.7964"
  },
  {
    id: "midtown-center",
    name: "Midtown Center",
    city: "Washington DC",
    country: "USA",
    architects: ["SHoP Architects"],
    primaryArchitect: "SHoP Architects",
    typology: "Office & Commercial",
    heightMeters: 43,
    heightFeet: 140,
    floors: 14,
    yearBuilt: 2018,
    rehab: "Constructed on the former Washington Post HQ site; achieved LEED Platinum with continuous urban courtyard activation.",
    style: "Contemporary",
    address: "1100 15th St NW, Washington, DC 20005, USA",
    imageUrl: "https://static-2026.dezeen.com/uploads/2018/10/midtown-center-shop-architects-washington-dc-usa_dezeen_2364_hero-852x479.jpg",
    explanation: "Reinterprets Washington D.C.'s strict 1910 Height of Buildings Act restrictions. Rather than a monolithic solid block, the mass is fractured into two faceted wings joined across an open public plaza by three suspended, sculptural pedestrian skybridges. The exterior envelope features micro-folded, extruded copper-toned bronze and glass fins calibrated through solar path simulations to shade interiors while optimizing daylighting.",
    notableTenant: "Fannie Mae Global Headquarters",
    coordinates: "38.9042,-77.0346"
  },
  {
    id: "one-congress",
    name: "One Congress (Bulfinch Crossing)",
    city: "Boston",
    country: "USA",
    architects: ["Pelli Clarke & Partners", "CBT Architects"],
    primaryArchitect: "César Pelli (Pelli Clarke & Partners)",
    typology: "Office & Commercial",
    heightMeters: 183.2,
    heightFeet: 600,
    floors: 43,
    yearBuilt: 2023,
    rehab: "Completed 2023 as the centerpiece of the Bulfinch Crossing master plan; certified LEED Platinum and WELL Gold.",
    style: "Contemporary",
    address: "1 Congress St, Boston, MA 02114, USA",
    imageUrl: "https://static-2026.dezeen.com/uploads/2019/06/one-congress-pelli-clarke-pelli-architects-news-architecture-tower-boston-massachusetts-usa_dezeen_2364_sq.jpg",
    explanation: "Features an expressive, billowing sail-like curtain wall that gracefully chamfers and curves as it climbs, minimizing wind vortex loads while providing panoramic harbor and Charles River vistas. At the 11th floor, the skyscraper steps back onto an expansive 1-acre private landscaped outdoor roof terrace elevated over the re-engineered Government Center transit garage.",
    notableTenant: "State Street Corporation Headquarters",
    coordinates: "42.3615,-71.0594"
  },
  {
    id: "the-shard",
    name: "The Shard",
    city: "London",
    country: "UK",
    architects: ["Renzo Piano Building Workshop (RPBW)"],
    primaryArchitect: "Renzo Piano (RPBW)",
    typology: "Mixed-Use / Supertall",
    heightMeters: 309.6,
    heightFeet: 1016,
    floors: 72,
    yearBuilt: 2012,
    rehab: "LEED Platinum operation, continuous high-efficiency MEP upgrades and viewing gallery modernization (2020–2023).",
    style: "Neo-Futurism / High-Tech",
    address: "32 London Bridge St, London SE1 9SG, UK",
    imageUrl: "https://www.the-shard.com/media/ep3hy4eh/jasonhawkes-6282.jpg",
    explanation: "Designed as an iconic 'vertical city' integrating office spaces, restaurants, a Shangri-La Hotel, and an open-air public observatory. Clad in eight sloping shards of extra-white low-iron glass that do not touch at the summit, allowing the spire to breathe and visually dissolve into London's changing sky.",
    notableTenant: "Shangri-La, Al Jazeera, Kraft Heinz",
    coordinates: "51.5045,-0.0865"
  },
  {
    id: "the-gherkin",
    name: "30 St Mary Axe (The Gherkin)",
    city: "London",
    country: "UK",
    architects: ["Foster + Partners"],
    primaryArchitect: "Foster + Partners",
    typology: "Office & Commercial",
    heightMeters: 180,
    heightFeet: 591,
    floors: 41,
    yearBuilt: 2003,
    rehab: "Modernized interior lobby, security dispatch, and aerodynamic lightwells upgraded in 2018–2020 by Safra Group.",
    style: "High-Tech / Diagrid",
    address: "30 St Mary Axe, London EC3A 8EP, UK",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8e/30_St_Mary_Axe%2C_%27Gherkin%27.JPG",
    explanation: "Radical high-tech prolate spheroid form stabilized by an exterior diagonal steel diagrid cage. The building's aerodynamic tapering reduces wind buffeting at ground level, while spiraling double-glazed light shafts channel air through the interior floorplates, reducing HVAC consumption by nearly 50%.",
    notableTenant: "Swiss Re, Kirkland & Ellis",
    coordinates: "51.5144,-0.0803"
  },
  {
    id: "22-bishopsgate",
    name: "22 Bishopsgate",
    city: "London",
    country: "UK",
    architects: ["PLP Architecture"],
    primaryArchitect: "PLP Architecture",
    typology: "Office & Commercial",
    heightMeters: 278.2,
    heightFeet: 913,
    floors: 62,
    yearBuilt: 2020,
    rehab: "Delivered with BREEAM Excellent; opened Horizon 22 (Europe's highest free public viewing platform) in 2023.",
    style: "Contemporary",
    address: "22 Bishopsgate, London EC2N 4BQ, UK",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/22.Reza_05.jpg",
    explanation: "The largest and tallest commercial office tower in the City of London financial cluster. Structured as a 22-tier 'vertical village' with multifaceted glass curtain walls stepped specifically to preserve historic sightlines toward St Paul's Cathedral.",
    notableTenant: "Apple UK, AXA IM, Hiscox, Cooley",
    coordinates: "51.5146,-0.0833"
  },
  {
    id: "one-canada-square",
    name: "One Canada Square",
    city: "London",
    country: "UK",
    architects: ["César Pelli & Associates"],
    primaryArchitect: "César Pelli (Pelli Clarke & Partners)",
    typology: "Office & Commercial",
    heightMeters: 236,
    heightFeet: 774,
    floors: 50,
    yearBuilt: 1991,
    rehab: "Comprehensive mechanical plant retrofits (2008–2012) and deep-energy LED crown illumination overhaul (2020–2023).",
    style: "Postmodern",
    address: "1 Canada Square, Canary Wharf, London E14 5AA, UK",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/London_MMB_S6_Canary_Wharf.jpg",
    explanation: "The architectural centerpiece and pioneer of the Canary Wharf financial redevelopment. Wrapped in textured stainless-steel cladding with flush windows, terminating in a monumental 40-meter pyramid roof equipped with an iconic flashing aircraft warning beacon.",
    notableTenant: "Bank of New York Mellon, State Street",
    coordinates: "51.5050,-0.0195"
  },
  {
    id: "heron-tower",
    name: "Salesforce Tower (Heron Tower)",
    city: "London",
    country: "UK",
    architects: ["Kohn Pedersen Fox (KPF)"],
    primaryArchitect: "Kohn Pedersen Fox (KPF)",
    typology: "Office & Commercial",
    heightMeters: 230,
    heightFeet: 755,
    floors: 46,
    yearBuilt: 2011,
    rehab: "Smart elevator dispatch modernization and ongoing environmental performance tuning; BREEAM Excellent.",
    style: "High-Tech / Structural",
    address: "110 Bishopsgate, London EC2N 4AY, UK",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Heron_Tower%2C_Bishopsgate%2C_London.JPG",
    explanation: "Employs an exterior stainless steel structural skeleton with an articulated southern service core clad in photovoltaic cells. Features a triple-height atrium holding a 70,000-liter marine aquarium at street level and panoramic scenic lifts climbing to SUSHISAMBA and Duck & Waffle.",
    notableTenant: "Salesforce, Landmark Offices, SUSHISAMBA",
    coordinates: "51.5163,-0.0818"
  },
  {
    id: "the-cheesegrater",
    name: "The Leadenhall Building (The Cheesegrater)",
    city: "London",
    country: "UK",
    architects: ["Rogers Stirk Harbour + Partners"],
    primaryArchitect: "Richard Rogers (RSHP)",
    typology: "Office & Commercial",
    heightMeters: 224.5,
    heightFeet: 737,
    floors: 52,
    yearBuilt: 2014,
    rehab: "Bolt monitoring and structural maintenance (2015–2016); ground-level public galleria revitalization (2022).",
    style: "High-Tech / Inside-Out",
    address: "122 Leadenhall St, London EC3V 4AB, UK",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Cheesegrater_and_Gherkin.jpg",
    explanation: "Instantly recognizable by its sharp 10-degree wedge profile specifically conceived to preserve the protected view corridor of St Paul's Cathedral from Fleet Street. Built with an external steel perimeter megaframe and a detached yellow-accented northern service core holding exposed scenic glass lifts.",
    notableTenant: "Aon, MS Amlin, Britannia",
    coordinates: "51.5138,-0.0822"
  },
  {
    id: "8-bishopsgate",
    name: "8 Bishopsgate",
    city: "London",
    country: "UK",
    architects: ["WilkinsonEyre"],
    primaryArchitect: "WilkinsonEyre",
    typology: "Office & Commercial",
    heightMeters: 203.6,
    heightFeet: 668,
    floors: 51,
    yearBuilt: 2023,
    rehab: "Newly inaugurated with BREEAM Outstanding and EPC A ratings; opened 'The Lookout' public viewing gallery on floor 50 in late 2023.",
    style: "Contemporary / Stacked",
    address: "8 Bishopsgate, London EC2N 4BQ, UK",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/8_Bishopsgate%2C_11_November_2024.jpg",
    explanation: "Composed of a series of stacked, articulated volumetric blocks that step back up the skyline. This configuration creates landscaped open-air garden terraces while reducing structural downdraft wind shears at street level.",
    notableTenant: "Stanhope, Mitsubishi Estate, Global Law",
    coordinates: "51.5141,-0.0837"
  },
  {
    id: "the-scalpel",
    name: "The Scalpel (52 Lime Street)",
    city: "London",
    country: "UK",
    architects: ["Kohn Pedersen Fox (KPF)"],
    primaryArchitect: "Kohn Pedersen Fox (KPF)",
    typology: "Office & Commercial",
    heightMeters: 190,
    heightFeet: 623,
    floors: 36,
    yearBuilt: 2018,
    rehab: "Smart building automation and BREEAM Excellent environmental compliance tuning (2021–2024).",
    style: "Contemporary / Faceted",
    address: "52 Lime St, London EC3M 7AF, UK",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/The_Scalpel%2C_August_2018.jpg",
    explanation: "A geometric crystalline skyscraper designed with an inclined northern glass facade that leans backward at an angle, countering the slope of The Leadenhall Building to frame St Paul’s protected sightline while mirroring the historic Lloyd's building opposite.",
    notableTenant: "WR Berkley, BPL Global, Axis Capital",
    coordinates: "51.5133,-0.0817"
  },
  {
    id: "20-fenchurch",
    name: "20 Fenchurch Street (Walkie Talkie)",
    city: "London",
    country: "UK",
    architects: ["Rafael Viñoly"],
    primaryArchitect: "Rafael Viñoly",
    typology: "Office & Commercial",
    heightMeters: 160,
    heightFeet: 525,
    floors: 37,
    yearBuilt: 2014,
    rehab: "Installed external architectural brise-soleil sun louvers on south face (2015) to disperse solar thermal convergence; Sky Garden refreshments (2022).",
    style: "Contemporary / Flared",
    address: "20 Fenchurch St, London EC3M 3BY, UK",
    imageUrl: "https://www.visitlondon.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/walkie-talkie/20_fenchurch_street_walkie_talkie_shutterstock_david_burrows19201080.jpg",
    explanation: "Distinctive flared silhouette that expands floorplate surface area as it ascends toward the top floors to maximize premium high-altitude rental yields, crowned by an immense three-storey public glazed atrium containing London's Sky Garden botanical conservatory.",
    notableTenant: "Sky Garden, Tokio Marine, Liberty Mutual",
    coordinates: "51.5113,-0.0836"
  },
  {
    id: "lloyds-building",
    name: "Lloyd's Building (The Inside-Out Building)",
    city: "London",
    country: "UK",
    architects: ["Richard Rogers (Rogers Stirk Harbour + Partners)"],
    primaryArchitect: "Richard Rogers (RSHP)",
    typology: "Office & Commercial",
    heightMeters: 88,
    heightFeet: 289,
    floors: 14,
    yearBuilt: 1986,
    rehab: "Awarded Grade I listing in 2011; comprehensive stainless-steel conduit refurbishment and underfloor MEP restoration (2019–2022).",
    style: "High-Tech / Bowellism",
    address: "1 Lime St, London EC3M 7HA, UK",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Lloyds_building_taken_2011.jpg",
    explanation: "The ultimate realization of 'inside-out' architectural functionalism. All services—scenic glass elevators, water pipes, electrical conduits, and air ducts—are mounted to the exterior perimeter inside stainless-steel satellite towers, preserving an uninterrupted 60-meter-tall barrel-vaulted central atrium.",
    notableTenant: "Lloyd's of London Insurance Syndicate",
    coordinates: "51.5130,-0.0825"
  },
  {
    id: "one-franklin-square",
    name: "One Franklin Square",
    city: "Washington DC",
    country: "USA",
    architects: ["Hartman-Cox Architects", "Dewberry & Davis"],
    primaryArchitect: "Hartman-Cox Architects",
    typology: "Office & Commercial",
    heightMeters: 64,
    heightFeet: 210,
    floors: 12,
    yearBuilt: 1990,
    rehab: "$30M comprehensive modernization in 2015–2016 to house The Washington Post newsrooms with state-of-the-art media broadcast facilities.",
    style: "Postmodern Classical",
    address: "1301 K St NW, Washington, DC 20005, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f8/One_Franklin_Square_-_November_2023.jpg",
    explanation: "The tallest commercial office building in Washington, D.C. by roof height. Built in a grand Postmodern classical vocabulary with twin copper-roofed pyramidal towers and light-granite curtain walls that dominate the northern border of Franklin Square.",
    notableTenant: "The Washington Post Worldwide Headquarters",
    coordinates: "38.9025,-77.0303"
  },
  {
    id: "old-post-office-dc",
    name: "Old Post Office Pavilion (Waldorf Astoria DC)",
    city: "Washington DC",
    country: "USA",
    architects: ["Willoughby J. Edbrooke"],
    primaryArchitect: "Willoughby J. Edbrooke",
    typology: "Mixed-Use / Historic Commercial",
    heightMeters: 96,
    heightFeet: 315,
    floors: 12,
    yearBuilt: 1899,
    rehab: "Rescued in 1983; $200M historic luxury conversion (2014–2016); rebranded and refreshed as the Waldorf Astoria Washington DC in 2022.",
    style: "Richardsonian Romanesque",
    address: "1100 Pennsylvania Ave NW, Washington, DC 20004, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Waldorf_Astoria_Washington_DC_-_Old_Post_Office_%2853840296568%29.jpg",
    explanation: "Monumental Richardsonian Romanesque civic masterpiece crafted from loadbearing granite blocks. Features a soaring 9-storey glass-skylit central internal light court and a 315-foot clock tower that stands as the third-tallest structure in the District.",
    notableTenant: "Waldorf Astoria Washington DC, Clock Tower Museum",
    coordinates: "38.8938,-77.0278"
  },
  {
    id: "700-eleventh-street",
    name: "700 Eleventh Street",
    city: "Washington DC",
    country: "USA",
    architects: ["Hartman-Cox Architects"],
    primaryArchitect: "Hartman-Cox Architects",
    typology: "Office & Commercial",
    heightMeters: 60.7,
    heightFeet: 200,
    floors: 13,
    yearBuilt: 1992,
    rehab: "Extensive lobby repositioning, conference hall modernization, and HVAC energy infrastructure retrofits (2017–2020).",
    style: "Postmodern",
    address: "700 11th St NW, Washington, DC 20001, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b5/700_Eleventh_Street_Washington_DC_2014_09_08_04.JPG",
    explanation: "Clad in flame-finished granite and precast masonry, engineered precisely to the volumetric zoning limit allowable under the Height of Buildings Act. Seamlessly integrates directly over the primary entrance portal of the Metro Center subway transit interchange.",
    notableTenant: "Williams & Connolly LLP, Global Finance",
    coordinates: "38.8990,-77.0272"
  },
  {
    id: "franklin-court-dc",
    name: "Franklin Court (1099 14th Street NW)",
    city: "Washington DC",
    country: "USA",
    architects: ["Kohn Pedersen Fox (KPF)"],
    primaryArchitect: "Kohn Pedersen Fox (KPF)",
    typology: "Office & Commercial",
    heightMeters: 47.4,
    heightFeet: 156,
    floors: 11,
    yearBuilt: 1992,
    rehab: "Multimillion-dollar repositioning in 2018–2021 creating a 2-storey marble lobby, wellness facilities, and fresh air filtration systems.",
    style: "Postmodern",
    address: "1099 14th St NW, Washington, DC 20005, USA",
    imageUrl: "https://images1.loopnet.com/i2/859_cXICOpoPz11ZULKJidSk_wyM2MkqnHg0aD_vEq4/112/image.jpg",
    explanation: "Postmodern corporate mid-rise defined by warm buff sandstone cladding, deeply recessed punched windows, and a stepped vertical pavilion that terminates in an illuminated rooftop architectural cupola lantern.",
    notableTenant: "Legal and Public Policy Institutions",
    coordinates: "38.9038,-77.0321"
  },
  {
    id: "watergate-complex",
    name: "The Watergate Complex",
    city: "Washington DC",
    country: "USA",
    architects: ["Luigi Moretti"],
    primaryArchitect: "Luigi Moretti",
    typology: "Mixed-Use Commercial",
    heightMeters: 48,
    heightFeet: 157,
    floors: 14,
    yearBuilt: 1971,
    rehab: "Comprehensive $125M reconstruction and hotel modernization in 2014–2016; continuing concrete envelope restorations.",
    style: "Italian Modernism / Structural",
    address: "2600 Virginia Ave NW, Washington, DC 20037, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/64/Watergate_complex%2C_2025.jpg",
    explanation: "Rebelled against Washington's rigid rectilinear street grid by using fluid, sinusoidal curved concrete facades with cantilevered balconies overlooking the Potomac River. Historic site of the 1972 Democratic National Committee break-in.",
    notableTenant: "The Watergate Hotel, Corporate Offices",
    coordinates: "38.8992,-77.0547"
  },
  {
    id: "john-hancock-boston",
    name: "200 Clarendon (John Hancock Tower)",
    city: "Boston",
    country: "USA",
    architects: ["Henry N. Cobb (I. M. Pei & Partners)"],
    primaryArchitect: "I. M. Pei (Pei Cobb Freed & Partners)",
    typology: "Office & Commercial",
    heightMeters: 240.8,
    heightFeet: 790,
    floors: 60,
    yearBuilt: 1976,
    rehab: "Replacement of all 10,344 curtain windows (1973–1975); multimillion-dollar lobby, turnstiles, and elevator overhauls (2015–2018).",
    style: "Late Modernist / Minimalist",
    address: "200 Clarendon St, Boston, MA 02116, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/56/John_Hancock_Tower.jpg",
    explanation: "Minimalist masterwork with a rhomboid parallelogram footprint wrapped in uniform, highly reflective cobalt glass that mirrors historic Trinity Church in Copley Square. Stabilized against wind shear by two 300-ton tuned mass dampers on the 58th floor.",
    notableTenant: "Bain Capital, EY, John Hancock Financial",
    coordinates: "42.3499,-71.0754"
  },
  {
    id: "prudential-tower",
    name: "Prudential Tower",
    city: "Boston",
    country: "USA",
    architects: ["Charles Luckman Associates"],
    primaryArchitect: "Charles Luckman Associates",
    typology: "Office & Commercial",
    heightMeters: 228.6,
    heightFeet: 751,
    floors: 52,
    yearBuilt: 1964,
    rehab: "Retail mall expansions unified in the 2000s; full top-floor observatory redevelopment into 'View Boston' in 2023.",
    style: "International Style",
    address: "800 Boylston St, Boston, MA 02199, USA",
    imageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Prudential_Tower_Panorama.jpg/250px-Prudential_Tower_Panorama.jpg",
    explanation: "International Style corporate monolith that anchored Boston's post-war high-rise boom. Built over Massachusetts Turnpike rail corridors with continuous vertical aluminium mullions resting on an urban retail mall podium.",
    notableTenant: "View Boston, Prudential Insurance",
    coordinates: "42.3471,-71.0827"
  },
  {
    id: "winthrop-center",
    name: "Winthrop Center",
    city: "Boston",
    country: "USA",
    architects: ["Handel Architects"],
    primaryArchitect: "Handel Architects",
    typology: "Mixed-Use / Commercial",
    heightMeters: 211.3,
    heightFeet: 693,
    floors: 53,
    yearBuilt: 2023,
    rehab: "Inaugurated in 2023; stands as the world's largest commercial building certified Passive House standard paired with LEED Platinum.",
    style: "Contemporary",
    address: "115 Federal St, Boston, MA 02110, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/07/Winthrop_Center_completed.jpg",
    explanation: "High-performance faceted glass curtain tower designed around radical energy conservation. Features 'The Connector', an open-air public breezeway and interior community forum at ground level linking Devonshire and Federal Streets.",
    notableTenant: "McKinsey & Co, Cambridge Associates",
    coordinates: "42.3551,-71.0578"
  },
  {
    id: "one-international-place",
    name: "One International Place",
    city: "Boston",
    country: "USA",
    architects: ["Philip Johnson and John Burgee"],
    primaryArchitect: "Philip Johnson and John Burgee",
    typology: "Office & Commercial",
    heightMeters: 182.9,
    heightFeet: 600,
    floors: 46,
    yearBuilt: 1987,
    rehab: "Multimillion-dollar lobby and central lightwell winter garden modernization completed in 2018–2021 with smart lighting.",
    style: "Postmodern",
    address: "100 Oliver St, Boston, MA 02110, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Internationalplace.jpg",
    explanation: "Composed of three cylindrical granite shafts connected by rectangular office volumes. Clad in polished Spanish rose granite with palatial Palladian-arched windows and topped with a decorative classical pyramid roof.",
    notableTenant: "Citigroup, UBS, Morgan Stanley",
    coordinates: "42.3556,-71.0531"
  },
  {
    id: "one-boston-place",
    name: "One Boston Place (BNY Mellon Center)",
    city: "Boston",
    country: "USA",
    architects: ["Pietro Belluschi", "Emery Roth & Sons"],
    primaryArchitect: "Pietro Belluschi",
    typology: "Office & Commercial",
    heightMeters: 183.2,
    heightFeet: 601,
    floors: 41,
    yearBuilt: 1970,
    rehab: "The first building in the world to earn LEED Gold for Existing Buildings (EB: O&M) in 2008; lobby upgraded in 2020.",
    style: "Structural Expressionism",
    address: "201 Washington St, Boston, MA 02108, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/47/One_Boston_Place_2017.jpg",
    explanation: "Pioneering structural expressionist skyscraper recognizable by its exposed exterior diagonal steel bracing, dark bronze-tinted glass curtain wall, and open-truss rooftop mechanical crown.",
    notableTenant: "BNY Mellon, Financial Consultancies",
    coordinates: "42.3586,-71.0583"
  },
  {
    id: "one-world-trade",
    name: "One World Trade Center",
    city: "New York",
    country: "USA",
    architects: ["David Childs (Skidmore, Owings & Merrill)"],
    primaryArchitect: "Skidmore, Owings & Merrill (SOM)",
    typology: "Supertall / Commercial",
    heightMeters: 541.3,
    heightFeet: 1776,
    floors: 94,
    yearBuilt: 2014,
    rehab: "Base perimeter security enhancements, high-efficiency MEP optimization, and continuous tenant adaptation (2020–2023).",
    style: "Modernist / Chamfered",
    address: "285 Fulton St, New York, NY 10007, USA",
    imageUrl: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/One_World_Trade_Center_Building_%282021%29.jpg/250px-One_World_Trade_Center_Building_%282021%29.jpg",
    explanation: "Tallest skyscraper in the Western Hemisphere. Rises from a 200-foot cubic concrete base into eight elongated isosceles triangles, forming an octagonal center section that terminates in a stainless-steel ring and broadcast mast measuring exactly 1,776 feet.",
    notableTenant: "Condé Nast, One World Observatory",
    coordinates: "40.7127,-74.0134"
  },
  {
    id: "empire-state",
    name: "Empire State Building",
    city: "New York",
    country: "USA",
    architects: ["Shreve, Lamb & Harmon"],
    primaryArchitect: "Shreve, Lamb & Harmon",
    typology: "Historic Landmark / Commercial",
    heightMeters: 381,
    heightFeet: 1250,
    floors: 102,
    yearBuilt: 1931,
    rehab: "Celebrated $550M deep energy retrofit (2009–2011) reducing energy use by 38%; $165M multi-phase observatory redevelopment completed in 2019.",
    style: "Art Deco",
    address: "20 W 34th St, New York, NY 10001, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    explanation: "Constructed in just 410 days during the Great Depression. Framed in structural steel and clad in Indiana limestone with cast aluminium spandrels, characterized by elegant setbacks that conform to the 1916 Zoning Resolution and a crowning mooring mast.",
    notableTenant: "LinkedIn, Shutterstock, Observatory",
    coordinates: "40.7484,-73.9857"
  },
  {
    id: "chrysler-building",
    name: "Chrysler Building",
    city: "New York",
    country: "USA",
    architects: ["William Van Alen"],
    primaryArchitect: "William Van Alen",
    typology: "Art Deco / Commercial",
    heightMeters: 318.9,
    heightFeet: 1046,
    floors: 77,
    yearBuilt: 1930,
    rehab: "Comprehensive $100M spire, window, and masonry restoration in 1995–1996; ongoing core building infrastructure improvements.",
    style: "Art Deco",
    address: "405 Lexington Ave, New York, NY 10174, USA",
    imageUrl: "https://www.skyscraper.org/wordpress/wp-content/uploads/2023/03/Chrysler-Building-Crown.png",
    explanation: "The pinnacle of High Art Deco ornamentation. Adorned with car-radiator hood ornaments, winged eagle gargoyles, and an iconic terraced sunburst spire fabricated from secret Nirosta chrome-nickel stainless steel.",
    notableTenant: "Moses & Singer, Commercial Tenancies",
    coordinates: "40.7516,-73.9754"
  },
  {
    id: "seagram-building",
    name: "Seagram Building",
    city: "New York",
    country: "USA",
    architects: ["Ludwig Mies van der Rohe", "Philip Johnson"],
    primaryArchitect: "Ludwig Mies van der Rohe",
    typology: "Office & Commercial",
    heightMeters: 157,
    heightFeet: 515,
    floors: 38,
    yearBuilt: 1958,
    rehab: "Landmark bronze patination maintenance, lobby restoration, and mechanical upgrades in 2016–2020.",
    style: "International Style",
    address: "375 Park Ave, New York, NY 10152, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/99/Seagram_Building_%2835098307116%29.jpg",
    explanation: "The benchmark of corporate Modernism. Set back 100 feet from Park Avenue behind an open pink Vermont granite plaza with reflection fountains, wrapped in bronze mullions and amber-tinted glass with non-structural exterior bronze I-beams.",
    notableTenant: "The Grill, Centerbridge Partners",
    coordinates: "40.7588,-73.9719"
  },
  {
    id: "lever-house",
    name: "Lever House",
    city: "New York",
    country: "USA",
    architects: ["Gordon Bunshaft (Skidmore, Owings & Merrill)"],
    primaryArchitect: "Skidmore, Owings & Merrill (SOM)",
    typology: "Office & Commercial",
    heightMeters: 92,
    heightFeet: 302,
    floors: 21,
    yearBuilt: 1952,
    rehab: "Pioneering curtain wall replacement in 2001; complete $100M interior and infrastructure restoration in 2023 by SOM.",
    style: "International Style",
    address: "390 Park Ave, New York, NY 10022, USA",
    imageUrl: "https://leverhousenyc.com/wp-content/uploads/2022/05/TMRW.BP_.Leverhouse.View14.Hero_.Copyright.tmrw_.se_-1.jpg",
    explanation: "The building that introduced the blue-green glass curtain wall to the corporate world. Elevated on stainless-steel pilotis above an open courtyard, breaking the continuous masonry street wall of Park Avenue.",
    notableTenant: "Unilever legacy, Private Equity Firms",
    coordinates: "40.7594,-73.9723"
  },
  {
    id: "willis-tower",
    name: "Willis Tower (Sears Tower)",
    city: "Chicago",
    country: "USA",
    architects: ["Bruce Graham & Fazlur Rahman Khan (SOM)"],
    primaryArchitect: "Skidmore, Owings & Merrill (SOM)",
    typology: "Supertall / Commercial",
    heightMeters: 442.1,
    heightFeet: 1450,
    floors: 108,
    yearBuilt: 1973,
    rehab: "$500M comprehensive modernization by Gensler completed 2021, creating 'Catalog' (300,000 sq ft retail podium) and modernized Skydeck.",
    style: "Structural Expressionism",
    address: "233 S Wacker Dr, Chicago, IL 60606, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Sears_Tower%2C_Wacker_Drive_and_Jackson_Boulevard%2C_Chicago%2C_IL_-_54189600901.jpg",
    explanation: "Introduced the revolutionary 'bundled-tube' structural system. Composed of nine square steel tubes grouped together at the base that terminate at staggered setbacks (floors 50, 66, and 90), counteracting lateral wind shear with high material efficiency.",
    notableTenant: "United Airlines, Skydeck, Schiff Hardin",
    coordinates: "41.8789,-87.6359"
  },
  {
    id: "john-hancock-center",
    name: "875 North Michigan Avenue (John Hancock Center)",
    city: "Chicago",
    country: "USA",
    architects: ["Bruce Graham & Fazlur Rahman Khan (SOM)"],
    primaryArchitect: "Skidmore, Owings & Merrill (SOM)",
    typology: "Mixed-Use Commercial",
    heightMeters: 343.7,
    heightFeet: 1127,
    floors: 100,
    yearBuilt: 1969,
    rehab: "Base retail and plaza renovations; observatory transformed with 'TILT' dynamic viewing system in 2014.",
    style: "Structural Expressionism",
    address: "875 N Michigan Ave, Chicago, IL 60611, USA",
    imageUrl: "https://www.architecture.org/cdn-cgi/image/f=auto,w=780,q=80/https://images.architecture.org/api/v1/image/assets%2F49af4dfb0fbc43d58bf8ce407e839d74%2F3d7c1d6a56c0406db07242e54886c0e9",
    explanation: "Pioneered the exterior cross-braced (X-braced) tube system. The massive diagonal steel braces tie the perimeter columns together, allowing immense column-free open interior floors while resisting Chicago's lakefront wind gusts.",
    notableTenant: "360 CHICAGO, The Signature Room",
    coordinates: "41.8988,-87.6229"
  },
  {
    id: "crain-communications",
    name: "Crain Communications Building (The Diamond)",
    city: "Chicago",
    country: "USA",
    architects: ["Sheldon Schlegman (A. Epstein and Sons)"],
    primaryArchitect: "Sheldon Schlegman",
    typology: "Office & Commercial",
    heightMeters: 177.4,
    heightFeet: 580,
    floors: 41,
    yearBuilt: 1984,
    rehab: "Lobby, tenant amenities, conference facilities, and HVAC automation completely renovated in 2015–2019.",
    style: "Postmodern",
    address: "150 N Michigan Ave, Chicago, IL 60601, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Crain_Communications_Building_in_Chicago%2C_May_2016_%282%29.jpg",
    explanation: "Famous for its dramatically sliced 45-degree diagonal sloped glass facade and diamond-shaped silhouette oriented directly toward Millennium Park, nicknamed the 'Diamond Building'.",
    notableTenant: "Crain Communications, Financial Firms",
    coordinates: "41.8847,-87.6247"
  },
  {
    id: "transamerica-pyramid",
    name: "Transamerica Pyramid",
    city: "San Francisco",
    country: "USA",
    architects: ["William Pereira & Associates"],
    primaryArchitect: "William Pereira",
    typology: "Office & Commercial",
    heightMeters: 260,
    heightFeet: 853,
    floors: 48,
    yearBuilt: 1972,
    rehab: "A $400M restoration and site transformation completed in 2024 by SHVO and Foster + Partners, revitalizing the park and white quartz facade.",
    style: "Structural Expressionism",
    address: "600 Montgomery St, San Francisco, CA 94111, USA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Transamerica_Pyramid_from_Coit_Tower.jpg",
    explanation: "Four-sided structural expressionist pyramid clad in crushed white quartz panels. Flanked by two vertical wings housing elevators and mechanical smoke evacuation towers, built over a seismic truss frame designed to withstand major earthquakes.",
    notableTenant: "SHVO, Northwestern Mutual, Core Club",
    coordinates: "37.7952,-122.4028"
  },
  {
    id: "salesforce-tower-sf",
    name: "Salesforce Tower",
    city: "San Francisco",
    country: "USA",
    architects: ["Pelli Clarke Pelli Architects"],
    primaryArchitect: "César Pelli (Pelli Clarke & Partners)",
    typology: "Supertall / Commercial",
    heightMeters: 326.1,
    heightFeet: 1070,
    floors: 61,
    yearBuilt: 2018,
    rehab: "Inaugurated as the tallest tower in SF; integrates top-floor 'Ohana Floor' public lounge and Jim Campbell's LED crown art installation.",
    style: "Contemporary",
    address: "415 Mission St, San Francisco, CA 94105, USA",
    imageUrl: "https://www.bxp.com/wp-content/uploads/2021/03/Salesforce_Tower_SF_SF_HERO_MOBILE_EDIT-scaled.jpg",
    explanation: "An obelisk-shaped glass cylinder with gentle curves tapering to an open-air structural crown. Anchors the Transbay transit redevelopment with direct pedestrian skybridge access to the 5.4-acre rooftop park below.",
    notableTenant: "Salesforce Global HQ, Bain & Co, CBRE",
    coordinates: "37.7897,-122.3972"
  },
  {
    id: "apple-park",
    name: "Apple Park (The Ring)",
    city: "Cupertino",
    country: "USA",
    architects: ["Foster + Partners"],
    primaryArchitect: "Foster + Partners",
    typology: "Corporate Campus",
    heightMeters: 20,
    heightFeet: 66,
    floors: 4,
    yearBuilt: 2017,
    rehab: "Continuously optimized on-site renewable microgrid and native forest landscaping.",
    style: "High-Tech / Neo-Futuristic",
    address: "1 Apple Park Way, Cupertino, CA 95014, USA",
    imageUrl: "https://www.apple.com/newsroom/images/r8-landing-page-tiles/Apple_Park_Visitor_center_entrance_20171117_LP_hero.jpg.og.jpg",
    explanation: "Monumental circular groundscraper with a perimeter of nearly one mile. Clad in the world's largest curved architectural structural glass panes, powered by 100% renewable rooftop solar energy and naturally ventilated for nine months of the year.",
    notableTenant: "Apple Inc. Global Headquarters",
    coordinates: "37.3346,-122.0090"
  },
  {
    id: "hsbc-hong-kong",
    name: "HSBC Main Building",
    city: "Hong Kong",
    country: "Hong Kong",
    architects: ["Foster + Partners"],
    primaryArchitect: "Foster + Partners",
    typology: "Office & Commercial",
    heightMeters: 178.8,
    heightFeet: 587,
    floors: 44,
    yearBuilt: 1985,
    rehab: "High-efficiency MEP modernization, digital banking hall overhauls, and kinetic LED facade illuminations across 2015–2020.",
    style: "High-Tech / Structural",
    address: "1 Queen's Road Central, Central, Hong Kong",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/HK_HSBC_Main_Building_2008.jpg",
    explanation: "Masterpiece of structural expressionism. Suspended from five steel mast modules connected by two-storey inverted suspension trusses, delivering an entirely column-free interior centered on a 10-storey sunlit atrium fed by an exterior motorized sunscoop mirror.",
    notableTenant: "HSBC Global Commercial Banking",
    coordinates: "22.2803,114.1594"
  },
  {
    id: "bank-of-china-hk",
    name: "Bank of China Tower",
    city: "Hong Kong",
    country: "Hong Kong",
    architects: ["I. M. Pei (Pei Cobb Freed & Partners)"],
    primaryArchitect: "I. M. Pei (Pei Cobb Freed & Partners)",
    typology: "Supertall / Commercial",
    heightMeters: 367.4,
    heightFeet: 1205,
    floors: 72,
    yearBuilt: 1990,
    rehab: "Curtain-wall structural silicone restorations and building automation updates carried out across the 2010s.",
    style: "Structural Expressionism",
    address: "1 Garden Rd, Central, Hong Kong",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/25/HK_Bank_of_China_Tower_2008_%282%29.jpg",
    explanation: "Structural Expressionism evoking growing bamboo culms. Its space-truss structural system transfers horizontal lateral loads into four massive composite corner columns, resisting typhoon winds.",
    notableTenant: "Bank of China (Hong Kong)",
    coordinates: "22.2793,114.1615"
  },
  {
    id: "two-ifc-hk",
    name: "Two International Finance Centre (Two IFC)",
    city: "Hong Kong",
    country: "Hong Kong",
    architects: ["César Pelli & Associates"],
    primaryArchitect: "César Pelli (Pelli Clarke & Partners)",
    typology: "Supertall / Commercial",
    heightMeters: 415.8,
    heightFeet: 1364,
    floors: 88,
    yearBuilt: 2003,
    rehab: "Lift software dispatch systems and energy-efficient chilled-water modernizations earning LEED Platinum (2019–2021).",
    style: "Contemporary",
    address: "8 Finance St, Central, Hong Kong",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Overlook_International_Finance_Centre.jpg",
    explanation: "Slender, tapered tower clad in pearl-walled reflective glass. Culminates in a distinctive sculptural crown of open vertical louvers that visually dissolves the building into the skyline.",
    notableTenant: "Hong Kong Monetary Authority, UBS, State Street",
    coordinates: "22.2850,114.1589"
  },
  {
    id: "petronas-towers",
    name: "Petronas Twin Towers",
    city: "Kuala Lumpur",
    country: "Malaysia",
    architects: ["César Pelli & Associates"],
    primaryArchitect: "César Pelli (Pelli Clarke & Partners)",
    typology: "Supertall / Commercial",
    heightMeters: 451.9,
    heightFeet: 1483,
    floors: 88,
    yearBuilt: 1998,
    rehab: "Skybridge and observation deck multimedia modernization (2012); facade and structural maintenance.",
    style: "Postmodern",
    address: "Kuala Lumpur City Centre, 50088 Kuala Lumpur, Malaysia",
    imageUrl: "https://cdn.britannica.com/65/3465-050-AA5092D6/Petronas-Twin-Towers-Malaysia-Kuala-Lumpur-Associates.jpg",
    explanation: "Postmodern corporate towers whose cross-section is based on the Islamic eight-pointed star (Rub el Hizb). Clad in stainless steel and extruded aluminium louvers, linked at the 41st and 42nd floors by a two-storey skybridge.",
    notableTenant: "Petronas, Bloomberg, Boeing, Al Jazeera",
    coordinates: "3.1579,101.7116"
  },
  {
    id: "burj-khalifa",
    name: "Burj Khalifa",
    city: "Dubai",
    country: "UAE",
    architects: ["Adrian Smith & William F. Baker (SOM)"],
    primaryArchitect: "Skidmore, Owings & Merrill (SOM)",
    typology: "Megatall / Mixed-Use",
    heightMeters: 828,
    heightFeet: 2717,
    floors: 163,
    yearBuilt: 2010,
    rehab: "Smart building automation, solar panel maintenance, and continuous high-altitude facade cleaning systems.",
    style: "Neo-Futurism / Buttressed Core",
    address: "1 Sheikh Mohammed bin Rashid Blvd, Dubai, UAE",
    imageUrl: "https://thumb.wikimedia.org/wikipedia/en/thumb/9/93/Burj_Khalifa.jpg/250px-Burj_Khalifa.jpg",
    explanation: "The world's tallest building. Built around an innovative Y-shaped 'buttressed core' that supports the immense gravity loads while stepping back in 26 spiraling tiers to shed wind shear.",
    notableTenant: "Armani Hotel, Emaar, At The Top Observatory",
    coordinates: "25.1972,55.2744"
  },
  {
    id: "torre-glories",
    name: "Torre Glòries (formerly Torre Agbar)",
    city: "Barcelona",
    country: "Spain",
    architects: ["Jean Nouvel", "b720 Fermín Vázquez Arquitectos"],
    primaryArchitect: "Jean Nouvel",
    typology: "Office & Commercial",
    heightMeters: 144,
    heightFeet: 472,
    floors: 38,
    yearBuilt: 2005,
    rehab: "€15M internal overhaul (2017–2022) creating flexible workspaces and opening the 'Mirador Torre Glòries' observatory.",
    style: "High-Tech / Cylindrical",
    address: "Avinguda Diagonal, 211, 08018 Barcelona, Spain",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Torre_Agbar_-_Barcelona%2C_Spain_-_Jan_2007.jpg",
    explanation: "Formed by two non-concentric reinforced concrete cylinders clad in corrugated multicolored lacquered aluminum panels and protected behind 60,000 adjustable glass louvers.",
    notableTenant: "Meta / Competence Call Center, Oracle",
    coordinates: "41.4036,2.1895"
  },
  {
    id: "prime-tower",
    name: "Prime Tower",
    city: "Zurich",
    country: "Switzerland",
    architects: ["Gigon/Guyer"],
    primaryArchitect: "Gigon/Guyer",
    typology: "Office & Commercial",
    heightMeters: 126,
    heightFeet: 413,
    floors: 36,
    yearBuilt: 2011,
    rehab: "Continuous energy balancing under Minergie-ECO and LEED Gold environmental standards.",
    style: "Modernist",
    address: "Hardstrasse 201, 8005 Zürich, Switzerland",
    imageUrl: "https://www.primetower.ch/wp-content/uploads/2019/05/Prime_Tower_Home7.jpg",
    explanation: "Irregular polygonal footprint with cantilevers extending over Zurich-West, fully wrapped in a double-skin facade of green-tinted, specular glass reflecting the surrounding city.",
    notableTenant: "Deutsche Bank, Clouds Restaurant & Bar",
    coordinates: "47.3862,8.5173"
  },
  {
    id: "liberty-hall",
    name: "Liberty Hall",
    city: "Dublin",
    country: "Ireland",
    architects: ["Desmond Rea O'Kelly"],
    primaryArchitect: "Desmond Rea O'Kelly",
    typology: "Office & Commercial",
    heightMeters: 59.4,
    heightFeet: 195,
    floors: 16,
    yearBuilt: 1965,
    rehab: "Repaired and reglazed after 1972 bomb blast; structural facade maintenance and ongoing envelope retrofits.",
    style: "Modernist / Brutalist",
    address: "Eden Quay, North City, Dublin 1, D01 X3C4, Ireland",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Liberty_Hall_Dublin_SIPTU_HQ.jpg",
    explanation: "Dublin's foundational Modernist high-rise. Features an exposed reinforced concrete frame, non-loadbearing curtain glazing, and a cantilevered concrete canopy over the rooftop observation room.",
    notableTenant: "Services Industrial Professional & Technical Union (SIPTU)",
    coordinates: "53.3483,-6.2558"
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedArchitect, setSelectedArchitect] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('archindex_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('archindex_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [favorites]);

  const toggleFavorite = (id, e) => {
    if (e) e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Derive unique filter options
  const cities = useMemo(() => ['All', ...new Set(BUILDINGS_DATA.map(b => b.city))].sort(), []);
  const styles = useMemo(() => ['All', ...new Set(BUILDINGS_DATA.map(b => b.style.split(' / ')[0]))].sort(), []);
  const architectsList = useMemo(() => {
    const list = new Set();
    BUILDINGS_DATA.forEach(b => {
      b.architects.forEach(a => list.add(a));
    });
    return ['All', ...Array.from(list)].sort();
  }, []);

  // Filter and sort buildings
  const filteredBuildings = useMemo(() => {
    return BUILDINGS_DATA.filter(b => {
      const matchesSearch = 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.architects.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())) ||
        b.style.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCity = selectedCity === 'All' || b.city === selectedCity;
      const matchesArchitect = selectedArchitect === 'All' || b.architects.includes(selectedArchitect);
      const matchesStyle = selectedStyle === 'All' || b.style.includes(selectedStyle);
      const matchesFav = !showFavoritesOnly || favorites.includes(b.id);

      return matchesSearch && matchesCity && matchesArchitect && matchesStyle && matchesFav;
    }).sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [searchQuery, selectedCity, selectedArchitect, selectedStyle, showFavoritesOnly, favorites, sortField, sortOrder]);

  // Key stats
  const stats = useMemo(() => {
    const totalCount = BUILDINGS_DATA.length;
    const uniqueCities = new Set(BUILDINGS_DATA.map(b => b.city)).size;
    const tallest = [...BUILDINGS_DATA].sort((a, b) => b.heightMeters - a.heightMeters)[0];
    const uniqueArchitects = new Set(BUILDINGS_DATA.flatMap(b => b.architects)).size;
    return { totalCount, uniqueCities, tallest, uniqueArchitects };
  }, []);

  // Export to CSV generator
  const exportToCSV = () => {
    const headers = [
      "Building Name", "City", "Country", "Architects", "Primary Use",
      "Height (m)", "Height (ft)", "Floors", "Year Built", "Style", "Address"
    ];

    const rows = filteredBuildings.map(b => [
      `"${b.name.replace(/"/g, '""')}"`,
      `"${b.city}"`,
      `"${b.country}"`,
      `"${b.architects.join('; ')}"`,
      `"${b.typology}"`,
      b.heightMeters,
      b.heightFeet,
      b.floors,
      b.yearBuilt,
      `"${b.style}"`,
      `"${b.address.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ArchIndex_Export_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Banner / Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black">
              <Compass className="h-6 w-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-tight text-xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-amber-200">
                  ArchIndex
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  Global Explorer
                </span>
              </div>
              <p className="text-xs text-slate-400">Masterworks of Office & Commercial Architecture</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button 
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                showFavoritesOnly 
                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-md shadow-rose-500/10' 
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <Heart className={`h-3.5 w-3.5 ${showFavoritesOnly ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>Saved ({favorites.length})</span>
            </button>

            <button 
              onClick={exportToCSV}
              className="flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-all shadow-sm"
              title="Download CSV database of current list"
            >
              <Download className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
                title="Grid View"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'table' ? 'bg-amber-500 text-slate-950 font-bold shadow' : 'text-slate-400 hover:text-white'}`}
                title="Table View"
              >
                <TableIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Ribbon */}
        <div className="bg-slate-950/80 border-t border-slate-800/50 px-4 sm:px-6 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400 overflow-x-auto gap-6 whitespace-nowrap">
            <div className="flex items-center space-x-2">
              <Building2 className="h-3.5 w-3.5 text-amber-400" />
              <span>Buildings: <strong className="text-white font-semibold">{stats.totalCount}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              <span>Cities Cataloged: <strong className="text-white font-semibold">{stats.uniqueCities}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Ruler className="h-3.5 w-3.5 text-blue-400" />
              <span>Tallest: <strong className="text-white font-semibold">{stats.tallest.name} ({stats.tallest.heightMeters}m)</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-3.5 w-3.5 text-purple-400" />
              <span>Architects: <strong className="text-white font-semibold">{stats.uniqueArchitects}</strong></span>
            </div>
            <div className="text-slate-500 italic">Showing {filteredBuildings.length} results</div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Search & Filter Toolbar */}
        <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-4 mb-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by building name, architect, city, or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-sm placeholder:text-slate-500 focus:outline-none focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/80 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* City selector */}
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer pr-7 appearance-none"
                >
                  <option value="All">All Cities</option>
                  {cities.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">▼</div>
              </div>

              {/* Style selector */}
              <div className="relative">
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer pr-7 appearance-none"
                >
                  <option value="All">All Architectural Styles</option>
                  {styles.filter(s => s !== 'All').map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">▼</div>
              </div>

              {/* Architect selector */}
              <div className="relative">
                <select
                  value={selectedArchitect}
                  onChange={(e) => setSelectedArchitect(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-amber-500 cursor-pointer pr-7 appearance-none max-w-[180px] truncate"
                >
                  <option value="All">All Architects</option>
                  {architectsList.filter(a => a !== 'All').map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">▼</div>
              </div>

              {/* Reset filter button */}
              {(selectedCity !== 'All' || selectedArchitect !== 'All' || selectedStyle !== 'All' || searchQuery !== '') && (
                <button
                  onClick={() => {
                    setSelectedCity('All');
                    setSelectedArchitect('All');
                    setSelectedStyle('All');
                    setSearchQuery('');
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 underline px-1 py-1"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Quick city filter chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <span className="text-slate-500 text-[11px] font-semibold mr-1 uppercase tracking-wider flex items-center">
              <Filter className="h-3 w-3 mr-1" /> Quick:
            </span>
            {['All', 'Tel Aviv', 'Washington DC', 'Boston', 'London', 'New York', 'Chicago', 'San Francisco', 'Hong Kong'].map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap text-xs ${
                  selectedCity === city
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow'
                    : 'bg-slate-950/80 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Content View */}
        {filteredBuildings.length === 0 ? (
          <div className="text-center py-24 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800">
            <Compass className="h-12 w-12 text-slate-600 mx-auto mb-3 stroke-[1.5]" />
            <h3 className="text-lg font-semibold text-slate-300">No matching buildings found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Try adjusting your search keywords, city filter, or clearing your current active filter chips.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          /* Grid View of Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBuildings.map(building => {
              const isFav = favorites.includes(building.id);
              return (
                <div
                  key={building.id}
                  onClick={() => setSelectedBuilding(building)}
                  className="group bg-slate-900/90 border border-slate-800/80 hover:border-amber-500/60 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer flex flex-col"
                >
                  {/* Building Image Cover */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={building.imageUrl}
                      alt={building.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

                    {/* Top badging */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="bg-slate-950/80 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {building.city} · {building.country}
                      </span>
                      <button
                        onClick={(e) => toggleFavorite(building.id, e)}
                        className={`p-2 rounded-full backdrop-blur-md transition-all ${
                          isFav 
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' 
                            : 'bg-slate-950/60 text-slate-300 hover:text-rose-400 hover:bg-slate-900'
                        }`}
                        title={isFav ? "Remove from bookmarks" : "Save to bookmarks"}
                      >
                        <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    {/* Bottom overlay title */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {building.name}
                      </h3>
                      <p className="text-xs text-slate-300/90 font-medium line-clamp-1">
                        {building.architects.join(', ')}
                      </p>
                    </div>
                  </div>

                  {/* Card Content & Metrics */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-950/60 rounded-xl border border-slate-800/60 text-center">
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 tracking-wider block">Height</span>
                        <span className="text-xs font-bold text-slate-200">{building.heightMeters} m</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 tracking-wider block">Floors</span>
                        <span className="text-xs font-bold text-slate-200">{building.floors}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-slate-500 tracking-wider block">Year</span>
                        <span className="text-xs font-bold text-amber-400">{building.yearBuilt}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {building.explanation}
                    </p>

                    <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="inline-block bg-slate-800/80 px-2 py-0.5 rounded text-slate-300 font-medium">
                        {building.style.split(' / ')[0]}
                      </span>
                      <span className="flex items-center text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                        Explore Profile <ChevronRight className="h-3 w-3 ml-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950/90 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                    <th className="py-3.5 px-4 font-semibold">Building Name</th>
                    <th className="py-3.5 px-4 font-semibold">City & Country</th>
                    <th className="py-3.5 px-4 font-semibold">Architect(s)</th>
                    <th className="py-3.5 px-4 font-semibold">Height</th>
                    <th className="py-3.5 px-4 font-semibold">Year</th>
                    <th className="py-3.5 px-4 font-semibold">Style</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {filteredBuildings.map(b => (
                    <tr 
                      key={b.id}
                      onClick={() => setSelectedBuilding(b)}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-4 font-semibold text-white flex items-center space-x-3">
                        <img 
                          src={b.imageUrl} 
                          alt={b.name} 
                          className="h-9 w-9 rounded-lg object-cover bg-slate-950 border border-slate-700/60"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80";
                          }}
                        />
                        <span className="group-hover:text-amber-400 transition-colors">{b.name}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {b.city}, <span className="text-slate-500">{b.country}</span>
                      </td>
                      <td className="py-3 px-4 max-w-[200px] truncate text-slate-400 font-medium">
                        {b.architects.join(', ')}
                      </td>
                      <td className="py-3 px-4 text-slate-200">
                        <strong>{b.heightMeters} m</strong> <span className="text-slate-500 text-[10px]">({b.heightFeet} ft)</span>
                      </td>
                      <td className="py-3 px-4 text-amber-400 font-bold">{b.yearBuilt}</td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-800/80 px-2 py-0.5 rounded text-[10px] text-slate-300">
                          {b.style.split(' / ')[0]}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => toggleFavorite(b.id, e)}
                          className={`p-1.5 rounded-lg border transition-all mr-2 ${
                            favorites.includes(b.id)
                              ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Heart className={`h-3.5 w-3.5 ${favorites.includes(b.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button 
                          className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Building Detailed Modal */}
      {selectedBuilding && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedBuilding(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header & Hero Image */}
            <div className="relative h-72 sm:h-96 w-full bg-slate-950">
              <img 
                src={selectedBuilding.imageUrl} 
                alt={selectedBuilding.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-black/30"></div>

              {/* Close Button */}
              <button 
                onClick={() => setSelectedBuilding(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-slate-300 hover:text-white backdrop-blur-md transition-all border border-slate-800"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Save Button */}
              <button 
                onClick={(e) => toggleFavorite(selectedBuilding.id, e)}
                className={`absolute top-4 left-4 px-3.5 py-2 rounded-full backdrop-blur-md text-xs font-semibold flex items-center space-x-1.5 transition-all border ${
                  favorites.includes(selectedBuilding.id)
                    ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/20'
                    : 'bg-slate-950/70 border-slate-800 text-slate-200 hover:text-white'
                }`}
              >
                <Heart className={`h-4 w-4 ${favorites.includes(selectedBuilding.id) ? 'fill-current' : ''}`} />
                <span>{favorites.includes(selectedBuilding.id) ? 'Saved' : 'Bookmark'}</span>
              </button>

              {/* Modal Hero Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                    {selectedBuilding.city}, {selectedBuilding.country}
                  </span>
                  <span className="bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs font-medium px-3 py-1 rounded-full border border-slate-700">
                    {selectedBuilding.style}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {selectedBuilding.name}
                </h2>
                <p className="text-sm sm:text-base text-amber-200/90 font-medium mt-1">
                  Lead Architect(s): {selectedBuilding.architects.join(' & ')}
                </p>
              </div>
            </div>

            {/* Modal Body Info */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Quick Spec Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Height</div>
                  <div className="text-xl font-black text-white mt-1">{selectedBuilding.heightMeters} m</div>
                  <div className="text-xs text-slate-400">{selectedBuilding.heightFeet} ft</div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Floors & Storeys</div>
                  <div className="text-xl font-black text-white mt-1">{selectedBuilding.floors}</div>
                  <div className="text-xs text-slate-400">Above Ground</div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Inauguration</div>
                  <div className="text-xl font-black text-amber-400 mt-1">{selectedBuilding.yearBuilt}</div>
                  <div className="text-xs text-slate-400">Year Built</div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Primary Typology</div>
                  <div className="text-sm font-bold text-slate-200 mt-1 truncate" title={selectedBuilding.typology}>
                    {selectedBuilding.typology}
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">Commercial Asset</div>
                </div>
              </div>

              {/* Deep Architectural Analysis */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                  <Info className="h-4 w-4" />
                  <span>Architectural & Structural Breakdown</span>
                </h4>
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 text-slate-300 leading-relaxed text-sm sm:text-base">
                  {selectedBuilding.explanation}
                </div>
              </div>

              {/* History & Rehabilitation Timeline */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Renovations, Retrofits & Modernization</span>
                </h4>
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 text-slate-300 text-sm leading-relaxed">
                  {selectedBuilding.rehab}
                </div>
              </div>

              {/* Location & Notable Tenants */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Physical Address</div>
                    <div className="text-sm text-slate-200 mt-0.5">{selectedBuilding.address}</div>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedBuilding.name + ' ' + selectedBuilding.city)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-amber-400 hover:text-amber-300 font-medium mt-2"
                    >
                      Open in Google Maps <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>

                <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 flex items-start space-x-3">
                  <Building2 className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Notable Occupants</div>
                    <div className="text-sm text-slate-200 mt-0.5">{selectedBuilding.notableTenant}</div>
                    <span className="inline-block mt-2 text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
                      Class-A Infrastructure
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-800/80 bg-slate-950/50 rounded-b-3xl flex justify-between items-center">
              <span className="text-xs text-slate-500">ArchIndex Archive ID: #{selectedBuilding.id}</span>
              <button 
                onClick={() => setSelectedBuilding(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-400">ArchIndex: Global Architectural Explorer</p>
          <p>Documenting the world's most significant commercial, office, and high-rise landmarks.</p>
        </div>
      </footer>
    </div>
  );
}