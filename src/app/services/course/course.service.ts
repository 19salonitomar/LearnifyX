import { Injectable } from '@angular/core';
import { Strings } from '../../enum/strings.enum';
import { Course } from '../../interfaces/course.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses$ = new BehaviorSubject<Course[]>([]);

  get courses() {
    return this.courses$.asObservable();
  }

  constructor() { }

  getCourses(): Course[] {
    
    const data = localStorage.getItem(Strings.STORAGE_KEY);
    //console.log(data);
    if (data) {
      const courses = JSON.parse(data);
      this.updateCourse(courses);
      return courses;
    }
    return [];
  }

  addCourse(data: Course) {
    const courses = this.courses$.value;
    const newCourses = [...courses, {...data, id: courses.length + 1 } ];

    this.updateCourse(newCourses);

    // save data in localstorage..
    this.setItem(newCourses);
    
    return newCourses;
  }

  deleteCourse(data: Course) {
    let courses: Course[] = this.courses$.value;
    courses = courses.filter(course_item => course_item.id != data.id);
    this.updateCourse(courses);
    this.setItem(courses);
  }

  updateCourse(data: Course[]) {
    this.courses$.next(data);

  }

  setItem(data: Course[]) {
    localStorage.setItem(Strings.STORAGE_KEY, JSON.stringify(data));
  }

}
