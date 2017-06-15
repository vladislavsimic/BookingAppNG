import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  routeForLink = [
        {
            route: ['/country'],
            label: "Country"
        },
        {
            route: ['/region'],
            label: "Region"
        },
        {
            route: ['/place'],
            label: "Place"
        },
        {
            route: ['/accomodation'],
            label: "Accomodation"
        },
        {
            route: ['/accomodation-type'],
            label: "Accomodation Type"
        },
        {
          route: ['/comment'],
          label: "Comment"
        },
        {
          route: ['/room'],
          label: "Room"
        },
        {
          route: ['/room-reservation'],
          label: "RoomReservation"
        }
    ]
}
