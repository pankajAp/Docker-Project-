import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HelpdeskQuerysModel} from './helpdesk-querys.model';
import {DataSource} from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormDialogComponent} from './dialogs/form-dialog/form-dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {SelectionModel} from '@angular/cdk/collections';
import {HelpdeskQuerysService} from "./helpdesk-querys.service";
import {globalService} from 'src/app/sharing/global.service';
// import { StdTimetable } from 'src/app/sharing/model/std-timetable';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalFile} from "../../globalfile";
import {Globalpath} from "../../sharing/globalpath";
import {FormDialogClosureComponent} from "./dialogs/form-dialog-closure/form-dialog-closure.component";
import {DatePipe} from "@angular/common";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-all-helpdesk-querys',
  templateUrl: './all-helpdesk-querys.component.html',
  styleUrls: ['./all-helpdesk-querys.component.sass'],
})
export class AllHelpdeskQuerysComponent implements OnInit {
  fileName = "All Helpdesk Queries Details.xlsx";
  displayedColumns = [
    'hqId',
    'hqNo',
    'hqDatetime',
    'userFullname',
    'moduleName',
    'smName',
    'hqDescription',
    'hqAttachment',
    'hqAssignTo',
    'hqRemark',
    'hqAssignDatetime',
    'hqAssigneeStatus',
    'hqAssigneeRemark',
    'hqCloseDatetime',
    'hqClosureStatus',
    'hqClosureRemark',
    'hqClosureDatetime',
    'actions'
  ];
  // 'select',
  exampleDatabase: HelpdeskQuerysService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<HelpdeskQuerysModel>(true, []);
  hqId: number;
  mstHelpdeskQuery: HelpdeskQuerysModel | null;

  imagePath: any;
  actionList: Array<any> = [];

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public helpdeskQuerysService: HelpdeskQuerysService,
    private snackBar: MatSnackBar,
    private api: globalService,
    public router: Router,
    private globalFile: GlobalFile,
    private globalPath: Globalpath,
    private datePipe: DatePipe
  ) {
    if (localStorage.getItem("userAction") !== undefined && localStorage.getItem("userAction") != "undefined") {
      this.actionList = JSON.parse(localStorage.getItem("userAction"));
    }
  }

  // stdTimetable: StdTimetable[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = {x: '0px', y: '0px'};

  ngOnInit() {
    this.imagePath = this.globalPath.helpdeskQueryFilePath;
    this.loadData('Pending for Assign');
  }

  refresh() {
    this.loadData('Pending for Assign');
  }

  addNew() {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        mstHelpdeskQuery: this.mstHelpdeskQuery,
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase.dataChange.value.unshift(
          this.helpdeskQuerysService.getDialogData()
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

  editCall(row) {
    this.hqId = row.hqId;
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        mstHelpdeskQuery: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.hqId === this.hqId
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
          ] = this.helpdeskQuerysService.getDialogData();
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

  exportexcel() {
    let excelobject: Array<any> = [];
    let i = 1;
    for (let single of this.dataSource.filteredData) {
      excelobject.push({
        "Sr. No.": i,
        "CMS Helpdesk Query No": single.hqNo,
        "Date": this.datePipe.transform(single.hqDatetime, "dd-MM-yyyy hh:mm a"),
        "User Name": single.hqUserId['userFullname'],
        "Module": single.hqModuleId['moduleName'],
        "Sub Module": single.hqSmId['smName'],
        "Description of Query": single.hqDescription,
        "Assign To": single.hqAssignTo,
        "Assign To Remark": single.hqRemark,
        "Assigned Date": this.datePipe.transform(single.hqAssignDatetime, "dd-MM-yyyy hh:mm a"),
        "Assignee Status": single.hqAssigneeStatus,
        "Assignee Closure Remark": single.hqAssigneeRemark,
        "Assignee Closure Date": this.datePipe.transform(single.hqCloseDatetime, "dd-MM-yyyy hh:mm a"),
        "SMBT Closure Status": single.hqClosureStatus,
        "SMBT Closure Remark": single.hqClosureRemark,
        "SMBT Closure Date": this.datePipe.transform(single.hqClosureDatetime, "dd-MM-yyyy hh:mm a")
      });
      i++;
    }
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelobject);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'All Helpdesk Queries');
    XLSX.writeFile(wb, this.fileName);
  }

  editCallClosure(row) {
    this.hqId = row.hqId;
    const dialogRef = this.dialog.open(FormDialogClosureComponent, {
      data: {
        mstHelpdeskQuery: row,
        action: 'edit',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.hqId === this.hqId
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
          ] = this.helpdeskQuerysService.getDialogData();
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
    console.log("Row SemesterId => ", row.hqId);
    this.hqId = row.hqId;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.hqId === this.hqId
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
      this.selection = new SelectionModel<HelpdeskQuerysModel>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }

  public loadData(helpDeskQueryStatus: any) {
    this.exampleDatabase = new HelpdeskQuerysService(this.httpClient);
    console.log("EXAMPLE DATABASE ", this.exampleDatabase);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort,
      helpDeskQueryStatus
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
  onContextMenu(event: MouseEvent, item: HelpdeskQuerysModel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item: item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<HelpdeskQuerysModel> {
  filterChange = new BehaviorSubject('');

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  filteredData: HelpdeskQuerysModel[] = [];
  renderedData: HelpdeskQuerysModel[] = [];

  constructor(
    public exampleDatabase: HelpdeskQuerysService,
    public paginator: MatPaginator,
    public _sort: MatSort,
    public helpDeskQueryStatus: any
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<HelpdeskQuerysModel[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllHelpdeskQuerysByStatus(this.helpDeskQueryStatus);
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((mstHelpdeskQuery: HelpdeskQuerysModel) => {
            const searchStr = (
              mstHelpdeskQuery.hqDescription +
              mstHelpdeskQuery.hqNo
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
  sortData(data: HelpdeskQuerysModel[]): HelpdeskQuerysModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        // case 'hqId':
        //   [propertyA, propertyB] = [a.hqId, b.hqId];
        //   break;s
        case 'hqNo':
          [propertyA, propertyB] = [a.hqNo, b.hqNo];
          break;
        case 'hqDatetime':
          [propertyA, propertyB] = [a.hqDatetime, b.hqDatetime];
          break;
        case 'hqDescription':
          [propertyA, propertyB] = [a.hqDescription, b.hqDescription];
          break;
        case 'moduleName':
          [propertyA, propertyB] = [a.moduleName, b.moduleName];
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
