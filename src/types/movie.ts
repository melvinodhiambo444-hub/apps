export interface Character {
  id: string;
  name: string;
  role: string;
  archetype: string;
  background: string;
  fatalFlaw: string;
  relationshipDynamics: string;
  survivalOdds: string;
  actorInspiration?: string;
}

export interface Act1 {
  title: string;
  setup: string;
  incitingIncident: string;
  plotPoint1: string;
  turningPoint: string;
}

export interface Act2 {
  title: string;
  risingTension: string;
  midpointRevelation: string;
  climaxOfDespair: string;
  allIsLostMoment: string;
}

export interface Act3 {
  title: string;
  climaxConfrontation: string;
  costOfSurvival: string;
  ending: string;
  finalShot: string;
}

export interface Scene {
  sceneNumber: number;
  slugline: string;
  title: string;
  intensity: number; // 1-10
  actionDescription: string;
  dialogueSnippet: string;
  soundDesignCue: string;
  cameraDirection: string;
  visualPrompt: string;
  generatedScript?: string;
}

export interface KeyQuote {
  character: string;
  quote: string;
  context: string;
}

export interface MainThreat {
  name: string;
  classification: string;
  description: string;
  huntingMethod: string;
  fatalVulnerabilityOrMystery: string;
}

export interface Setting {
  name: string;
  atmosphericDescription: string;
  dreadFactors: string[];
  sensoryDetails: string;
}

export interface DirectorNotes {
  colorPalette: string;
  cinematographyStyle: string;
  soundPhilosophy: string;
  comparativeFilms: string;
}

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  logline: string;
  synopsis: string;
  genre: string;
  tone: string;
  location: string;
  runtime: string;
  rulesOfHorror: string[];
  mainThreat: MainThreat;
  setting: Setting;
  characters: Character[];
  act1: Act1;
  act2: Act2;
  act3: Act3;
  ending: string;
  keyQuotes: KeyQuote[];
  scenes: Scene[];
  prologueNarration: string;
  epilogueNarration: string;
  directorNotes: DirectorNotes;
  createdAt: string;
  updatedAt?: string;
}

export type GenreOption =
  | 'Horror'
  | 'Psychological Horror'
  | 'Supernatural Horror'
  | 'Creature Horror'
  | 'Survival Horror'
  | 'Sci-Fi Horror'
  | 'Thriller Horror';

export type ToneOption =
  | 'Terrifying'
  | 'Dark'
  | 'Suspenseful'
  | 'Mysterious'
  | 'Cinematic';
