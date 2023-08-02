import { Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseDeleteComponent } from '../course-delete/course-delete.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  COURSES:any = [];
  search:any = null;
  state:any = null;

  isLoading$:any;

  constructor(
    public courseService:CourseService,
    public modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.courseService.isLoading$;
    this.listCourses();
  }

  listCourses(){
    this.courseService.listCourses(this.search, this.state).subscribe((resp:any) => {
      console.log(resp.courses.data);
      this.COURSES = resp.courses.data;
    });
  }

  deleteCourse($event:Event, COURSE:any){
    $event.preventDefault();
    const modalRef = this.modalService.open(CourseDeleteComponent, {
      centered: true,
      size: 'md'
    });
    modalRef.componentInstance.COURSE  = COURSE;
    modalRef.componentInstance.courseDeleteEvent.subscribe((resp:any)=> {
      let INDEX = this.COURSES.findIndex((item:any) => item.id === COURSE.id);
      this.COURSES.splice(INDEX, 1);
    });
  }


}
