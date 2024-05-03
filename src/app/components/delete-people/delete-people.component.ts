import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { People } from './../../interfaces/people';
import { AddPeopleComponent } from '../add-people/add-people.component';

@Component({
  selector: 'app-delete-people',
  templateUrl: './delete-people.component.html',
  styleUrls: ['./delete-people.component.css']
})
export class DeletePeopleComponent implements OnInit {

  constructor(
    private dialRef: MatDialogRef<AddPeopleComponent>,
    @Inject(MAT_DIALOG_DATA) public dataPeople: People
  ) { }

  ngOnInit(): void {
  }

  deletePerson() {
    if(this.dataPeople) {
      this.dialRef.close('Eliminar')
    }
  }

}
