import {Router, NavigationEnd} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  HostListener,
  OnDestroy,
} from '@angular/core';
import {ROUTES} from './sidebar-items';
import {Role} from 'src/app/core/models/role';
import {AuthService} from 'src/app/core/service/auth.service';
import {globalService} from 'src/app/sharing/global.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  public sidebarItems: any[];
  level1Menu = '';
  level2Menu = '';
  level3Menu = '';
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  userFullName: string;
  userImg: string;
  userType: string;
  headerHeight = 60;
  roleList: Array<any> = [];
  assignRole: Array<any> = [];
  currentRoute: string;
  routerObj = null;
  actionList: Array<any> = [];
  isActive: any = '';
  userId: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private api: globalService
  ) {
    const body = this.elementRef.nativeElement.closest('body');
    this.getRolesData();
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // logic for select active menu in dropdown

        // const role = ['Admin', 'Teacher', 'Student'];
        const role = this.assignRole;
        // console.log("Role =>", role);
        const currenturl = event.url.split('?')[0];
        const firstString = currenturl.split('/').slice(1)[0];

        if (role.indexOf(firstString) !== -1) {
          this.level1Menu = event.url.split('/')[2];
          this.level2Menu = event.url.split('/')[3];
        } else {
          this.level1Menu = event.url.split('/')[1];
          this.level2Menu = event.url.split('/')[2];
        }
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, 'overlay-open');
      }
    });

    // console.log("userAction value =>", localStorage.getItem("userAction") + " <> " + localStorage.getItem("userAction").length);

    if (localStorage.getItem("userAction") !== undefined && localStorage.getItem("userAction") != "undefined") {
      this.actionList = JSON.parse(localStorage.getItem("userAction"));
    }
    console.log("Action List => ", this.actionList);

    console.log('this.isActive ', this.router.url);
    if (this.router.url == '/admin/dashboard/dashboard2') {
      this.isActive = 'active';
    } else {
      this.isActive = '';
    }
  }

  getRolesData() {
    let request = {
      query: ""
    }
    this.api.dropdown('mst_role/all', request).subscribe(resp => {
      // console.log(resp);
      this.roleList = resp;
      // console.log("Role List => ", this.roleList["content"]);
      this.roleList = this.roleList["content"];

      for (let singleAction of this.roleList) {
        this.assignRole.push(singleAction.roleName);
      }
      console.log("this.assignRole => ", this.assignRole);
    });
  }

  @HostListener('window:resize', ['$event'])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, 'overlay-open');
    }
  }

  callLevel1Toggle(event: any, element: any) {
    if (element === this.level1Menu) {
      this.level1Menu = '0';
    } else {
      this.level1Menu = element;
    }
    const hasClass = event.target.classList.contains('toggled');
    if (hasClass) {
      this.renderer.removeClass(event.target, 'toggled');
    } else {
      this.renderer.addClass(event.target, 'toggled');
    }
  }

  callLevel2Toggle(event: any, element: any) {
    if (element === this.level2Menu) {
      this.level2Menu = '0';
    } else {
      this.level2Menu = element;
    }
  }

  callLevel3Toggle(event: any, element: any) {
    if (element === this.level3Menu) {
      this.level3Menu = '0';
    } else {
      this.level3Menu = element;
    }
  }

  ngOnInit() {
    if (this.authService.currentUserValue) {
      let userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const userRole = userDetails.role;
      this.userId = userDetails.id;
      console.log("Role ngOnInit => ", this.authService.currentUserValue.role + " <> " + userRole);
      let lastName = "";
      if (this.authService.currentUserValue.lastName != '' && this.authService.currentUserValue.lastName != null && this.authService.currentUserValue.lastName != "") {
        lastName = this.authService.currentUserValue.lastName;
      }
      this.userFullName = ((this.authService.currentUserValue.titleName != "undefined" && this.authService.currentUserValue.titleName != null && this.authService.currentUserValue.titleName != "") ? this.authService.currentUserValue.titleName + ' ' : "") + this.authService.currentUserValue.firstName + ' ' + lastName;
      this.userImg = (this.authService.currentUserValue.img != "undefined" && this.authService.currentUserValue.img != null && this.authService.currentUserValue.img != "") ? this.authService.currentUserValue.img : "assets/images/admin.png";
      // console.log("User Image => "+this.userImg);

      this.sidebarItems = ROUTES.filter(
        (x) => x.role.indexOf(userRole) !== -1 || x.role.indexOf('All') !== -1
      );

      // this.generateMenu();
      // console.log("Sidebar is => ", this.sidebarItems);

      if (userRole === Role.Admin) {
        this.userType = Role.Admin;
      } else if (userRole === Role.Teacher) {
        this.userType = Role.Teacher;
      } else if (userRole === Role.Faculty) {
        this.userType = Role.Faculty;
      } else if (userRole === Role.Student) {
        this.userType = Role.Student;
      } else if (userRole === Role.StudentSection) {
        this.userType = Role.StudentSection;
      } else if (userRole === Role.AcademicIncharge) {
        this.userType = Role.AcademicIncharge;
      } else if (userRole === Role.Hoi) {
        this.userType = Role.Hoi;
      } else if (userRole === Role.DeptHOD) {
        this.userType = Role.DeptHOD;
      } else {
        this.userType = Role.Admin;
      }
    }

    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }

  // generateMenu() {
  //   this.sidebarItems.push({
  //     "path": "./calendar",
  //     "title": "Academic Calender",
  //     "moduleName": [
  //       "calendar"
  //     ],
  //     "iconType": "material-icons-two-tone",
  //     "icon": "event_note",
  //     "class": "",
  //     "groupTitle": false,
  //     "badge": "",
  //     "badgeClass": "",
  //     "role": [
  //       "Admin",
  //       "Teacher"
  //     ],
  //     "submenu": []
  //   });
  // }

  checkPermission(actionDescription) {
    if (localStorage.getItem("userAction") !== undefined && localStorage.getItem("userAction") != "undefined") {
      this.actionList = JSON.parse(localStorage.getItem("userAction"));
    }
    // console.log("Action List => ", actionDescription);
    if (this.actionList != null && this.actionList.length > 0) {
      for (let singleAction of this.actionList) {
        // if(singleAction.actionDescription == './study-material/all-question-banks') {
        //   console.log("yes amol");
        // } else {
        //   console.log("no amol");
        // }
        if (singleAction.actionDescription == actionDescription || actionDescription == './helpdesk-query/add-helpdesk-query' || actionDescription == './helpdesk-query/my-helpdesk-querys' || actionDescription == '/helpdesk-query' || (actionDescription == './helpdesk-query/assignee-helpdesk-querys' && this.userId == 332) || (actionDescription == './helpdesk-query/assignee-helpdesk-querys' && this.userId == 1)) {
          return true;
          // break;
        } else {
          // console.log("singleAction.actionDescription => " + singleAction.actionDescription);
        }
      }
    } else {
      return false;
    }
  }

  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }

  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }

  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + '';
    this.listMaxWidth = '500px';
  }

  isOpen() {
    return this.bodyTag.classList.contains('overlay-open');
  }

  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, 'ls-closed');
    } else {
      this.renderer.removeClass(this.document.body, 'ls-closed');
    }
  }

  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('submenu-closed')) {
      this.renderer.addClass(this.document.body, 'side-closed-hover');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    }
  }

  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest('body');
    if (body.classList.contains('side-closed-hover')) {
      this.renderer.removeClass(this.document.body, 'side-closed-hover');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }
}
