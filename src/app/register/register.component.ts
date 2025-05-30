import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule} from '@angular/forms';
import { IntegrationService } from '../services/integration.service';
import { LocalStorageService } from '../service/local-storage.service';
import { SignupRequest } from '../models/signup-request';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  msg: string | null | undefined = null;

  signupForm: FormGroup;

  constructor(
    private integrationService: IntegrationService,
    private storage: LocalStorageService,
    private fb: FormBuilder
  ) {
    // Initialize form using FormBuilder
    this.signupForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  public onSubmit() {
    this.storage.remove('auth-key');

    if (this.signupForm.valid) {
      const formValue = this.signupForm.value;

      const request: SignupRequest = new SignupRequest();
      request.fullName = formValue.fullName;
      request.username = formValue.username;
      request.password = formValue.password;
      request.role = formValue.role;

      this.integrationService.doRegister(request).subscribe({
        next: (res) => {
          this.msg = res.response?.toString() ?? null;
          console.log(res.response);
        },
        error: (err) => {
          console.error('Error Received', err);
        }
      });
    } else {
      console.log('Form is invalid on submit');
    }
  }
}
