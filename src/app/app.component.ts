import {Component} from '@angular/core';

import {DataService} from "./core/services/data.service";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
  providers: [DataService],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'acrotechtestobservable';

}
