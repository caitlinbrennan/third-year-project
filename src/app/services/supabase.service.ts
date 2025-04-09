import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular'
import { supabase } from './supabaseClient'
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { SignupPage } from '../signup/signup.page';

export interface SignUpData {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  email: string;
  password: string;
}
export interface ListItems {
  id?: string;
  task_name: string;
  is_completed: boolean;
  user_id?: string;
  categories: string;
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
    .insert([account])

    return { error, data};
  }
  catch (error) {
    console.error('Failed to insert data', error);
    return { error };
  }
}

async uploadFileToBucket(bucket: string, fileName: string, file: File) 
  {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, 
      {
        cacheControl: '3600',
        upsert: false,
      });

    return { data, error };
  }

  // Get URL of pfp
  getFilePublicUrl(bucket: string, filePath: string) 
  {
    try 
    {
      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

      if (!data) 
      {
        console.error('No data returned from getPublicUrl');
        return { publicUrl: '', error: 'No data returned' };
      }
    
      return { publicUrl: data.publicUrl, error: null };
    }
    catch (error) 
    {
      console.error('Error getting public URL:', error);
      return { publicUrl: '', error: (error as Error).message };
    }
  }

  // delete files from bucket in supabase
  async deleteFileFromBucket(bucket: string, fileName: string) 
  {
    const { error } = await supabase.storage.from(bucket).remove([fileName]);
    return { error };
  }

  // create new profile
  async createProfile(
    userId: string,
    firstName: string,
    lastName: string,
    username: string,
    profilePicture: string,
    cookingSkillLevel: string
  ) {
    try 
    {
      // Insert / update profile in profiles table
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          first_name: firstName,
          last_name: lastName,
          username: username,
          profile_picture: profilePicture,
          cooking_skill_level: cookingSkillLevel,
        });

      // If error, show it
      if (error) {
        console.error('Error creating profile:', error);
        throw new Error(error.message);
      }

      // Return data if successful
      return data;
    } 
    catch (error) 
    {
      console.error('Error creating profile:', error);
      throw error;
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

async getLists(): Promise<ListItems[] | null> 
{
  // get user first
  const user = await this.getUser();
  // if no user, nothing
  if (!user) return null;

  // get items from table based on user id
  const { data, error } = await supabase
    .from('travel_lists')
    .select('*')
    .eq('user_id', user.id);

  // if error, show
  if (error) 
  {
    console.error('Error fetching list:', error.message);
    return null;
  }
  // return items / null
  return data;
}

// add to shopping list
async addListItem(item: ListItems) 
{
  // get user
  const user = await this.getUser();
  // if none, say so
  if (!user) return { data: null, error: 'User not logged in' };

  // insert to row of matching id
  const { data, error } = await supabase
    .from('travel_lists')
    .insert([{ ...item, user_id: user.id }])
    .select()
    .single();

  // if error, show
  if (error) 
  {
    console.error('Error adding item:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

// delete item
async deleteListItem(itemId: string) 
{
  // get items by id and delete
  const { error } = await supabase
    .from('travel_lists')
    .delete()
    .eq('id', itemId);

  // if error, show
  if (error) 
  {
    console.error('Error deleting item:', error.message);
  }

  return { error };
}

// update item - check it off
async updateShoppingItem(item: ListItems) 
{
  // if no item, show error
  if (!item.id) return { error: 'No ID provided', data: null };

  // get items based on id and check off
  const { data, error } = await supabase
    .from('travel_lists')
    .update({ is_completed: item.is_completed })
    .eq('id', item.id);

  // if error, show
  if (error) 
  {
    console.error('Error updating item:', error.message);
  }

  return { data, error };
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

async getCurrentUser() {
  const user = await supabase.auth.getUser();
  return user;
}

async getAccount(): Promise<SignUpData | null> {
  try {
    const user = await this.user;
    if (!user?.id){
      console.log('id not found');
      return null;
    }

    const {data,error} = await supabase
    .from('profiles')
    .select('id, username, full_name, avatar_url, email, password')
    .eq('id', user.id)
    .single();

    if(error) {
      console.error('error getting user profile', error.message);
      return null;
    }
    if(!data) {
      console.warn('no profile found');
      return null;
    }
    return data as SignUpData;
  }
  catch (error:any){
    console.error('error getting profile', error.message);
    return null;
  }
  
}

async updateProfile(signupdata: SignUpData) 
  {
    const user = await this.user

    // update profile table with new info, update time
    const update = 
    {
      ...signupdata,
      id: user?.id,
      updated_at: new Date(),
    }
    return supabase.from('profiles').upsert(update)
  }

  createLoader() 
  {
    return this.loadingCtrl.create()
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
    return supabase.auth.getUser().then(({ data }) => data?.user)
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

}
