import { Component } from '@angular/core';
import { CoursesComponent } from '../../courses/courses.component';
import { AboutComponent } from '../about/about.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CoursesComponent,AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {

  ngOnInit() {
    
  }
  
 
}
