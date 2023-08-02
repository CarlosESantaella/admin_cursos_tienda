import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {

  @Output() categoryEditEvent:EventEmitter<any> = new EventEmitter();
  @Input() CATEGORIES:any;
  @Input() CATEGORY:any;

  name:any = null;
  surname:any = null;
  email:any = null;
  password:any = null;
  confirmation_password:any = null;
  selected_option:any = 1;
  category_id:any = null;
  state:any;

  IMAGEN_PREVISUALIZA:any = './assets/media/avatars/300-6.jpg';
  FILE_PORTADA:any = null;

  isLoading:any;

  constructor(
    public categoryService:CategoryService,
    public toaster:Toaster,
    public modal:NgbActiveModal
  ) { }

  ngOnInit(): void {
    // this.modal.dismiss();
    this.isLoading = this.categoryService.isLoading$;
    this.name = this.CATEGORY.name;
    this.selected_option = this.CATEGORY.category_id ? 2 : 1;
    this.IMAGEN_PREVISUALIZA = this.CATEGORY.imagen ? this.CATEGORY.imagen : "./assets/media/avatars/300-6.jpg";
    this.category_id = this.CATEGORY.category_id;
    this.state = this.CATEGORY.state;
  }

  processAvatar($event:any)
  {
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
    reader.onloadend = () => this.IMAGEN_PREVISUALIZA = reader.result;
  }

  store(){
    if(this.selected_option == 1){
      if(    
        !this.name ||
        !this.FILE_PORTADA
      ){
        this.toaster.open({
          text: "NECESITAS LLENAR TODOS LOS CAMPOS",
          caption: "valicación",
          type: "danger"
        })
        return;
      }
    }
    if(this.selected_option == 2){
      if(
        !this.name || 
        !this.category_id
      ){
        this.toaster.open({
          text: "NECESITAS LLENAR TODOS LOS CAMPOS",
          caption: "valicación",
          type: "danger"
        })
        return;
      }
    }

    let formData = new FormData();

    formData.append("name", this.name);
    if(this.category_id){
      formData.append("category_id", this.category_id);
    }
    if(this.FILE_PORTADA){
      formData.append("portada", this.FILE_PORTADA);
    }
    formData.append("state", this.state);

    console.log([formData]);

    this.categoryService.updateCategory(formData, this.CATEGORY.id)
    .subscribe((resp:any) => {
      console.log(resp);
      this.categoryEditEvent.emit(resp.category);
      this.toaster.open({
        text: "EL USUARIO SE ACTUALIZO CORRECTAMENTE",
        caption: "INFORME",
        type: 'success'
      });
      this.modal.close();
    });
  }


  selectedOption(value:string){
    this.selected_option = value;
  }

}
