import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css',
  imports: [FormsModule],

  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate('300ms ease-in-out')),
    ]),
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
    ]),
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
    ]),
    trigger('zoomIn', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
    ]),
    trigger('pulseAnimation', [
      transition(':enter', [
        style({ transform: 'scale(1)' }),
        animate('300ms ease-in-out', style({ transform: 'scale(1.05)' })),
        animate('300ms ease-in-out', style({ transform: 'scale(1)' }))
      ]),
    ])
  ]
})

export class LoginComponent {

  loginImage = "/assets/imagenes/olas.jpg";
  email: string = '';
  password: string = '';

  constructor(private readonly router: Router) {}

  onLogin(): void {
    Swal.fire({
      title: "Inicio de sesión exitoso",
      icon: "success",
      timer: 2000
    });

    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
