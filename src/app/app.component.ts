import {Component} from '@angular/core';

import {HomeComponent} from './home/home.component';
import {DataService} from "./core/services/data.service";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [HomeComponent, RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  providers: [DataService],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'acrotechtestobservable';

}
