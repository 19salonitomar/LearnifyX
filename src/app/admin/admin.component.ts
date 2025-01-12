import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CoursesComponent } from '../courses/courses.component';
import { Course } from '../interfaces/course.interface';
import { CourseService } from '../services/course/course.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CoursesComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  //
  providers: [CourseService]
})
export class AdminComponent implements OnInit {

  model: any = {};
  cover!: string | null;
  cover_file: any;
  showError: boolean = false;
  //
  courseService: CourseService;

  constructor(courseService: CourseService) {
    this.courseService = courseService; // Assign the injected service
  }

  ngOnInit() {

  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cover_file = file;
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result!.toString();
        this.cover = dataUrl;
        console.log('image: ', this.cover);
      };
      reader.readAsDataURL(file);
      this.showError = false;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid || !this.cover) {
      console.log('Form Invalid');
      form.control.markAllAsTouched();
      if (!this.cover) {
        this.showError = true;
      }
      return;
    }
    console.log(form.value);
    this.saveCourse(form);  //
  }

  clearForm(form: NgForm) {
    form.reset();
    this.cover = null;
    this.cover_file = null;
  }

  async saveCourse(form: NgForm) {

    try {
      const formValue = form.value;
      console.log(formValue);

      const data: Course = { ...formValue, image: this.cover };



      await this.courseService.addCourse(data);

      this.clearForm(form);

    } catch (e) {
      console.log(e);

    }


  }
}
