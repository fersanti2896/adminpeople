import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { People } from './interfaces/people';
import { PeopleService } from './services/people.service';
import { MatDialog } from '@angular/material/dialog';
import { AddPeopleComponent } from './components/add-people/add-people.component';
import { DeletePeopleComponent } from './components/delete-people/delete-people.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
    
  displayedColumns: string[] = ['FechaCreacion', 'Nombre', 'Apellidos', 'Edad', 'Email', 'Acciones'];
  dataSource = new MatTableDataSource<People>();

  constructor(
    private peopleService: PeopleService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    this.listPeople();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    if (filterValue) {
      this.peopleService.searchPeople(filterValue).subscribe({
        next: (data) => {
          data.forEach((item) => {
            item.dateCreated = this.datePipe.transform(item.dateCreated, 'yyyy/MM/dd')!;
          });
          this.dataSource.data = data;
        },
        error: (e) => {
          console.log(e);
        }
      });
    } else {
      this.listPeople();
    }
  }
  
  listPeople() {
    this.peopleService.getPeopleAll().subscribe({
      next: (data) => {
        console.log(data)
        data.forEach((item) => {
          item.dateCreated = this.datePipe.transform(item.dateCreated, 'yyyy/MM/dd')!;
        });
        this.dataSource.data = data;
      }, 
      error: (e) => { }
    })    
  }

  newPeople() {
    this.dialog.open(AddPeopleComponent,{
      height: '550px',
      width: '350px',
    });
  }

  alert(message: string, action: string){
    this.snackBar.open(message, action, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 4000
    })
  }

  deletePersonDialog(dataPerson: People) {
    this.dialog.open(DeletePeopleComponent, {
      data: dataPerson,
      disableClose: true
    }).afterClosed().subscribe(resp => {
      if(resp == 'Eliminar') {
        this.peopleService.deletePeople(dataPerson.id).subscribe({
          next: (data) => {
            this.alert('La persona fue eliminada', 'Exito');
            this.listPeople();
          }, 
          error: (e) => {
            console.log(e);
          }
        })
      }
    })
  }
}


