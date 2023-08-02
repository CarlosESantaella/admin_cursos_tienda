import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../../service/course.service';
import { Toaster } from 'ngx-toast-notifications';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClaseEditComponent } from '../clase-edit/clase-edit.component';
import { ClaseDeleteComponent } from '../clase-delete/clase-delete.component';

@Component({
  selector: 'app-clase-add',
  templateUrl: './clase-add.component.html',
  styleUrls: ['./clase-add.component.scss']
})
export class ClaseAddComponent implements OnInit {


  CLASES:any[] = [];
  isLoading$:any;

  name:any;
  FILES:any[] = [];
  description:string;
  course_section_id:any;

  constructor(
    public activatedRoute:ActivatedRoute,
    public courseService:CourseService,
    public toaster:Toaster,
    public modalService:NgbModal,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.courseService.isLoading$;
    this.activatedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.course_section_id = resp.id;
    });

    this.courseService.listClases(this.course_section_id).subscribe((resp:any)=>{
      this.CLASES = resp.clases.data;
      console.log(this.CLASES);
    });
  }

  save(){
    if(!this.name){
      this.toaster.open({
        text: "NECESITAS INGRESAR UN TÍTULO DE LA CLASE",
        caption: "VALIDACIÓN",
        type: "danger"
      });
      return;
    }

    if(this.FILES.length <= 0){
      this.toaster.open({
        text: "NECESITAS INGRESAR UN RECURSO A LA CLASE",
        caption: "VALIDACIÓN",
        type: "danger"
      });
      return;
    }

    let formData = new FormData();

    formData.append("name", this.name);
    formData.append("description", this.description);
    console.log(this.course_section_id);
    formData.append("course_section_id", this.course_section_id);

    this.FILES.forEach((file:any, index:number) => {
      formData.append(`files[${index}]`, file);
    });

    this.courseService.registerClase(formData).subscribe((resp:any) => {
      console.log(resp);
      this.toaster.open({
        text: "LA CLASE SE HA REGISTRADO CORRECTAMENTE",
        caption: "VALIDACIÓN",
        type: "success"
      });
      this.CLASES.push(resp.clase);
      this.name = '';
      this.description = '';
      this.FILES = [];
    });
  }

  changeDescription($event:any){
    this.description = $event.editor.getData();
  }

  editClase($event:any, CLASE:any){
    $event.preventDefault();   
    const modelRef = this.modalService.open(ClaseEditComponent,{
      centered: true,
      size: 'lg'
    });
    
    modelRef.componentInstance.clase_selected = CLASE;
    modelRef.componentInstance.claseE.subscribe((resp:any) => {
      let index = this.CLASES.findIndex((item:any) => item.id == CLASE.id);
      this.CLASES[index] = resp;
    });
  }

  deleteClase($event:any, CLASE:any){
    $event.preventDefault();  

    const modalRef = this.modalService.open(ClaseDeleteComponent, {
      centered: true, 
      size: 'md'
    });
    modalRef.componentInstance.clase_selected = CLASE;
    modalRef.componentInstance.claseD.subscribe((resp:any) => {

      let INDEX = this.CLASES.findIndex((item:any) => item.id == CLASE.id);
      this.CLASES.splice(INDEX, 1);
    })

  }
  processFile($event:any){
    
    for(const file of $event.target.files){
      this.FILES.push(file);
    }
    console.log(this.FILES);
    // console.log($event.target.files[0].type);
    // if($event.target.files[0].type.indexOf("image") < 0){
    //   this.toaster.open({
    //     text: 'Solamente se aceptan imagenes',
    //     caption: 'MENSAJE DE VALIDACIÓN',
    //     type: 'danger'
    //   });
    //   return;
    // }

    // this.FILE_PORTADA = $event.target.files[0];
    // let reader = new FileReader();

    // reader.readAsDataURL(this.FILE_PORTADA);
    // reader.onloadend = () => {
    //   this.IMAGEN_PREVISUALIZA = reader.result;
    //   this.cdr.detectChanges();
    // }
  }

}
