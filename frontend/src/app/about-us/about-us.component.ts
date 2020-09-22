import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { GameinfoService } from '../service/gameinfo.service';



@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  validatingForm: FormGroup;

  constructor(private gameInfoService: GameinfoService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.validatingForm = new FormGroup({
      contactFormModalName: new FormControl('', Validators.required),
      contactFormModalEmail: new FormControl('', Validators.email),
      contactFormModalSubject: new FormControl('', Validators.required),
      contactFormModalMessage: new FormControl('', Validators.required)
    });
  }

  get contactFormModalName() {
    return this.validatingForm.get('contactFormModalName');
  }

  get contactFormModalEmail() {
    return this.validatingForm.get('contactFormModalEmail');
  }

  get contactFormModalSubject() {
    return this.validatingForm.get('contactFormModalSubject');
  }

  get contactFormModalMessage() {
    return this.validatingForm.get('contactFormModalMessage');
  }

  submitEmail(data) {
    this.gameInfoService.sendEmail(data.FirstName, data.LastName, data.message).subscribe(x => {

      alert('Email Sent');
  
    })
  }
}

