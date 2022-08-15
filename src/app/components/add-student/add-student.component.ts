import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  student: Student = {
    id: '',
    name: '',
    email: '',
    cohort: '',
    phoneNumber: 1876,
    registered: false
  };

  submitted = false;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
  }

  saveStudent(): void {
    const data = {
      name: this.student.name,
      email: this.student.email,
      cohort: this.student.cohort,
      phoneNumber: this.student.phoneNumber,
    };

    this.studentService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newStudent(): void {
    this.submitted = false;
    this.student = {
      name: '',
      email: '',
      cohort: '',
      phoneNumber: 1876,
      registered: false
    };
  }
}
