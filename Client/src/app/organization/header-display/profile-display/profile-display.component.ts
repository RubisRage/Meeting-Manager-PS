import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit {

  username = "NanoJJG";
  profileImg = '../../../assets/pictures/profile.jpeg';

  constructor() { }

  ngOnInit(): void {
    document.getElementById('profile-img')?.setAttribute('src', this.profileImg);
  }

}
