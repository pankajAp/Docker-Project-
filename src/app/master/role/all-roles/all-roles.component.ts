import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Roles} from './roles.model';
import {DataSource} from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormDialogComponent} from './dialogs/form-dialog/form-dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {SelectionModel} from '@angular/cdk/collections';
import {RolesService} from "./roles.service";
import {globalService} from 'src/app/sharing/global.service';
// import { StdTimetable } from 'src/app/sharing/model/std-timetable';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-all-roles',
  templateUrl: './all-roles.component.html',
  styleUrls: ['./all-roles.component.sass'],
})
export class AllRolesComponent implements OnInit {
  displayedColumns = [
    'roleId',
    'roleName',
    'actions'
    // 'batchName',
    // 'courseName',
    // 'className',
    // 'timetableFrom',
    // 'timetableTill',
    // 'timetableRemark',
    // 'actions'
  ];
  // 'select',
  exampleDatabase: RolesService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Roles>(true, []);
  roleId: number;
  roles: Roles | null;
  stdRolesList: any = [];
  stdTimetableScheduleList: any = [];
  stdDistinctTimetableScheduleTimeList: any = [];
  mstDays: any = [];

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public rolesService: RolesService,
    private snackBar: MatSnackBar,
    private api: globalService,
    public router: Router
  ) {
  }

  // stdTimetable: StdTimetable[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        roles: this.roles,
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase.dataChange.value.unshift(
          this.rolesService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  editCall(row) {
    this.roleId = row.roleId;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        roles: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.roleId === this.roleId
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
          ] = this.rolesService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        this.showNotification(
          'black',
          'Edit Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  // viewCall(row) {
  //   console.log("ROW IS => ", row.timetableCourseId + row.timetableClassId);
  //   // this.getStdRoles();
  //   // this.getMstDays();
  //   this.router.navigate(['/admin/timetable/view-student-self-registration'], {
  //     queryParams: { courseId: row.timetableCourseId, classId: row.timetableClassId }
  //   });
  // }
  getStdRoles() {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    console.log("User Details IS => ", userDetails);
    let request = {
      query: "",
      // course_id: userDetails.sa_course_id,
      // class_id: userDetails.sa_class_id,
      // batch_id: userDetails.sa_batch_id
    }
    this.api.getData('mst_role/get/' + 1, request).subscribe(resp => {
      console.log("Role Response => ", resp);
      this.stdRolesList = resp;
      console.log("ROLE LIST ", this.stdRolesList);
      // this.getStdTimetableScheduleList(userDetails.courseId, userDetails.classId);
      // this.getDistinctTimetableScheduleTime(userDetails.courseId, userDetails.classId);
    });
  }

  // getStdTimetableScheduleList(courseId, classId) {
  //   let request = {
  //     course_id: courseId,
  //     class_id: classId,
  //     // batch_id: batchId
  //   }
  //   this.api.getData('roleschedule/student-notification/'+ classId+'/'+ courseId , request).subscribe((resp) => {
  //     console.log("stdTimetableScheduleList => ", resp);
  //     if (resp.length > 0) {
  //       this.stdTimetableScheduleList = resp;
  //     }
  //   });
  // }
  // getDistinctTimetableScheduleTime(courseId, classId) {
  //   let request = {
  //     course_id: courseId,
  //     class_id: classId,
  //     // batch_id: batchId
  //   }
  //   this.api.getData('roleschedule/distinct-timetable/'+ classId +'/'+ courseId , request).subscribe((resp) => {
  //     console.log("Distinct Schedules => ", resp);
  //     if (resp.length > 0) {
  //       this.stdDistinctTimetableScheduleTimeList = resp;
  //     }
  //   });
  // }
  // getMstDays() {
  //   let request = {
  //     query: ""
  //   }
  //   this.api.getData('day/all', request).subscribe( (resp) => {
  //     console.log("Object Response => ", resp);
  //     // if(resp instanceof Array) {
  //     // console.log("This is array respomse");
  //     // }
  //     if (resp.length > 0) {
  //       this.mstDays = resp;
  //     }
  //   });
  // }
  deleteItem(row) {
    console.log("Row RoleId => ", row.roleId);
    this.roleId = row.roleId;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.roleId === this.roleId
        );
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.showNotification(
          'snackbar-danger',
          'Delete Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }

  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Roles>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }

  public loadData() {
    this.exampleDatabase = new RolesService(this.httpClient);
    console.log("EXAMPLE DATABASE ", this.exampleDatabase);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    // console.log(this.dataSource);
    fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
      if (!this.dataSource) {
        return;
      }
      this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Roles) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item: item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Roles> {
  filterChange = new BehaviorSubject('');

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  filteredData: Roles[] = [];
  renderedData: Roles[] = [];

  constructor(
    public exampleDatabase: RolesService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Roles[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllRoles();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((roles: Roles) => {
            const searchStr = (
              roles.roleName
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Roles[]): Roles[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'roleId':
          [propertyA, propertyB] = [a.roleId, b.roleId];
          break;
        case 'roleName':
          [propertyA, propertyB] = [a.roleName, b.roleName];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
