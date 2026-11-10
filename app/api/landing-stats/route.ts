import { createClient } from "@supabase/supabase-js";
import { soundscapes } from "@/features/soundscapes/data";
import type { Database } from "@/types/database";

const recordists = new Set(soundscapes.map((soundscape) => soundscape.credit?.split(" · ")[0]));
const countries = new Set(soundscapes.map((soundscape) => soundscape.country));

const developmentSeed = {
  totalRecordings: soundscapes.length,
  countriesRepresented: countries.size,
  activeContributors: recordists.size,
  listeningHours: 0,
  source: "development-seed" as const,
};

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return Response.json(developmentSeed);

  try {
    const supabase = createClient<Database>(url, anonKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    const { data, error } = await supabase.rpc("sonora_landing_stats");
    const stats = data?.[0];
    if (error || !stats) {
      console.error("SONORA stats query failed; using labeled development seed.", error?.message);
      return Response.json(developmentSeed);
    }

    return Response.json({
      totalRecordings: Number(stats.total_recordings),
      countriesRepresented: Number(stats.countries_represented),
      activeContributors: Number(stats.active_contributors),
      listeningHours: Number(stats.listening_hours),
      source: "database" as const,
    });
  } catch (error) {
    console.error("SONORA stats request failed; using labeled development seed.", error);
    return Response.json(developmentSeed);
  }
}
