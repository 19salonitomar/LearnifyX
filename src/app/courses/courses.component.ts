import { Component, inject, Input } from '@angular/core';
import { Course } from '../interfaces/course.interface';
import { CourseService } from '../services/course/course.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  courses: Course[] = [];
  @Input() isAdmin = false;
  courseSub!: Subscription;
  private courseService = inject(CourseService);                 // Calling through Services 

  constructor () { }

  ngOnInit() {
    this.courses = this.courseService.getCourses();
    this.courseSub = this.courseService.courses.subscribe({
      next: (courses) => {
        this.courses = courses;
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  deleteCourse(course: Course) {
    this.courseService.deleteCourse(course);
  }

  ngOnDestroy() {
    if(this.courseSub) this.courseSub.unsubscribe();
  }

}
