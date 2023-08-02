import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-section-edit',
  templateUrl: './section-edit.component.html',
  styleUrls: ['./section-edit.component.scss']
})
export class SectionEditComponent implements OnInit {

  @Input() section_selected:any;
  @Output() sectionE:EventEmitter<any> = new EventEmitter();

  name:any;
  state:any = 1;

  constructor(
    public modal:NgbActiveModal,
    public courseService:CourseService
  ) { }

  ngOnInit(): void {
    this.name = this.section_selected.name;
    this.state = this.section_selected.state;
    console.log(this.section_selected);
  }


  store(){
    let data = {
      name: this.name,
      state: this.state
    }

    this.courseService.updateSection(data, this.section_selected.id).subscribe((resp:any) => {
      console.log(resp);
      this.sectionE.emit(resp.section);
      this.modal.close();
    });
  }

}
