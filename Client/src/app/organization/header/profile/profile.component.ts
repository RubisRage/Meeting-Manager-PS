import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = "NanoJJG";
  profileImg = '../../../assets/pictures/profile.jpeg';
  
  
  goTo(){}
  
  
  constructor() { }

  ngOnInit(): void {
    document.getElementById('profile-img')?.setAttribute('src', this.profileImg);
  }

}