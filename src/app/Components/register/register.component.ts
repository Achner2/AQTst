import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../../Services/register.service';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true,
  imports: [FormsModule,],
    animations: [
      trigger('fadeInOut', [
        state('void', style({
          opacity: 0
        })),
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
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private readonly router : Router, private readonly registerService: RegisterService){}

  onRegister(){
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.registerService.register(credentials).subscribe({
      next: (response) => {
        console.log("Usuario Registrado con exito" + response)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registro relizado con exito",
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(["/login"])
      },
      error: (err) =>{
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Credenciales Incorrectas o no disponibles",
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
