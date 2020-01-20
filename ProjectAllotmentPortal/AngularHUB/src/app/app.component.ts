import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularHUB';
  showHeader = true;
  showFooter = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {

    }

}
