import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago-en-linea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pago-en-linea.component.html',
  styleUrls: ['./pago-en-linea.component.css'],
})
export class PagoEnLineaComponent implements OnInit {
  paymentForm: FormGroup;
  orderId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: [''],
      cardHolder: [''],
      expiryDate: [''],
      cvv: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.orderId = params['orderId'];
      console.log('Order ID:', this.orderId); // Mensaje de depuración
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      console.log('Payment data:', this.paymentForm.value);
      // Aquí puedes añadir la lógica para procesar el pago en línea.

      // Simular un tiempo de procesamiento antes de redirigir a la confirmación
      setTimeout(() => {
        if (this.orderId) {
          this.router.navigate(['/confirmacion', { orderId: this.orderId }]);
        } else {
          console.error('Order ID is missing.');
        }
      }, 2000); // Simulación de un tiempo de procesamiento de 2 segundos
    } else {
      console.error('Please fill all the required fields for online payment.');
    }
  }
}
