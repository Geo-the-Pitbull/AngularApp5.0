import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  students?: Student[];
  currentStudent: Student = {};
  currentIndex = -1;
  name = '';
  
  message = '';

  isDisplay = false;
  isChange = true;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.retrieveStudents();
  }

  // retrieveStudents(): void {
  //   this.studentService.getAll()
  //     .subscribe({
  //       next: (data) => {
  //         this.students = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  // retrieveStudents(): void {
  //   this.studentService.getAll().subscribe(res => {
  //     console.log(res)
  //     this.students = res;
  //   })
  // }

  toggleDisplay(){
    this.isDisplay = !this.isDisplay;
    this.isChange = !this.isChange
  }

  retrieveStudents(): void {
    this.studentService.getAll().subscribe(
       (data) => {
        this.students = data;
        console.log(data);
      }
    );
  }

  refreshList(): void {
    this.retrieveStudents();
    this.currentStudent = {};
    this.currentIndex = -1;
  }

  setActiveStudent(student: Student, index: number): void {
    this.currentStudent = student;
    this.currentIndex = index;
  }

  removeAllStudents(): void {
    this.studentService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'All Students were deleted successfully!';
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchName(): void {
    this.currentStudent = {};
    this.currentIndex = -1;

    this.studentService.findByName(this.name)
      .subscribe({
        next: (data) => {
          this.students = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
