import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { SupabaseService } from './services/supabase.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent{
  constructor(
    private supabase: SupabaseService,
    private router: Router
  ) {
    this.supabase.authChanges((_, session) => {
      console.log(session)
      if (session?.user) {
        this.router.navigate(['/tabs/tab1'])
      }
    })
  }
}
