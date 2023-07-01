import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SharingService {
  sharedData1!: FormGroup;
  sharedData2!: number;

  updateSharedData(form: FormGroup, num: number) {
    this.sharedData1 = form;
    this.sharedData2 = num
    console.log(this.sharedData1)
    console.log(this.sharedData2)
  }

  getSharedData1(): FormGroup {
    console.log(this.sharedData1)
    return this.sharedData1;
  }
  getSharedData2(): number {
    console.log(this.sharedData1)
    return this.sharedData2;
  }

  
}
