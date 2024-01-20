import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config()

export const supabase = createClient('https://mglwzxzymwtbvhnzxvvr.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nbHd6eHp5bXd0YnZobnp4dnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzMzUzNzksImV4cCI6MjAyMDkxMTM3OX0.Gpl1BP9oeQ8x5mG1NqQrNZYr6eeRSWqjkf5MnMS8-og',{
  auth: {
    persistSession: false,
  }
});