export type Soundscape = {
  id: string;
  title: string;
  place: string;
  country: string;
  region: string;
  description: string;
  duration: string;
  category: string;
  atmospheres: string[];
  artwork: string;
  audioUrl: string;
  latitude: number;
  longitude: number;
  credit?: string;
  creditUrl?: string;
  licenseUrl?: string;
};
