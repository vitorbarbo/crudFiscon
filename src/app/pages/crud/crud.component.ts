import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface user {
  userName: string;
  phone: number;
  actions: any;
}
@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
})
export class CrudComponent implements OnInit {
  columnsToDisplay = ['userName', 'phone', 'actions'];
  newUser: FormGroup;
  filters: FormGroup;

  table: user[] = [];

  myDataArray: any; // dataSource
  name: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.newUser = this.fb.group({
      userName: ['', Validators.required],
      phone: ['', Validators.required],
    });
    this.filters = this.fb.group({
      filter: [''],
    });
  }

  // adiciona um usuário
  addUser() {
    if (this.newUser.valid) {
      const newTable = this.table;
      newTable.push(this.newUser.value);
      this.myDataArray = [...newTable];
    } else {
      alert('Favor inserir os dados corretamente!');
    }
  }

  // remove um usuário
  removeUser(value: any) {
    this.table = this.table.filter((row) => {
      return row != value;
    });
    this.myDataArray = [...this.table];
  }

  // filtra por nome ou telefone
  filterUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.myDataArray.filter = filterValue
      .trim()
      .toLocaleLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    let index = this.myDataArray.findIndex(
      (v: any) => v.userName === filterValue || v.phone === filterValue
    );
    if (filterValue) {
      this.myDataArray = [
        {
          userName: this.myDataArray[index].userName,
          phone: this.myDataArray[index].phone,
        },
      ];
    } else {
      this.myDataArray = this.table;
    }
  }
}
