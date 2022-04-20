import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  username = "NanoJJG";
  profileImg = '../../../assets/pictures/profile.jpeg';
  
  
  goTo(){}
  
  
  constructor() { }

  ngOnInit(): void {
    document.getElementById('profile-img')?.setAttribute('src', this.profileImg);
  }

}
