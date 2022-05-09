import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHelperService } from 'src/app/services/http-helper.service';
import { CreateOrganizationComponent } from 'src/app/dialog/create-organization/create-organization.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthHelperService } from 'src/app/services/auth-helper.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-display',
  templateUrl: './organization-display.component.html',
  styleUrls: ['./organization-display.component.css'],
})
export class OrganizationDisplayComponent implements OnInit {
  @Input() organizationSelection = 'Selecciona tu Organización';
  orgs: any;
  organizations!: { id: number; name: string }[];
  show: boolean;
  @Input () id! : number;
  organization!:any;

  constructor(
    private http: HttpHelperService,
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private authService: AuthHelperService
  ) {
    this.organizationSelection = this.chooseOrganization();
    this.show = false;
  }

  ngOnInit(): void {
    this.http
      .get(
        environment.backend +
          '/users/' +
          this.authService.user?.username +
          '/organizations'
      )
      .subscribe((data) => {
        this.organizations = data;
      });
  }

  chooseOrganization(): string {
    if (this.id==null){
      return "Seleciona tu Organización"
    }else{
      this.router.params.subscribe(params => {
        this.http.get(environment.backend + "/organizations/" + params['id'])
          .subscribe((data => {
            this.organization = {
              id: data.id,
              name: data.name,
              description: data.description,
              imgURL: data.imgURL
            };
          }));
      });
      return this.organization.name;
    }
  }

  displayOrganization() {
    this.show = true;
  }

  closeOrganization() {
    this.show = false;
  }

  errorm() {
    console.log('error');
    return 'error';
  }

  openCreateOrganizationDialog() {
    this.dialog.open(CreateOrganizationComponent, {
      height: '80vh',
      width: '80vw',
    });
  }
}
