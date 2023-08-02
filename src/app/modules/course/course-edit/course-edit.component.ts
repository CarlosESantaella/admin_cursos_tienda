import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CKEditor4 } from 'ckeditor4-angular';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../service/course.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  subcategories:any = [];
  subcategories_back:any = [];
  categories:any = [];
  instructores:any = [];
  FILE_PORTADA:any = null;
  IMAGEN_PREVISUALIZA:any = null;   

  
  text_requirements:any = null;
  text_what_is_for:any = null;
  requeriments:string[] = [];
  what_is_for:string[] = [];

  title:string = '';
  subtitle:string = '';
  precio_usd:string = '';
  precio_pen:string = '';
  description:string = '';
  categorie_id:string = '';
  sub_categorie_id:string = '';
  user_id:string = '';
  level:string = '';
  idioma:string = '';

  state:any = 1;

  isLoading$:any;
  isUploadVideo:boolean = false;

  courses_id:any;
  course_selected:any = null;
  video_curso:any = null;
  link_video_course:any = null;

  constructor(
    public courseService:CourseService,
    public toaster:Toaster,
    private cdr: ChangeDetectorRef,
    public activatedRoute:ActivatedRoute,
    public sanitizer:DomSanitizer
  ) { }

  ngOnInit(): void {
    // this.isLoading$ = this.courseService.isLoading$;
    this.courseService.listConfig().subscribe(
      (resp:any) => {
        console.log(resp);
        this.subcategories = resp.subcategories;
        this.categories = resp.categories;
        this.instructores = resp.instructores;
        this.user_id = this.instructores[0].id;
        
        let value = this.categories[0].id;
        this.subcategories_back = this.subcategories.filter((subcategory:any) => subcategory.category_id == value);
        // this.courseService.isLoadingSubject.next(true);
      }
    );

    this.courses_id = this.activatedRoute.snapshot.params.id;

    //otra forma de tomar parametros de url es:
    this.activatedRoute.params.subscribe((resp:any) => {
      this.courses_id = resp.id;
      this.showCourse(this.courses_id);
      
    });

  }

  showCourse(course_id:string){
    this.courseService.showCourse(course_id).subscribe((resp:any) => {
      console.log(resp);
      this.course_selected = resp.course;
      this.subcategories_back = this.subcategories.filter((subcategory:any) => subcategory.category_id == this.course_selected.categorie_id);

      this.cdr.detectChanges();
      this.title = this.course_selected.title;
      this.subtitle = this.course_selected.subtitle;
      this.precio_usd = this.course_selected.precio_usd;
      this.precio_pen = this.course_selected.precio_pen;
      this.categorie_id = this.course_selected.categorie_id;
      this.sub_categorie_id = this.course_selected.sub_categorie_id;
      this.description = this.course_selected.description;
      this.requeriments = this.course_selected.requirements;
      this.what_is_for = this.course_selected.who_is_it_for;
      this.level = this.course_selected.level;
      this.idioma = this.course_selected.idioma;
      this.user_id = this.course_selected.user_id;
      // this.FILE_PORTADA = ;
      this.text_requirements = '';
      this.text_what_is_for = '';
      this.IMAGEN_PREVISUALIZA = this.course_selected.imagen;
      this.state = this.course_selected.state;
      if(this.course_selected.vimeo_id){

        this.link_video_course = 'https://player.vimeo.com/video/'+this.course_selected.vimeo_id;
      }
    })
  }

  selectCategorie($event:any){
    let value = $event.target.value;
    console.log(this.categorie_id);
    this.subcategories_back = this.subcategories.filter((subcategory:any) => subcategory.category_id == value);
    this.sub_categorie_id = this.subcategories_back[0].id;
  }
  selectSubCategorie($event:any){
    let value = $event.target.value;
    console.log(this.sub_categorie_id);
  }

  save(){
    if(
      !this.title ||
      !this.subtitle ||
      !this.precio_usd ||
      !this.precio_pen 
      // !this.sub_categorie_id
    ){
      this.toaster.open({
        text: "NECESITAS LLENAR TODOS LOS CAMPOS",
        caption: "MENSAJE DE VALIDACIÓN",
        type: "warning"
      });
      return;
    }

    console.log([this.title, 'hola mundo 2']);
    let formData = new FormData();
    formData.append("title", this.title);
    formData.append("subtitle", this.subtitle);
    formData.append("precio_usd", this.precio_usd);
    formData.append("precio_pen", this.precio_pen);
    formData.append("categorie_id", this.categorie_id);
    formData.append("sub_categorie_id", this.sub_categorie_id);
    formData.append("description", this.description);
    formData.append("requirements", JSON.stringify(this.requeriments));
    formData.append("who_is_it_for", JSON.stringify(this.what_is_for));
    formData.append("level", this.level);
    formData.append("idioma", this.idioma);
    formData.append("user_id", this.user_id);
    formData.append("state", this.state);
    if(this.FILE_PORTADA){
      formData.append("portada", this.FILE_PORTADA);
    }

    this.courseService.updateCourses(formData, this.courses_id).subscribe((resp:any) => {
      console.log([resp, 'hola mundo']);
      if(resp.message == 403){
        this.toaster.open({
          text: resp.message_text,
          caption: "VALIDACIÓN",
          type: "danger"
        });
      }else{
        this.toaster.open({
          text: "EL CURSO SE HA MODIFICADO CON EXITO",
          caption: "SUCCESS",
          type: "success"
        });
        // this.title = '';
        // this.subtitle = '';
        // this.precio_usd = '';
        // this.precio_pen = '';
        // this.categorie_id = '';
        // this.sub_categorie_id = '';
        // this.description = '';
        // this.requeriments = [];
        // this.what_is_for = [];
        // this.level = '';
        // this.idioma = '';
        // this.user_id = '';
        // this.FILE_PORTADA = '';
        // this.text_requirements = '';
        // this.text_what_is_for = '';
        // this.IMAGEN_PREVISUALIZA = null;
      }
    });

  }

  uploadVideo(){
    let formData = new FormData();

    formData.append("video", this.video_curso);

    this.isUploadVideo = true;

    this.courseService.uploadVideo(formData, this.courses_id).subscribe((resp:any) => {
      console.log(resp);
      this.link_video_course = resp.link_video;
      this.isUploadVideo = false;
      this.urlVideo();
      this.cdr.detectChanges();
    });
  }

  urlVideo(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.link_video_course);
  }

  processVideo($event:any){
    $event.preventDefault();
    if($event.target.files[0].type.indexOf("video") < 0){
      this.toaster.open({
        text: 'SOLAMENTE SE ACEPTAN VIDEOS',
        caption: 'MENSAJE DE VALIDACIÓN',
        type: 'danger'
      });
      return;
    }
    this.video_curso = $event.target.files[0];
  }

  processFile($event:any){
    console.log($event.target.files[0].type);
    if($event.target.files[0].type.indexOf("image") < 0){
      this.toaster.open({
        text: 'Solamente se aceptan imagenes',
        caption: 'MENSAJE DE VALIDACIÓN',
        type: 'danger'
      });
      return;
    }

    this.FILE_PORTADA = $event.target.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(this.FILE_PORTADA);
    reader.onloadend = () => {
      this.IMAGEN_PREVISUALIZA = reader.result;
      this.cdr.detectChanges();
    }
  }


  addRequirements($event:Event){
    $event.preventDefault();
    if(!this.text_requirements){
      this.toaster.open({
        text: 'NECESITAS INGRESAR UN REQUERIMIENTO',
        caption: 'VALIDACION',
        type: 'danger'
      });
      return;
    }  

    this.requeriments.push(this.text_requirements);
    this.text_requirements = '';
  }

  addWhatIsFor($event:Event){
    $event.preventDefault();
    if(!this.text_what_is_for){
      this.toaster.open({
        text: 'NECESITAS INGRESAR UNA PERSONA',
        caption: 'VALIDACIÓN',
        type: 'danger'
      });
      return;
    }
    this.what_is_for.push(this.text_what_is_for);
    this.text_what_is_for = '';
  }


  removeRequeriment(i:number){
    this.requeriments.splice(i, 1);
  }
  removeWhatIsFor(i:number){
    this.what_is_for.splice(i, 1);
  }

  changeDescription(event:CKEditor4.EventInfo){
    this.description = event.editor.getData();
    console.log(this.description);
  }

}
