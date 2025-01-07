import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient  // Inject HttpClient
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  openRegistrationPage() {
    this.router.navigateByUrl("/registration");
  }


onSubmit() {
  if (this.loginForm.valid) {
    const loginData = this.loginForm.value;

    this.http.post('http://localhost:3000/api/auth/login', loginData).subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        // alert('Login successful!');
        
        // Store token and user info in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        // Redirect to individual dashboard
        this.router.navigateByUrl('/individual-dashboard');
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid login credentials. Please try again.');
      }
    });
  } else {
    alert('Please fill out all fields correctly.');
  }
}
}