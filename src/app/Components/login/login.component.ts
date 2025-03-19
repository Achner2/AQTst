import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthServiceService } from '../../Services/auth-service.service';
import { ParticlesBackgroundComponent } from '../particles-background/particles-background.component'; // ✅ Importa el componente standalone


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css',
  imports: [FormsModule,ParticlesBackgroundComponent],

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
  email: string = '';
  password: string = '';

  constructor(
    private readonly router: Router,
    private readonly authService: AuthServiceService
  ) {}

  onLogin(): void {
    if (!this.email || !this.password) {
      Swal.fire({
        title: "Error",
        text: "Por favor, ingresa tu correo y contraseña",
        icon: "error"
      });
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        Swal.fire({
          title: "Inicio de sesión exitoso",
          icon: "success",
          timer: 2000
        });

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      },
      error: () => {
        Swal.fire({
          title: "Error",
          text: "Correo o contraseña incorrectos",
          icon: "error"
        });
      }
    });
  }
}
