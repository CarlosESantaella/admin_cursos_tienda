import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CourseService } from '../../../service/course.service';
import { Toaster } from 'ngx-toast-notifications';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-clase-edit',
  templateUrl: './clase-edit.component.html',
  styleUrls: ['./clase-edit.component.scss'],
})
export class ClaseEditComponent implements OnInit {
  @Input() clase_selected: any;
  @Output() claseE: EventEmitter<any> = new EventEmitter();

  name: any;
  description: any;
  state:any = 1;
  isLoading$: Observable<any>;

  FILES: any = [];
  FILES_CLASE: any = [];

  video_curso: any = null;
  isUploadVideo: boolean = false;
  isUploadFiles: boolean = false;
  link_video_course: any = null;

  constructor(
    public modal: NgbActiveModal,
    public courseService: CourseService,
    public toaster: Toaster,
    public cdr: ChangeDetectorRef,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.courseService.isLoading$;
    this.name = this.clase_selected.name;
    this.description = this.clase_selected.description;
    this.FILES_CLASE = this.clase_selected.files;
    this.link_video_course = this.clase_selected.vimeo_id;
    this.state = this.clase_selected.state;
  }

  save() {
    let data = {
      name: this.name,
      description: this.description,
      state: this.state,
    };

    this.courseService
      .updateClase(data, this.clase_selected.id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.toaster.open({
          text: 'SE HAN REGISTRADO LOS CAMBIOS DE LA CLASE',
          caption: 'SUCCESS',
          type: 'primary',
        });
        this.modal.dismiss();
        this.claseE.emit(resp.clase);
      });
  }

  processFile($event: any) {
    for (const file of $event.target.files) {
      this.FILES.push(file);
    }
    console.log(this.FILES);
  }

  changeDescription($event: any) {
    this.description = $event.editor.getData();
  }

  deleteFile($event: any, FILE: any) {
    $event.preventDefault();

    this.courseService.deleteClaseFile(FILE.id).subscribe((resp: any) => {
      console.log(resp);
      let index = this.FILES_CLASE.findIndex((item: any) => item.id == FILE.id);
      this.FILES_CLASE.splice(index, 1);
    });
  }

  uploadVideo() {
    let formData = new FormData();

    formData.append('video', this.video_curso);

    this.isUploadVideo = true;

    this.courseService
      .uploadVideoClase(formData, this.clase_selected.id)
      .subscribe((resp: any) => {
        console.log(resp);
        this.link_video_course = resp.link_video;
        this.isUploadVideo = false;
        this.urlVideo();
        this.cdr.detectChanges();
      });
  }

  urlVideo() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.link_video_course
    );
  }

  processVideo($event: any) {
    $event.preventDefault();

    if ($event.target.files[0].type.indexOf('video') < 0) {
      this.toaster.open({
        text: 'SOLAMENTE SE ACEPTAN VIDEOS',
        caption: 'MENSAJE DE VALIDACIÓN',
        type: 'danger',
      });
      return;
    }
    this.video_curso = $event.target.files[0];
  }

  uploadFiles() {
    if (this.FILES.length <= 0) {
      this.toaster.open({
        text: 'NECESITAS INGRESAR UN RECURSO A LA CLASE',
        caption: 'VALIDACIÓN',
        type: 'danger',
      });
      return;
    }
    let formData = new FormData();
    formData.append("course_clase_id", this.clase_selected.id);
    this.FILES.forEach((file: any, index: number) => {
      formData.append(`files[${index}]`, file);
    });
    this.isUploadFiles = true;
    this.courseService.registerClaseFile(formData).subscribe((resp: any) => {
      this.isUploadFiles = false;
      this.modal.dismiss();
      this.claseE.emit(resp.clase);
      console.log(resp);
    });
  }
}
