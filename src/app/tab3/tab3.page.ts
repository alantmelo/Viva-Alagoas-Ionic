import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private router: Router) {}
  register() {
    this.router.navigate(['/register']); // Navega para a página 'detail'
  }
  login() {
    this.router.navigate(['/login']); // Navega para a página 'detail'
  }
}
