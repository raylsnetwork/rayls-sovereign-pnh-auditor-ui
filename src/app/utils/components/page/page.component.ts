import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  public constructor(private router: Router) {}

  public redirectToMainPage() {
    this.router.navigate(['']);
  }
}
