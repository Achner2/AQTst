import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

declare const particlesJS: any;

@Component({
  selector: 'app-particles-background',
  standalone: true,
  imports: [CommonModule], // ✅ Se importa CommonModule porque es standalone
  templateUrl: './particles-background.component.html',
  styleUrls: ['./particles-background.component.css']
})
export class ParticlesBackgroundComponent implements AfterViewInit {

  constructor() {}

  ngAfterViewInit(): void {
    this.initParticles();
  }

  private initParticles(): void {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 15,
          density: {
            enable: true,
            value_area: 4103.5677364878175
          }
        },
        color: {
          value: '#3eafff'
        },
        shape: {
          type: 'polygon',
          stroke: {
            width: 0,
            color: '#000'
          },
          polygon: {
            nb_sides: 6
          },
          image: {
            src: 'img/github.svg',
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 160,
          random: false,
          anim: {
            enable: true,
            speed: 10,
            size_min: 40,
            sync: false
          }
        },
        line_linked: {
          enable: false,
          distance: 200,
          color: '#ffffff',
          opacity: 1,
          width: 2
        },
        move: {
          enable: true,
          speed: 8,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: false,
            mode: 'grab'
          },
          onclick: {
            enable: false,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: false
    });
  }
}
