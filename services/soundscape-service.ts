import { soundscapes } from "@/features/soundscapes/data";

export async function getSoundscapes() {
  return soundscapes;
}

export async function findSoundscapes(query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return soundscapes;
  return soundscapes.filter((soundscape) =>
    [soundscape.title, soundscape.place, soundscape.country, soundscape.region, soundscape.category]
      .some((value) => value.toLocaleLowerCase().includes(normalizedQuery)),
  );
}
