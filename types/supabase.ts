export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_end: string
          booking_start: string
          cid: number
          created_at: string
          first_name: string
          id: number
          last_name: string
          position: string
        }
        Insert: {
          booking_end: string
          booking_start: string
          cid: number
          created_at?: string
          first_name: string
          id?: number
          last_name: string
          position: string
        }
        Update: {
          booking_end?: string
          booking_start?: string
          cid?: number
          created_at?: string
          first_name?: string
          id?: number
          last_name?: string
          position?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_cid_fkey"
            columns: ["cid"]
            isOneToOne: false
            referencedRelation: "roster"
            referencedColumns: ["cid"]
          },
        ]
      }
      events: {
        Row: {
          banner: string
          created_by: number
          description: string
          event_end: string
          event_start: string
          hidden: boolean
          host: string
          id: number
          last_modified: string
          name: string
          positions: Json | null
        }
        Insert: {
          banner: string
          created_by: number
          description: string
          event_end: string
          event_start: string
          hidden: boolean
          host: string
          id?: number
          last_modified?: string
          name: string
          positions?: Json | null
        }
        Update: {
          banner?: string
          created_by?: number
          description?: string
          event_end?: string
          event_start?: string
          hidden?: boolean
          host?: string
          id?: number
          last_modified?: string
          name?: string
          positions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "events_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "roster"
            referencedColumns: ["cid"]
          },
        ]
      }
      notams: {
        Row: {
          author: number
          body: string
          created_at: string
          id: number
        }
        Insert: {
          author: number
          body: string
          created_at?: string
          id?: number
        }
        Update: {
          author?: number
          body?: string
          created_at?: string
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "notams_author_fkey"
            columns: ["author"]
            isOneToOne: false
            referencedRelation: "roster"
            referencedColumns: ["cid"]
          },
        ]
      }
      roster: {
        Row: {
          app_cert: number
          cid: number
          created_at: string
          ctr_cert: number
          del_cert: number
          email: string
          first_name: string
          gnd_cert: number
          home_facility: string
          initials: string
          last_name: string
          rating: number
          twr_cert: number
        }
        Insert: {
          app_cert: number
          cid: number
          created_at?: string
          ctr_cert: number
          del_cert: number
          email: string
          first_name: string
          gnd_cert: number
          home_facility?: string
          initials: string
          last_name: string
          rating?: number
          twr_cert: number
        }
        Update: {
          app_cert?: number
          cid?: number
          created_at?: string
          ctr_cert?: number
          del_cert?: number
          email?: string
          first_name?: string
          gnd_cert?: number
          home_facility?: string
          initials?: string
          last_name?: string
          rating?: number
          twr_cert?: number
        }
        Relationships: []
      }
      stats: {
        Row: {
          cid: number
          first_name: string | null
          last_name: string | null
          month_one: string | null
          month_three: string | null
          month_two: string | null
        }
        Insert: {
          cid?: number
          first_name?: string | null
          last_name?: string | null
          month_one?: string | null
          month_three?: string | null
          month_two?: string | null
        }
        Update: {
          cid?: number
          first_name?: string | null
          last_name?: string | null
          month_one?: string | null
          month_three?: string | null
          month_two?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stats_cid_fkey"
            columns: ["cid"]
            isOneToOne: true
            referencedRelation: "roster"
            referencedColumns: ["cid"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
