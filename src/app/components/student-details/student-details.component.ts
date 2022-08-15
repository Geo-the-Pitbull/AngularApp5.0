import { Component, OnInit, Input } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentStudent: Student = {
    name: '',
    email: '',
    cohort: '',
    phoneNumber: 1876,
    registered: false
  };

  message = '';

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getStudent(this.route.snapshot.params["id"]);
    }
  }

  getStudent(id: string): void {
    this.studentService.get(id)
      .subscribe({
        next: (data) => {
          this.currentStudent = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  updateRegistered(status: boolean): void {
    const data = {
      name: this.currentStudent.name,
      email: this.currentStudent.email,
      cohort: this.currentStudent.cohort,
      phoneNumber: this.currentStudent.phoneNumber,
    };

    this.message = '';

    if (confirm('Are you sure you want to perform this operation ?') == true) {
      this.studentService.update(this.currentStudent.id, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentStudent.registered = status;
          this.message = res.message ? res.message : 'The status was updated successfully!';
        },
        error: (e) => console.error(e)
      });
    }
  }

  updateStudent(): void {
    this.message = '';
    if (confirm('Are you sure you want to perform this operation ?') == true) {
      this.studentService.update(this.currentStudent.id, this.currentStudent)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Student was updated successfully!';
          this.router.navigate(['/students']);
        },
        error: (e) => console.error(e)
      });
    }
  }

  deleteStudent(): void {
    if (confirm('Are you sure you want to perform this operation ?') == true) {
      this.studentService.delete(this.currentStudent.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This Student was deleted successfully!';
          this.router.navigate(['/students']);
        },
        error: (e) => console.error(e)
      });
    }
  }
}
