import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) {}

  public data: any[] = [];
  public name: string = '';
  public surname: string = '';
  public age: string = '';

  ngOnInit() {
    this.http.get('assets/person.json').subscribe((data: any) => {
      this.data = data;
    });
  }

  deleteRowByCard(id: string) {
    this.data = this.data.filter(x => x.id !== id);
  }

  addCard() {
    let maximumId: any = Math.max.apply(Math, this.data.map(o => o.id));
    // когда много полей, удобней было сделать проверку ниже с помощью reactive forms,
    // через параметр valid и в целом это намного удобней будет на дальней дистанции
    if (this.name || this.surname || this.age) {
      this.data.push({
        id: maximumId + 1,
        name: this.name,
        surname: this.surname,
        age: this.age
      })
    } else {
      alert('неправильно введены данные');
    }
  }
}

