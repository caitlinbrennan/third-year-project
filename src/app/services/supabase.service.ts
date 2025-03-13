import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular'
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js'
import { environment } from 'src/environments/environment';

export interface Profile{
  username: string
  avatar_url: string
}

@Injectable({
  providedIn: 'root'
})


export class SupabaseService {

  private supabase: SupabaseClient

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }
  
  async searchItems(query: string): Promise<any[]>{
    const { data, error } = await this.supabase
    .from('locations')
    .select('*')
    .ilike('country_name', '%${query}%');

    if (error) throw error;
    return data || [];
  }

    async getLists() {
      let { data, error } = await this.supabase.from('lists').select('*').order('created_at', { ascending: false });
      return data;
    }
  
    async addList(title: string) {
      let { data, error } = await this.supabase.from('lists').insert([{ title }]);
      return data;
    }

    async updateList(id: string, isCompleted: boolean) {
      let { data, error } = await this.supabase.from('lists').update({ is_completed: isCompleted }).eq('id', id);
      return data;
    }
  
    async deleteList(id: string) {
      let { data, error } = await this.supabase.from('lists').delete().eq('id', id);
      return data;
    }



  get user() {
    return this.supabase.auth.getUser().then(({ data }) => data?.user)
  }

  get session() {
    return this.supabase.auth.getSession().then(({ data }) => data?.session)
  }

  get profile() {
    return this.user
      .then((user) => user?.id)
      .then((id) =>
        this.supabase.from('profiles').select(`username, website, avatar_url`).eq('id', id).single()
      )
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }
  signIn(email: string) {
    return this.supabase.auth.signInWithOtp({ email })
  }
  signOut() {
    return this.supabase.auth.signOut()
  }
  async updateProfile(profile: Profile) {
    const user = await this.user
    const update = {
      ...profile,
      id: user?.id,
      updated_at: new Date(),
    }

    return this.supabase.from('profiles').upsert(update)
  }

  downLoadImage(path: string) {
    return this.supabase.storage.from('avatar_url').download(path)
  }

  uploadAvatar(filePath: string, file: File) {
    return this.supabase.storage.from('avatar_url').upload(filePath, file)
  }

  async createNotice(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 5000 })
    await toast.present()
  }

  createLoader() {
    return this.loadingCtrl.create()
  }
}
