export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      soundscapes: {
        Row: {
          id: string;
          title: string;
          location: string;
          country: string;
          country_code: string | null;
          region: string | null;
          description: string;
          duration_seconds: number;
          artwork_url: string | null;
          audio_url: string;
          latitude: number;
          longitude: number;
          status: "draft" | "published" | "archived";
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["soundscapes"]["Row"]> & Pick<Database["public"]["Tables"]["soundscapes"]["Row"], "title" | "location" | "country" | "description" | "duration_seconds" | "audio_url" | "latitude" | "longitude">;
        Update: Partial<Database["public"]["Tables"]["soundscapes"]["Row"]>;
        Relationships: [];
      };
      contributors: {
        Row: { id: string; status: "active" | "inactive"; created_at: string };
        Insert: { id: string; status?: "active" | "inactive"; created_at?: string };
        Update: Partial<Database["public"]["Tables"]["contributors"]["Row"]>;
        Relationships: [];
      };
      listening_sessions: {
        Row: { id: string; user_id: string; soundscape_id: string; duration_seconds: number; started_at: string };
        Insert: { id?: string; user_id: string; soundscape_id: string; duration_seconds?: number; started_at?: string };
        Update: Partial<Database["public"]["Tables"]["listening_sessions"]["Row"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      sonora_landing_stats: {
        Args: Record<string, never>;
        Returns: Array<{
          total_recordings: number;
          countries_represented: number;
          active_contributors: number;
          listening_hours: number;
        }>;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
