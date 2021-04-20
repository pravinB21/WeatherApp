import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }
  key: any;
  item: any;
  select: any;
deleteItem(val:any){
  console.log(val)
  localStorage.removeItem(val);
  this.select = document.getElementById('sel1');
  this.select.remove(this.select.selectedIndex);
}

addItem(val1:any){
  console.log(val1)
  localStorage.setItem(val1,val1);
  this.select = document.getElementById('sel1');
  //console.log(this.select)
  var option = document.createElement('option');

  option.textContent = val1;
  option.value = val1;
  this.select.appendChild(option);
  
}
  ngOnInit(): void {
    for (let i = 0; i < localStorage.length; i++) {
      this.key = localStorage.key(i);
      this.item = localStorage.getItem(this.key);

      this.select = document.getElementById('sel1');
      //console.log(this.select)
      var option = document.createElement('option');

      option.textContent = this.item;
      option.value = this.item;
      this.select.appendChild(option);
      localStorage.setItem(this.item, this.item);

    }
  }

}
