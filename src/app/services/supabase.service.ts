import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular'
import { supabase } from './supabaseClient'
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

export interface SignUpData {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class SupabaseService {

  listTitle: string=""; 
  itemName: string="";

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}


  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }
  async signUp(email: string, password: string): Promise<string> {
    const { data , error } = await supabase.auth.signUp({
      email: '',
      password: '',
    });

    const user = data.user;
    if (!user) {
      console.error('No user returned');
    }
    if (data) throw error;
    return data;
  }

  async getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data?.user;
  }


  date: string="";
  hour: string="";
  minute: string="";
  second: string="";
  description: string="";

async addAccount(account: any) {
  try {
    const {data , error} = await supabase
    .from('profiles')
    .insert([account]);

    return { error, data};
  }
  catch (error) {
    console.error('Failed to insert data', error);
    return { error };
  }
}

async addTrip(trips: any) {
  try {
    const {data , error} = await supabase
    .from('upcoming_trips')
    .insert([trips]);

    return { error, data};
  }
  catch (error) {
    console.error('Failed to insert data', error);
    return { error };
  }
}

async addLists(lists: any) {
  try {
    const {data , error} = await supabase
    .from('travel_lists')
    .insert([lists]);

    return { error, data};
  }
  catch (error) {
    console.error('Failed to insert data', error);
    return { error };
  }
}

async getDataLimited(table: string, limit: number = 5) {
  const { data, error } = await supabase
  .from('upcoming_trips')
  .select('*')
  .limit(limit);
  if (error) {
    console.log('Error fetching data:', error.message);
  }
  return data || [];
}

async getData(table: string) {
  const { data, error } = await supabase
  .from('upcoming_trips')
  .select('*');
  if (error) {
    console.log('Error fetching data:', error.message);
  }
  return data || [];
}


listenForChanges(table: string, callback: (newData: any) => void) {
  supabase
    .channel('realtime updates')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'upcoming_trip' },
      (payload:any) => {
        console.log('New item added:', payload.new);
        callback(payload.new);
      }
    )
    .subscribe();
}

  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password })
  }

  get user() {
    return supabase.auth.getUser();
  }
  
  async getUserLists(userId: string) {
    const lists = {
      list_title: this.listTitle,
      item: this.itemName,
      user_id: this.user,
    };

    const { data, error } = await supabase
    .from('lists')
    .select('')
    .eq('user_id', userId);

    if (error) {
      throw new Error('Failed to load lists:' + error.message);
    }
    return data;
  }

  async searchItems(query: string): Promise<any[]>{
    const { data, error } = await supabase
    .from('locations')
    .select('*')
    .ilike('country_name', '%${query}%');

    if (error) throw error;
    return data || [];
  }

    async getLists() {
      let { data, error } = await supabase.from('lists').select('*').order('created_at', { ascending: false });
      return data;
    }
  
    async addList(title: string) {
      let { data, error } = await supabase.from('lists').insert([{ title }]);
      return data;
    }

    async updateList(id: string, isCompleted: boolean) {
      let { data, error } = await supabase.from('lists').update({ is_completed: isCompleted }).eq('id', id);
      return data;
    }
  
    async deleteList(id: string) {
      let { data, error } = await supabase.from('lists').delete().eq('id', id);
      return data;
    }



  get session() {
    return supabase.auth.getSession().then(({ data }) => data?.session)
  }

  /*get profile() {
    return this.user
      .then((user) => user?.id)
      .then((id) =>
        this.supabase.from('profiles').select(`username, website, avatar_url`).eq('id', id).single()
      )
  }*/

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
  signOut() {
    return supabase.auth.signOut()
  }
  /*async updateProfile(profile: Profile) {
    const user = await this.user
    const update = {
      ...profile,
      id: user?.id,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }*/

  downLoadImage(path: string) {
    return supabase.storage.from('avatar_url').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return supabase.storage.from('avatar_url').upload(filePath, file)
  }

  async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 5000 })
    await toast.present()
  }

  createLoader() {
    return this.loadingCtrl.create()
  }
}
