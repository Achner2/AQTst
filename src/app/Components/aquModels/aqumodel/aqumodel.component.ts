import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextureLoader, MeshStandardMaterial } from 'three';



@Component({
  selector: 'app-aqumodel',
  template: `
    <div class="viewer-container" #rendererContainer>
      <div *ngIf="loading" class="loading">Cargando modelo...</div>
    </div>
  `,
  styles: [`
    .viewer-container {
      width: 300px;
      height: 200px;
      overflow: hidden;
      position: relative;
    
    }
    .viewer-container canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `]
})
export class AqumodelComponent implements OnInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  loading: boolean = false;

  ngOnInit() {
    this.initScene();
  }

  ngAfterViewInit() {
    this.onWindowResize();
    this.loadModel();
    this.animate();
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = null; // Fondo transparente
    
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 3;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Habilitar transparencia
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2; // Limita la rotación vertical a 90 grados (hacia arriba)
    this.controls.minPolarAngle = Math.PI / 2; // Limita la rotación vertical hacia abajo (no puede pasar de la horizontal)
    this.controls.screenSpacePanning = true;
    this.controls.minDistance = 1;
    this.controls.maxDistance = 10;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    this.scene.add(directionalLight);
  }

  private onWindowResize() {
    const width = this.rendererContainer.nativeElement.clientWidth;
    const height = this.rendererContainer.nativeElement.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private loadModel() {
    this.loading = true;
    const textureLoader = new TextureLoader();
    const texture = textureLoader.load('assets/3D/shaded.png'); // Ajusta la ruta de la textura

    const objLoader = new OBJLoader();
    objLoader.load('assets/3D/base.obj', (object) => {
      object.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new MeshStandardMaterial({ map: texture });
        }
      });

      object.scale.set(1.8, 1.8, 1.8);

      // Centrar modelo en la escena
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      object.position.sub(center);

      this.scene.add(object);
      this.loading = false;
    }, undefined, (error) => {
      console.error('Error cargando el modelo:', error);
      this.loading = false;
    });
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    this.renderer.dispose();
  }
}
