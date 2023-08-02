import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Toaster } from 'ngx-toast-notifications';
import { CourseService } from '../../../service/course.service';

@Component({
  selector: 'app-clase-delete',
  templateUrl: './clase-delete.component.html',
  styleUrls: ['./clase-delete.component.scss']
})
export class ClaseDeleteComponent implements OnInit {

  @Input() clase_selected:any;
  @Output() claseD:EventEmitter<any> = new EventEmitter();

  constructor(
    public modal:NgbActiveModal,
    public courseService:CourseService,
    public toaster:Toaster
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.courseService.deleteClase(this.clase_selected.id).subscribe((resp:any) => {
      if(resp.message == 403){
        this.toaster.open({
          text: resp.message_text,
          caption: "VALIDACIÓN",
          type: "danger"
        });
      }else{
        this.toaster.open({
          text: "LA CLASE SE HA ELIMINADO CORRECTAMENTE",
          caption: "VALIDACIÓN",
          type: "success"
        });
      }
      this.claseD.emit(resp);
      this.modal.dismiss();
    })
  }

}
