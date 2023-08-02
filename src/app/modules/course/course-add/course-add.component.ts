import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CourseService } from '../service/course.service';
import { Toaster } from 'ngx-toast-notifications';
import { CKEditor4 } from 'ckeditor4-angular';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

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

  isLoading$:any;

  constructor(
    public courseService:CourseService,
    public toaster:Toaster,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.courseService.isLoading$;
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
    formData.append("portada", this.FILE_PORTADA);

    this.courseService.registerCourses(formData).subscribe((resp:any) => {
      console.log([resp, 'hola mundo']);
      if(resp.message == 403){
        this.toaster.open({
          text: resp.message_text,
          caption: "VALIDACIÓN",
          type: "danger"
        });
      }else{
        this.toaster.open({
          text: "EL CURSO SE HA CREADO CON EXITO",
          caption: "SUCCESS",
          type: "success"
        });
        this.title = '';
        this.subtitle = '';
        this.precio_usd = '';
        this.precio_pen = '';
        this.categorie_id = '';
        this.sub_categorie_id = '';
        this.description = '';
        this.requeriments = [];
        this.what_is_for = [];
        this.level = '';
        this.idioma = '';
        this.user_id = '';
        this.FILE_PORTADA = '';
        this.text_requirements = '';
        this.text_what_is_for = '';
        this.IMAGEN_PREVISUALIZA = null;
      }
    });

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
