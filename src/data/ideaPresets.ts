export interface HorrorPreset {
  id: string;
  title: string;
  genre: string;
  tone: string;
  location: string;
  runtime: string;
  idea: string;
}

export const HORROR_PRESETS: HorrorPreset[] = [
  {
    id: 'preset_decibel',
    title: 'The Decibel Protocol',
    genre: 'Creature Horror',
    tone: 'Suspenseful',
    location: 'Blackout-Stricken Chicago Metro',
    runtime: '95 minutes',
    idea: 'Strange subterranean creatures begin hunting people in a city whenever they speak too loudly or make sounds exceeding 20 decibels.'
  },
  {
    id: 'preset_mirror',
    title: 'The Seven Second Delay',
    genre: 'Psychological Horror',
    tone: 'Terrifying',
    location: 'Restored Victorian Manor in Maine',
    runtime: '110 minutes',
    idea: 'A family moves into an isolated coastal estate where all reflective surfaces delay reality by seven seconds—and in those seven seconds, their reflections begin moving on their own.'
  },
  {
    id: 'preset_deep_space',
    title: 'The Dead Frequency',
    genre: 'Sci-Fi Horror',
    tone: 'Mysterious',
    location: 'Deep Space Salvage Vessel Nostos',
    runtime: '105 minutes',
    idea: 'A deep-space salvage crew boards an adrift cryo-transport vessel only to discover that the automated distress beacon is actually an ancient acoustic memetic entity that infects biological brains through radio headsets.'
  },
  {
    id: 'preset_arctic',
    title: 'Black Ice Perimeter',
    genre: 'Survival Horror',
    tone: 'Dark',
    location: 'Boreas Arctic Research Station, Greenland',
    runtime: '90 minutes',
    idea: 'During the 60-day Arctic polar night, a core-drill team extracts ice from 3 miles deep containing microscopic organisms that hijack human vocal cords to mimic the voices of loved ones begging outside the airlock in -60°F weather.'
  },
  {
    id: 'preset_parish',
    title: 'The Submerged Parish',
    genre: 'Supernatural Horror',
    tone: 'Cinematic',
    location: 'Flooded Ghost Town of Dunwich Reservoir',
    runtime: '100 minutes',
    idea: 'A commercial diving team tasked with repairing a reservoir dam discovers a submerged 18th-century stone cathedral where the bells still ring underwater at midnight, summoning creatures from the silt.'
  }
];
