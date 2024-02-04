export class Globalpath {
  logoPath: any;
  logoStyle: any;

  // path = 'http://localhost:8091/api/';
  // base_path = 'http://localhost:8091/';
  // filePath = 'http://localhost:8080/student-uploads/';
  // helpdeskQueryFilePath = 'http://localhost:8080/Helpdesk-Query-Uploaded-Images/';

  // path = 'https://smbtecampus.org:8445/elms_live_ws/api/';
  // base_path = 'https://smbtecampus.org:8445/';
  // filePath = 'https://smbtecampus.org:8445/student-uploads/';
  // helpdeskQueryFilePath = 'https://smbtecampus.org:8445/Helpdesk-Query-Uploaded-Images/';

  path = 'https://smbtecampus.org:8445/elms_beta_ws/api/';
  base_path = 'https://smbtecampus.org:8445/';
  filePath = 'https://smbtecampus.org:8445/student-uploads/';
  helpdeskQueryFilePath = 'https://smbtecampus.org:8445/Helpdesk-Query-Uploaded-Images/';

  // path = 'https://smbtecampus.org:8445/elms_beta_ws/api/';
  // base_path = 'https://smbtecampus.org:8445/';
  // filePath = 'https://smbtecampus.org:8445/student-uploads/';
  // helpdeskQueryFilePath = 'https://smbtecampus.org:8445/Helpdesk-Query/';

  // path = 'https://smbtecampus.org:8445/elms_beta_ws/api/';
  // base_path = 'https://smbtecampus.org:8445/';
  // filePath = 'https://smbtecampus.org:8445/student-uploads/';
  // helpdeskQueryFilePath = 'https://smbtecampus.org:8445/Helpdesk-Query/';

  // path = 'https://smbtecampus.org:8445/student_self_ws/api/';
  // base_path = 'https://smbtecampus.org:8445/';
  // filePath = 'https://smbtecampus.org:8445/student-uploads/';
  // helpdeskQueryFilePath = 'https://smbtecampus.org:8445/Helpdesk-Query/';

  // path = 'https://smbtecampus.org:8445/elms_beta_ws/api/';
  // base_path = 'https://smbtecampus.org:8445/';
  // filePath = 'https://smbtecampus.org:8445/student-uploads/';
  // helpdeskQueryFilePath = 'https://smbtecampus.org:8445/Helpdesk-Query/';

  // path = 'https://cellbeans.in:8443/mims_new_ws/api/';
  // base_path = 'https://cellbeans.in:8443/';
  // filePath = 'https://cellbeans.in:8443/student-uploads/';
  // helpdeskQueryFilePath = 'https://cellbeans.in:8443/Helpdesk-Query/';

  getToken() {
    let data: any = localStorage.getItem('token');
    return data;
  }

  getInstituteLogoPath() {
    let userDetails: any = JSON.parse(localStorage.getItem('userDetails'));

    if (userDetails.userInstituteId == 1) {
      this.logoPath = "assets/images/institute-logo/trust.png";
      this.logoStyle = "width: 30%;";
    } else if (userDetails.userInstituteId == 2) {
      this.logoPath = "assets/images/institute-logo/imsr.png";
      this.logoStyle = "width: 70%;";
    } else if (userDetails.userInstituteId == 3) {
      this.logoPath = "assets/images/institute-logo/imsr.png";
      this.logoStyle = "width: 70%;";
    } else if (userDetails.userInstituteId == 4) {
      this.logoPath = "assets/images/institute-logo/dpharmacy.png";
      this.logoStyle = "width: 40%;";
    } else if (userDetails.userInstituteId == 5) {
      this.logoPath = "assets/images/institute-logo/pharmacy.png";
      this.logoStyle = "width: 40%;";
    } else if (userDetails.userInstituteId == 6) {
      this.logoPath = "assets/images/institute-logo/dental_ghoti.png";
      this.logoStyle = "width: 70%;";
    } else if (userDetails.userInstituteId == 7) {
      this.logoPath = "assets/images/institute-logo/ayurved.png";
      this.logoStyle = "width: 50%;";
    } else if (userDetails.userInstituteId == 8) {
      this.logoPath = "assets/images/institute-logo/imsrc.png";
      this.logoStyle = "width: 70%;";
    } else if (userDetails.userInstituteId == 10) {
      this.logoPath = "assets/images/institute-logo/nursing.png";
      this.logoStyle = "width: 35%;";
    } else if (userDetails.userInstituteId == 11) {
      this.logoPath = "assets/images/institute-logo/dental_sangamner.png";
      this.logoStyle = "width: 40%;";
    }
  }
}
