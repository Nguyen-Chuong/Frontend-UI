import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BookingListComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['position', 'user', 'hotel', 'status'];
  expandedElement!: PeriodicElement | null;

  constructor() { }

  ngOnInit(): void {
  }

}

export interface PeriodicElement {
  user: string;
  position: number;
  status: number;
  hotel: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    user : "Viet Hoang",
    position : 1,
    status : 1,
    hotel: "Sai Gon Hotel",
    description:"Boron is a chemical element with symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a low-abundance element in the Solar system and in the Earth's crust"
  },
  {
    user : "Viet Hoang",
    position : 2,
    status : 1,
    hotel: "Sai Gon Hotel",
    description:"Boron is a chemical element with symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a low-abundance element in the Solar system and in the Earth's crust"
  },
  {
    user : "Viet Hoang",
    position : 3,
    status : 1,
    hotel: "Sai Gon Hotel",
    description:"Boron is a chemical element with symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a low-abundance element in the Solar system and in the Earth's crust"
  },
  {
    user : "Viet Hoang",
    position : 4,
    status : 1,
    hotel: "Sai Gon Hotel",
    description:"Boron is a chemical element with symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a low-abundance element in the Solar system and in the Earth's crust"
  },
  {
    user : "Viet Hoang",
    position : 5,
    status : 1,
    hotel: "Sai Gon Hotel",
    description:"Boron is a chemical element with symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a low-abundance element in the Solar system and in the Earth's crust"
  },
  {
    user : "Viet Hoang",
    position :6,
    status : 1,
    hotel: "Sai Gon Hotel",
    description:"Boron is a chemical element with symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a low-abundance element in the Solar system and in the Earth's crust"
  },
  {
    user : "Viet Hoang",
    position : 7,
    status : 1,
    hotel: "Sai Gon Hotel",
    description:"Boron is a chemical element with symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a low-abundance element in the Solar system and in the Earth's crust"
  },
  {
    user : "Viet Hoang",
    position : 8,
    status : 1,
    hotel: "Sai Gon Hotel",
    description:"Boron is a chemical element with symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a low-abundance element in the Solar system and in the Earth's crust"
  },
  {
    user : "Viet Hoang",
    position : 9,
    status : 1,
    hotel: "Sai Gon Hotel",
    description:"Boron is a chemical element with symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a low-abundance element in the Solar system and in the Earth's crust"
  },
  {
    user : "Viet Hoang",
    position : 10,
    status : 1,
    hotel: "Sai Gon Hotel",
    description:"Boron is a chemical element with symbol B and atomic number 5. Produced entirely by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a low-abundance element in the Solar system and in the Earth's crust"
  },
]

