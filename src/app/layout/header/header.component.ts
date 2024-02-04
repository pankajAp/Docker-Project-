import {ConfigService} from '../../config/config.service';
import {DOCUMENT, DatePipe} from '@angular/common';
import {globalService} from 'src/app/sharing/global.service';
import {OrgNotification} from 'src/app/sharing/model/org-notification';
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import {AuthService} from 'src/app/core/service/auth.service';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {RightSidebarService} from 'src/app/core/service/rightsidebar.service';
import {Role} from 'src/app/core/models/role';
import {GlobalFile} from "../../globalfile";
import {NotificationService} from "../../notification.service";
import {interval, Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";
import {ROUTES} from "../sidebar/sidebar-items";
import {SigninService} from "../../authentication/signin/signin.service";

const document: any = window.document;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public config: any = {};
  subscription: Subscription;
  userImg: string;
  homePage: string;
  instituteName: string;
  isNavbarCollapsed = true;
  orgNotificationList: OrgNotification[];
  date3: string;
  userDetails: any = {};
  studentId: number;
  employeeId: number;
  urlToOpen: string;
  private ngUnsubscribe = new Subject();
  orgInstitutes: Array<any> = [];
  isUserAccessMultipleColleges: boolean = false;
  logoPath: any;
  userFullName: string;
  userType: string;
  roleName: string;
  error = '';
  userActionArray: Array<any> = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private dataService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    private api: globalService,
    private datePipe: DatePipe,
    public app: GlobalFile,
    private notifyService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private signinService: SigninService
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      const userId = params['userId'];
      console.log("Amol ", userId);
      if (userId != null && userId !== undefined) {
        this.authService
          .loginById(userId)
          .subscribe(
            (res) => {
              console.log("Resp => ", res);
              if (res?.code == "100") {
                this.signinService.getTrnUserRoleActionByUserId(res?.id).subscribe(resp => {
                  localStorage.setItem("userAction", JSON.stringify(resp?.userActionId));
                  if (res?.role != null && (resp?.userActionId == null || resp?.userActionId == undefined || resp?.userActionId == '')) {
                    if (res?.role == "Teacher") {
                      this.roleName = "Faculty";
                    } else {
                      this.roleName = res?.role;
                    }
                    this.signinService.getTrnRoleActionByRoleName(this.roleName).subscribe(roleResp => {
                      console.log("Role Resp => ", roleResp);
                      for (let i = 0; i < roleResp.length; i++) {
                        this.userActionArray.push(roleResp[i].raActionId);
                      }
                      console.log("ARRAY ACTION DATA => ", this.userActionArray);
                      localStorage.setItem("userAction", JSON.stringify(this.userActionArray));
                    })
                  }
                });
                const role = this.authService.currentUserValue.role;
                if (role === Role.All || role === Role.Admin) {
                  this.router.navigate(['/admin/dashboard/dashboard2']);
                } else if (role === Role.Hoi) {
                  this.router.navigate(['/clerical-dashboard']);
                } else if (role === Role.Teacher || role === Role.Faculty) {
                  this.router.navigate(['/teacher/dashboard']);
                } else if (role === Role.Student) {
                  this.router.navigate(['/student/dashboard']);
                } else if (role === Role.Clerk) {
                  this.router.navigate(['/clerical-dashboard']);
                } else if (role === Role.AcademicIncharge) {
                  this.router.navigate(['/clerical-dashboard']);
                } else if (role === Role.StudentSection) {
                  this.router.navigate(['/clerical-dashboard']);
                } else {
                  this.router.navigate(['/authentication/signin']);
                }
              } else {
                this.notifyService.showError("Wrong Username And Password.", "Error");
                this.error = 'Invalid Login';
              }
            },
          );
      }
    });
    // const source = interval(10000);
    // this.subscription = source.pipe(takeUntil(this.ngUnsubscribe)).subscribe(val => this.getOrgNotifications());

    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    this.instituteName = userDetails.instituteName;

    if (userDetails.userInstituteId == 1) {
      this.logoPath = "assets/images/institute-logo/trust.png";
    } else if (userDetails.userInstituteId == 2) {
      this.logoPath = "assets/images/institute-logo/imsr.png";
    } else if (userDetails.userInstituteId == 3) {
      this.logoPath = "assets/images/institute-logo/imsr.png";
    } else if (userDetails.userInstituteId == 4) {
      this.logoPath = "assets/images/institute-logo/dpharmacy.png";
    } else if (userDetails.userInstituteId == 5) {
      this.logoPath = "assets/images/institute-logo/pharmacy.png";
    } else if (userDetails.userInstituteId == 6) {
      this.logoPath = "assets/images/institute-logo/dental_ghoti.png";
    } else if (userDetails.userInstituteId == 7) {
      this.logoPath = "assets/images/institute-logo/ayurved.png";
    } else if (userDetails.userInstituteId == 8) {
      this.logoPath = "assets/images/institute-logo/imsrc.png";
    } else if (userDetails.userInstituteId == 10) {
      this.logoPath = "assets/images/institute-logo/nursing.png";
    } else if (userDetails.userInstituteId == 11) {
      this.logoPath = "assets/images/institute-logo/dental_sangamner.png";
    }
    let userAccessMultipleColleges = userDetails.userAccessMultipleColleges;
    console.log("userAccessMultipleColleges " + this.userDetails.userInstituteId);
    if (userAccessMultipleColleges != 0) {
      console.log("userAccessMultipleColleges => " + userAccessMultipleColleges);
      this.isUserAccessMultipleColleges = true;
      let request = {
        query: ""
      }
      this.api.getData('institute/all', request).subscribe(resp => {
        console.log(resp);
        this.orgInstitutes = resp;
      });
    }
  }

  notifications: any[] = [
    // {
    //   userImg: 'assets/images/admin.jpg',
    //   userName: 'Admin',
    //   time: '14 mins ago',
    //   message: 'Click for First Year MBBS - Anatomy Session',
    // },
    // {
    //   userImg: 'assets/images/admin.jpg',
    //   userName: 'Admin',
    //   time: '22 mins ago',
    //   message: 'Click for Second Year MBBS - Biochemistry Session',
    // },
  ];

  // getOrgNotifications() {
  //   let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
  //   let request = {
  //     query: "",
  //     is_timetable_schedule_notification: "1"
  //   }
  //   let employeeId = userDetails.userEmployeeId;
  //   let courseId = userDetails.courseId;
  //   let classId = userDetails.classId;
  //   // console.log("Course ID => " + courseId + " Class ID => " + classId);
  //   if (employeeId != null) {
  //     this.api.getData('timetableschedule/notification/' + employeeId, request).subscribe(resp => {
  //       this.orgNotificationList = resp;
  //     });
  //   } else if (courseId != null && classId != null) {
  //     this.api.getData('timetableschedule/today-notification/' + classId + "/" + courseId, request).subscribe(resp => {
  //       this.orgNotificationList = resp;
  //     });
  //   }
  // }

  startVcSession(tsnUrl) {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    var dt = new Date();
    var scheduleDate = this.datePipe.transform(dt, 'yyyy-MM-dd');
    var currentTime = this.datePipe.transform(dt, 'HH:mm:ss');

    const data: any = {
      ta_student_id: userDetails.userStudentId,
      ta_join_time: currentTime
    }
    console.log("Attendance Data => ", data);
    this.urlToOpen = tsnUrl;
    let url: string = '';
    if (!/^http[s]?:\/\//.test(this.urlToOpen)) {
      url += 'http://';
    }
    url += this.urlToOpen;
  }

  ngOnInit() {
    this.config = this.configService.configData;

    const userRole = this.authService.currentUserValue.role;
    this.userImg = (this.authService.currentUserValue.img != "undefined" && this.authService.currentUserValue.img != null
      && this.authService.currentUserValue.img != "") ? this.authService.currentUserValue.img : "assets/images/profile.png";

    if (userRole === Role.Admin) {
      this.homePage = 'admin/dashboard/main';
    } else if (userRole === Role.Teacher) {
      this.homePage = 'teacher/dashboard';
    } else if (userRole === Role.Student) {
      this.homePage = 'student/dashboard';
    } else {
      console.log("header in");
      this.homePage = 'admin/dashboard/main';
    }

    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    this.studentId = userDetails.userStudentId;
    this.employeeId = userDetails.userEmployeeId;

    if (this.authService.currentUserValue) {
      let userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const userRole = userDetails.role;
      console.log("Role ngOnInit => ", this.authService.currentUserValue.role + " <> " + userRole);
      let lastName = "";
      if (this.authService.currentUserValue.lastName != '' && this.authService.currentUserValue.lastName != null && this.authService.currentUserValue.lastName != "") {
        lastName = this.authService.currentUserValue.lastName;
      }
      this.userFullName = ((this.authService.currentUserValue.titleName != "undefined" && this.authService.currentUserValue.titleName != null && this.authService.currentUserValue.titleName != "") ? this.authService.currentUserValue.titleName + ' ' : "") + this.authService.currentUserValue.firstName + ' ' + lastName;
      this.userImg = (this.authService.currentUserValue.img != "undefined" && this.authService.currentUserValue.img != null && this.authService.currentUserValue.img != "") ? this.authService.currentUserValue.img : "assets/images/profile.png";
      // console.log("User Image => "+this.userImg);

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
  }

  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem('theme')) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem('theme'));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem('menuOption')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('menuOption')
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'menu_' + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem('choose_logoheader')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('choose_logoheader')
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'logo-' + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem('sidebar_status')) {
      if (localStorage.getItem('sidebar_status') === 'close') {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      } else {
        this.renderer.removeClass(this.document.body, 'side-closed');
        this.renderer.removeClass(this.document.body, 'submenu-closed');
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      }
    }
  }

  changeInstituteId(instituteId, instituteName) {
    console.log("Institute Id => " + instituteId);
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));
    userDetails.userInstituteId = instituteId;
    userDetails.instituteName = instituteName;
    this.instituteName = instituteName;
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }

  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }

  public toggleRightSidebar(): void {
    this.dataService.changeMsg(
      (this.dataService.currentStatus._isScalar = !this.dataService
        .currentStatus._isScalar)
    );
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      if (!res.success) {
        window.sessionStorage.clear();
        this.router.navigate(['/authentication/signin']);
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
