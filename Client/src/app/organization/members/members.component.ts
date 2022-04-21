import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members = ["Sonic", "Tails", "Knucles", 
      "Shadow", "Eggman", "Amy", "Luffy",
      "Jaime", "Antonio", "Romeo", "Julieta"]

  constructor() { }

  ngOnInit(): void {
  }

}
