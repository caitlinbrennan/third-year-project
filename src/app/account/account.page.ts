import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { SupabaseService } from '../services/supabase.service';
import { SignUpData } from '../services/supabase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class AccountPage implements OnInit {
  items: any[] = [];

  profilePicture: string | null = null;
  email: string = '';

  constructor(private router: Router, private navCtrl: NavController, private supabase: SupabaseService) { 
  }

  async ngOnInit() {
  }

  goBack(){
    this.navCtrl.back();
  }

  async logout(){
    this.supabase.signOut();
    this.navCtrl.navigateRoot('/login');
  }

  signupdata: SignUpData = {
    id: '',
    username: '',
    full_name: '',
    avatar_url: '',
    email: '',
    password: '',
  }

  async getAccount() {
    try {
      const accountData = await this.supabase.getAccount();
      console.log('response', accountData);

      if (!accountData){
        console.warn('no data recieved');
        return;
      }

      this.signupdata = 
      {
        id: accountData.id ?? '',
        username: accountData.username ?? '',
        full_name: accountData.full_name ?? '',
        avatar_url: accountData.avatar_url ?? '',
        email: accountData.email ?? '',
        password: accountData.password ?? '',
      };

      this.profilePicture = this.signupdata.avatar_url || null;
    }
    catch (error: any) {
      console.error('error getting profile:', error.message);
    }
  }

  async updateProfile() 
  {
    // open editing page
    const loader = await this.supabase.createLoader()
    await loader.present()

    try 
    {
      const { error } = await this.supabase.updateProfile({ ...this.signupdata});

      // if error updating, show
      if (error) 
      {
        throw error;
      }

      // close editing page, show success
      await loader.dismiss();
      await this.supabase.createNotice('Profile updated!');
      console.log('updated')
    } 
    catch (error: any) 
    {
      await loader.dismiss()
      await this.supabase.createNotice(error.message)
    }
  }

  async deleteImage() 
  {
    // if no image, leave
    if (!this.signupdata.avatar_url) return;

    // splits string - only info after /, removes last element
    const fileName = this.signupdata.avatar_url.split('/').pop();
    const { error } = await this.supabase.deleteFileFromBucket('avatars', fileName || '');

    // if error deleting image, show error
    if (error) 
    {
      console.error('Error deleting image:', error);
      return;
    }

    // return to null
    this.signupdata.avatar_url = '';
    this.profilePicture = null;
  }

  async uploadImage(file: File) 
  {
    // get pfp from avatar bucket
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await this.supabase.uploadFileToBucket('avatars', fileName, file);

    // if error, show
    if (error) 
    {
      console.error('Error uploading image:', error);
      return;
    }

    // if no data, show error
    if (!data?.path) 
    {
      console.error('No file path returned from upload');
      return;
    }

    // otherwise, let pfp url = result
    const result = this.supabase.getFilePublicUrl('avatars', data.path);

    // if error getting url, show error
    if (result.error) 
    {
      console.error('Error generating public URL:', result.error);
      return;
    }

    this.signupdata.avatar_url = result.publicUrl || "";
  }

  onImageSelected(event: any) 
  {
    const file: File = event.target.files[0];

    // if file found
    if (file) 
      {
        // preview it
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Upload image
      this.uploadImage(file);
    }
  }

  // sign out
  async signOut() 
  {
    console.log('signed out')
    await this.supabase.signOut()
    this.router.navigate(['/'], { replaceUrl: true })
  }

  goToTab1() 
  {
    this.router.navigate(['/tabs/tab1']);
  }

}
