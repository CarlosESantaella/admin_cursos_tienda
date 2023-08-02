import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategoryService } from '../../categories/service/category.service';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-delete',
  templateUrl: './course-delete.component.html',
  styleUrls: ['./course-delete.component.scss']
})
export class CourseDeleteComponent implements OnInit {

  @Input() COURSE:any;
  @Output() courseDeleteEvent:EventEmitter<any> = new EventEmitter();
  isLoading:any;

  constructor(
    public courseService:CourseService,
    public toaster:Toaster,
    public modal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.isLoading = this.courseService.isLoading$;
  }

  delete(){
    this.courseService.deleteCourses(this.COURSE.id).subscribe((resp:any) => {
      console.log(resp);
      this.courseDeleteEvent.emit(resp);
      this.modal.dismiss();
    });
  }

}
