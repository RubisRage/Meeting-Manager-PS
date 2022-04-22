import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'org-description',
  templateUrl: './org-description.component.html',
  styleUrls: ['./org-description.component.css']
})
export class OrgDescriptionComponent implements OnInit {

  organization = "Delegación EII"
  description = "Organización de la delegación de estudiantes de informática. Luchamos por el progreso, la evolución, el avance, la mejoría, el crecimiento, el desarrollo y la autonomía del alumnado frente a la facultad, por que somos fuertes he independientes."

  constructor() { }

  ngOnInit(): void {
  }

}
