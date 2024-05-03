import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { People } from '../../interfaces/people';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-add-people',
  templateUrl: './add-people.component.html',
  styleUrls: ['./add-people.component.css']
})
export class AddPeopleComponent implements OnInit {
  formPerson!: FormGroup;
  action: string = 'Nueva';
  btnAction: string = 'Guardar';

  constructor(
    private peopleService: PeopleService,
    private dialRef: MatDialogRef<AddPeopleComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { 
    this.formPerson = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: [''],
      age: [null, ageValidator],
      email: ['', [Validators.required, Validators.email]]
    }) 
  }

  alert(message: string, action: string){
    this.snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

  addPerson() {
    const person: People = {
      id: 0,
      name: this.formPerson.value.name,
      lastName: this.formPerson.value.lastName,
      age: this.formPerson.value.age,
      email: this.formPerson.value.email,
      dateCreated: ''
    }

    this.peopleService.addPeople(person).subscribe({
      next: (data) => {
        this.alert('La persona fue registrada', 'Listo');
        this.dialRef.close()
      },
      error: (e) => {
        console.log(e)
        this.alert(e.error, 'Error')
      }
    })
  }

  ngOnInit(): void {
  }
}

function ageValidator(control: AbstractControl): { [key: string]: any } | null {
  const valid = /^\d+$/.test(control.value); // verifica si el valor es un número entero positivo
  return valid ? null : { invalidAge: { valid: false, value: control.value } };
}
