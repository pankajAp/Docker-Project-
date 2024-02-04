import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DocFileTypes} from './doc-file-types.model';
import {DataSource} from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormDialogComponent} from './dialogs/form-dialog/form-dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {SelectionModel} from '@angular/cdk/collections';
import {DocFileTypesService} from "./doc-file-types.service";
import {globalService} from 'src/app/sharing/global.service';
import {DomSanitizer} from '@angular/platform-browser';
import {GlobalFile} from "../../../globalfile";

@Component({
  selector: 'app-all-doc-file-types',
  templateUrl: './all-doc-file-types.component.html',
  styleUrls: ['./all-doc-file-types.component.sass'],
})
export class AllDocFileTypesComponent implements OnInit {
  displayedColumns = [
    'dftId',
    'instituteName',
    'correspondenceName',
    'dfNo',
    'dtName',
    'actions'
  ];

  exampleDatabase: DocFileTypesService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<DocFileTypes>(true, []);
  dftId: number;
  userName: string;
  actionList: Array<any> = [];
  sanitizedUrl;
  userDetails: any;

  // timetableSchedules: StudentQuestionAnswersService | null;
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public docFileType: DocFileTypesService,
    private snackBar: MatSnackBar,
    private api: globalService,
    private globalFile: GlobalFile,
    private sanitizer: DomSanitizer
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (localStorage.getItem("userAction") !== undefined && localStorage.getItem("userAction") != "undefined") {
      this.actionList = JSON.parse(localStorage.getItem("userAction"));
    }
  }

  stdUploadDocument: DocFileTypes[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  ngOnInit() {
    this.loadData();
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    this.userName = userDetails.userUsername;
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        docFileType: this.docFileType,
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase.dataChange.value.unshift(
          this.docFileType.getDialogData()
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
    // console.log("editCall called");
    this.dftId = row.dftId;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        docFileType: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log("afterClosed => ", result);
      this.refreshTable();
      if (result === 1) {
        // console.log("result === 1");
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.dftId === this.dftId
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
          ] = this.docFileType.getDialogData();
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

  deleteItem(row) {
    this.dftId = row.dftId;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.dftId === this.dftId
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

  checkPermission(actionDescription) {
    if (this.actionList.length > 0) {
      for (let singleAction of this.actionList) {
        if (singleAction.actionDescription == actionDescription) {
          return true;
          // break;
        }
        /* else {
                  return false;
                }*/
      }
    } else {
      return false;
    }
  }

  private refreshTable() {
    // console.log("refreshTable");
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  sanitize(url: string) {
    let a = this.sanitizer.bypassSecurityTrustUrl(url);
    return a;
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
      this.selection = new SelectionModel<DocFileTypes>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }

  public loadData() {
    this.exampleDatabase = new DocFileTypesService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      this.userDetails.userEmployeeId
    );
    // this.userDetails.courseId,
    // this.userDetails.classId
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
  onContextMenu(event: MouseEvent, item: DocFileTypes) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item: item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<DocFileTypes> {
  filterChange = new BehaviorSubject('');

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  filteredData: DocFileTypes[] = [];
  renderedData: DocFileTypes[] = [];

  constructor(
    public exampleDatabase: DocFileTypesService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public userEmployeeId
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DocFileTypes[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllDocFileTypes();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((docFileType: DocFileTypes) => {
            const searchStr = (
              docFileType.dftInstituteId['instituteName'] +
              docFileType.dftDtId['dtName'] +
              docFileType.dftCorrespondenceId['correspondenceName']
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
  sortData(data: DocFileTypes[]): DocFileTypes[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'dftId':
          [propertyA, propertyB] = [a.dftId, b.dftId];
          break;
        case 'instituteName':
          [propertyA, propertyB] = [a.instituteName, b.instituteName];
          break;
        case 'dtName':
          [propertyA, propertyB] = [a.dtName, b.dtName];
          break;
        case 'correspondenceName':
          [propertyA, propertyB] = [a.correspondenceName, b.correspondenceName];
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
