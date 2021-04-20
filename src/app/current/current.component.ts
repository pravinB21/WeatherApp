import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'; 



@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  option: any;

  users: any;

  constructor(private http: HttpClient) { }

  getOption(event: any) {
    this.option = event.target.value;
    console.log(this.option);
    this.getSearchData();
    this.getforecast1().subscribe((data1: any) => {
      this.forecastdata = data1;
      console.log(this.forecastdata)
    })
  }

  getSearchData() {
    this.getsearchWeather().subscribe((data: any) => {
      this.users = data;
      console.log(this.users)
    });
  }

  city1:any;
  getInput() {

    this.getCurrent().subscribe((data: any) => {
      this.users = data;
      console.log(this.users.name)
      this.city1=this.users.name;
      //console.log(this.users)
      this.getCityTemp1().subscribe((data1: any) => {
        this.users = data1;
        console.log(this.users)
      });
    });
    this.getforecast2().subscribe((data2:any)=>{
      this.forecastdata=data2;
      console.log(this.forecastdata)
    })

//console.log(this.city1)

  }

  getforecastData() {
    this.getforecast().subscribe((data1: any) => {
      this.forecastdata = data1;
      console.log(this.forecastdata)
    })
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  }
  lat: any;
  lon: any;
  locationData:any
  //flag:boolean = true;
  showPosition = (position: any) => {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    console.log(this.lat, this.lon);
    // this.flag=false;
    this.getInput();
    // this.getCurrent().subscribe((data:any)=>{
    //   this.locationData=data;
    //   console.log(this.locationData)
    // })
    
    // this.getCityTemp1().subscribe((data: any) => {
    //   this.users = data;
    //   console.log(this.users)
    // });
    //this.getforecastData();

  }

  getCurrent(): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=2d6947d8f6988efe62da93bc86547891`)
  }


  cityName: any;
  id: any;
  forecastdata: any
  select: any;
  getTemp(city: any) {
    this.cityName = city;
    this.id = document.getElementById('usr');
    this.id.value = '';
    //for current date
    //localStorage.setItem("name",this.cityName)
    this.getCityTemp().subscribe((data: any) => {
      this.users = data;
      console.log(this.users)
    });
    //forecast 
    this.getforecastData();
    this.select = document.getElementById('sel1');
    //console.log(this.select)
    var option = document.createElement('option');
    if (city !== '') {
      option.textContent = city;
      option.value = city;
      this.select.appendChild(option);
      localStorage.setItem(city, city);
    }



  }
 

  getCityTemp1() {
    return this.http.get(`http://api.weatherapi.com/v1/current.json?key=fdcf8f64d4f04a15a8f61530211804&q=mumbai&aqi=no`)
  }
  getCityTemp() {
    return this.http.get(`http://api.weatherapi.com/v1/current.json?key=fdcf8f64d4f04a15a8f61530211804&q=${this.cityName}&aqi=no`)
  }

  getforecast() {
    return this.http.get(`http://api.weatherapi.com/v1/forecast.json?key=a0024eb272124f0abdc73654211804&q=${this.cityName}&days=4&aqi=no&alerts=no`)
  }
  getforecast2() {
    return this.http.get(`http://api.weatherapi.com/v1/forecast.json?key=a0024eb272124f0abdc73654211804&q=mumbai&days=4&aqi=no&alerts=no`)
  }

  getforecast1() {
    return this.http.get(`http://api.weatherapi.com/v1/forecast.json?key=a0024eb272124f0abdc73654211804&q=${this.option}&days=4&aqi=no&alerts=no`)
  }

  getsearchWeather() {
    return this.http.get(`http://api.weatherapi.com/v1/current.json?key=fdcf8f64d4f04a15a8f61530211804&q=${this.option}&aqi=no`)
  }

  key: any;
  item: any;
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
