import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Toaster } from 'ngx-toast-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SectionEditComponent } from '../section-edit/section-edit.component';
import { SectionDeleteComponent } from '../section-delete/section-delete.component';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.scss']
})
export class SectionAddComponent implements OnInit {


  course_id:any;
  name:string;
  SECTIONS:any = [];

  isLoading$:Observable<any>;

  constructor(
    public courseService:CourseService,
    public activatedRoute:ActivatedRoute,
    public toaster:Toaster,
    public modalService:NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.courseService.isLoading$;
    this.activatedRoute.params.subscribe((resp:any) => {
      this.course_id = resp.id;
    })
    this.courseService.listSections(this.course_id).subscribe((resp:any) => {
      console.log(resp);
      this.SECTIONS = resp.sections;
    })
  }

  editSection(event:any, section:object){
    event.preventDefault();
    const modalRef = this.modalService.open(SectionEditComponent, {
      centered: true,
      size: 'md'
    });
    modalRef.componentInstance.section_selected = section;
    modalRef.componentInstance.sectionE.subscribe((resp:any) => {
      let index = this.SECTIONS.findIndex((item:any) => item.id == resp.id);
      if(index != -1){
        console.log([resp, 'hola mundo']);
        this.SECTIONS[index] = resp;
      }
    });
  }

  deleteSection($event:any, section:any){
    $event.preventDefault();

    const modalRef = this.modalService.open(SectionDeleteComponent, {
      centered: true,
      size: 'md'
    });

    modalRef.componentInstance.section_selected = section;
    modalRef.componentInstance.sectionD.subscribe((resp:any) => {
      let index = this.SECTIONS.findIndex((item:any) => item.id == resp);
      this.SECTIONS.splice(index, 1);
    });

  }

  save(){
    if(!this.name){
      this.toaster.open({
        text: "NECESITAS INGRESAR UN NOMBRE DE LA SECCIÓN",
        caption: "VALIDACIÓN",
        type: 'danger'
      });
      return;
    }
    let data = {
      name: this.name,
      course_id: this.course_id,
      state: 1
    }
    this.courseService.registerSection(data).subscribe((resp:any) =>  {
      console.log(resp);
      this.name = '';
      this.SECTIONS.push(resp.section);
      this.toaster.open({
        text: "LA SECCIÓN SE REGISTRO CORRECTAMENTE",
        caption: "VALIDACIÓN",
        type: 'success'
      });
    });
  }
}
