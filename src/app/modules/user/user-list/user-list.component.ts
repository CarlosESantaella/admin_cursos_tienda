import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserAddComponent } from '../user-add/user-add.component';
import { UserService } from '../service/user.service';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  USERS:any = [];
  isLoading:any = null;

  search:any = null;
  state:any = null;

  constructor(
    public modalService:NgbModal,
    public userService:UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.isLoading = this.userService.isLoading$;
    this.userService.listUsers().subscribe((resp:any) => {
      console.log([resp.users.data, 'hola mundo 1']);
      this.USERS = resp.users.data;
      // this.cdr.detectChanges(); // Detectar cambios
    });
    this.listUser();
  }
  
  listUser(){



    this.userService.listUsers(this.search, this.state).subscribe((resp:any) => {
      console.log([resp.users.data, 'hola mundo 1']);
      this.USERS = resp.users.data;
      console.log([this.USERS, 'hola mundo 2']);
      // this.cdr.detectChanges(); // Detectar cambios
    });
  }

  openModalCreateUser(){
    const modalRef = this.modalService.open(UserAddComponent, {
      centered: true, 
      size: 'md'
    });

    modalRef.componentInstance.userCreateEvent.subscribe((resp:any)=> {
      console.log(resp);
      let INDEX = this.USERS.findIndex((item:any) => item.id === resp.id);
      this.USERS.unshift(resp);
    });
  }

  editUser($event:Event, USER:any){
    $event.preventDefault();
    const modalRef = this.modalService.open(UserEditComponent, {
      centered: true,
      size: 'md'
    });
    modalRef.componentInstance.user  = USER;
    modalRef.componentInstance.userEditEvent.subscribe((resp:any)=> {
      console.log(resp);
      let INDEX = this.USERS.findIndex((item:any) => item.id === resp.id);
      this.USERS[INDEX] = resp;
    });
  }

  deleteUser($event:Event, USER:any){
    $event.preventDefault();
    const modalRef = this.modalService.open(UserDeleteComponent, {
      centered: true,
      size: 'md'
    });
    modalRef.componentInstance.user  = USER;
    modalRef.componentInstance.userDeleteEvent.subscribe((resp:any)=> {
      let INDEX = this.USERS.findIndex((item:any) => item.id === USER.id);
      this.USERS.splice(INDEX, 1);
    });
  }

}
