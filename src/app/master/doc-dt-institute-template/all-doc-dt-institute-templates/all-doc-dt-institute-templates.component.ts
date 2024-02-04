import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DocDtInstituteTemplateModel} from './doc-dt-institute-template.model';
import {DataSource} from '@angular/cdk/collections';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {FormDialogComponent} from './dialogs/form-dialog/form-dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.component';
import {MatMenuTrigger} from '@angular/material/menu';
import {SelectionModel} from '@angular/cdk/collections';
import {DocDtInstituteTemplateService} from "./doc-dt-institute-template.service";
import {globalService} from 'src/app/sharing/global.service';
import {Router} from "@angular/router";
import {GlobalFile} from "../../../globalfile";

@Component({
  selector: 'app-all-online-exams',
  templateUrl: './all-doc-dt-institute-templates.component.html',
  styleUrls: ['./all-doc-dt-institute-templates.component.scss'],
})
export class AllDocDtInstituteTemplatesComponent implements OnInit {
  displayedColumns = [
    'dditId',
    'instituteName',
    'dtName',
    'daName',
    'dditDescription',
    'dditNoOfSteps',
    'actions',
  ];
  exampleDatabase: DocDtInstituteTemplateService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<DocDtInstituteTemplateModel>(true, []);
  dditId: string;
  base_path: string;
  docDtInstituteTemplateData: Array<any> = [];
  userDetails: any;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public DocDtInstituteTemplateModel: DocDtInstituteTemplateService,
    private snackBar: MatSnackBar,
    private api: globalService,
    private globalFile: GlobalFile,
    private router: Router
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.base_path = this.globalFile.base_path;
  }

  stdUploadDocument: DocDtInstituteTemplateModel[];
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
        docDtInstituteTemplateModel: this.DocDtInstituteTemplateModel,
        action: 'add',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase.dataChange.value.unshift(
          this.DocDtInstituteTemplateModel.getDialogData()
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
    // console.log("editCall called ==> " + JSON.stringify(row));
    this.dditId = row.dditId;
    // console.log("this.dditId => " + this.dditId);
    this.router.navigate(['/master/doc-dt-institute-template/edit-doc-dt-institute-template', this.dditId]);
  }

  viewCall(row) {
    // console.log("viewCall called");
    this.dditId = row.onlineExamId;
    // console.log(this.dditId);
    this.router.navigate(['/teacher/online-exam/view-doc-financial-correspondence-template', this.dditId]);
  }

  editAction(row) {
    // console.log("editCall called ==> " + JSON.stringify(row));
    this.dditId = row.onlineExamId;
    // console.log("editAction Called => " + this.dditId);
    // this.router.navigate(['/teacher/online-exam/edit-doc-financial-correspondence-template', this.dditId]);
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        docDtInstituteTemplateModel: row,
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
          (x) => x.dditId === this.dditId
        );
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[
          foundIndex
          ] = this.DocDtInstituteTemplateModel.getDialogData();
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
    this.dditId = row.dditId;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.dditId === this.dditId
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
    // console.log("refreshTable");
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
      this.selection = new SelectionModel<DocDtInstituteTemplateModel>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }

  public loadData() {
    this.exampleDatabase = new DocDtInstituteTemplateService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
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
  onContextMenu(event: MouseEvent, item: DocDtInstituteTemplateModel) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = {item: item};
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<DocDtInstituteTemplateModel> {
  filterChange = new BehaviorSubject('');

  get filter(): string {
    return this.filterChange.value;
  }

  set filter(filter: string) {
    this.filterChange.next(filter);
  }

  filteredData: DocDtInstituteTemplateModel[] = [];
  renderedData: DocDtInstituteTemplateModel[] = [];

  constructor(
    public exampleDatabase: DocDtInstituteTemplateService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    // public courseId,
    // public classId
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
    console.log("1234567890");
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<DocDtInstituteTemplateModel[]> {
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllDocDtInstituteTemplates();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((docDtInstituteTemplateModel: DocDtInstituteTemplateModel) => {
            const searchStr = (
              docDtInstituteTemplateModel.dditId +
              docDtInstituteTemplateModel.dditDescription +
              docDtInstituteTemplateModel.dtName +
              docDtInstituteTemplateModel.instituteName +
              docDtInstituteTemplateModel.daName
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
  sortData(data: DocDtInstituteTemplateModel[]): DocDtInstituteTemplateModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'dditId':
          [propertyA, propertyB] = [a.dditId, b.dditId];
          break;
        case 'dditDescription':
          [propertyA, propertyB] = [a.dditDescription, b.dditDescription];
          break;
        case 'instituteName':
          [propertyA, propertyB] = [a.instituteName, b.instituteName];
          break;
        case 'dtName':
          [propertyA, propertyB] = [a.dtName, b.dtName];
          break;
        case 'daName':
          [propertyA, propertyB] = [a.daName, b.daName];
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
