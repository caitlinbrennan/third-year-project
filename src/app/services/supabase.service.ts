import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface YourTableData {
  id: number;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})


export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://aoesmwcahajxuceweegh.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvZXNtd2NhaGFqeHVjZXdlZWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NTUzNTIsImV4cCI6MjA1MzAzMTM1Mn0.5VS7oPNphGRA-naaxCcUSvocQ_5ozh4-R68m4Bxswqw'
    );
  }

  async getData(table: string): Promise<YourTableData[]>{
    const {data, error} = await this.supabase.from(table).select('*');
    if (error) {
      console.error('Error fetching data', error);
      return[];
    }
    return data as YourTableData[];
  }
}
