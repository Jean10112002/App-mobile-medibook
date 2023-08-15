import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MedicamentosService } from '../../services/medicamentos.service';


@Component({
  selector: 'app-medicamentos-detalle',
  templateUrl: './medicamentos-detalle.page.html',
  styleUrls: ['./medicamentos-detalle.page.scss'],
})
export class MedicamentosDetallePage implements OnInit {

  FormularioMedicamentoDetalle!:FormGroup;

  // Atributo para el estado del formulario

  StateForm:boolean = false;

  constructor(private formBuilder:FormBuilder, private activatedRoute:ActivatedRoute, private toastController:ToastController,private router:Router, private medicamentoServicio:MedicamentosService) { 
    this.FormularioMedicamentoDetalle = this.formBuilder.group({
      'nombre' : new FormControl('',[Validators.required,Validators.minLength(3)]),
      'dosis' : new FormControl('',[Validators.required,Validators.minLength(3)]),
      'lapso' : new FormControl('',[Validators.required,Validators.minLength(3)]),
      'duracion' : new FormControl('',[Validators.required,Validators.minLength(3)])
    })
  }

  idMedicamento:any;
  ShowMedicamento:any;

  ngOnInit() {
    this.idMedicamento =  Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.Ver_Medicamento();
  }

  Ver_Medicamento() {
    this.medicamentoServicio.Ver_Medicamento(this.idMedicamento).subscribe({
      next : (s:any) =>{
        this.ShowMedicamento = s.medicamentos;
        this.FormularioMedicamentoDetalle.patchValue({
          nombre: this.ShowMedicamento.nombre,
          dosis: this.ShowMedicamento.dosis,
          lapso: this.ShowMedicamento.lapso,
          duracion: this.ShowMedicamento.duracion
        });
        console.log(this.ShowMedicamento);
      }
    })
  }

  // Método para actualizar medicamento

  UpdateMedicament(Form:any){
    debugger;
    this.medicamentoServicio.Actualizar_Medicamento(this.idMedicamento,Form).subscribe({
      next : (s) =>{
        this.presentToast2('bottom');
        this.router.navigate(['medicamentos']);
      }
    })
  }

  // Método creado para hacer el delete del medicamento
  DeleteMedicament(){
    this.medicamentoServicio.Eliminar_Medicamento(this.idMedicamento).
    subscribe({
      next: (s) =>{
        debugger;
        this.router.navigate(['/medicamentos'])
        // Toast de ionic
        this.presentToast('bottom');
      }
    })
  }


  // Se podría mejorar el toast con un diseño mejor

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Medicamento, Eliminado Correctamente!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  async presentToast2(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Medicamento, Actualizado Correctamente!',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  // Cambiar el estado del formulario

  ChangeStateForm(){
    this.StateForm = !this.StateForm;
  }

  // Se podría hacer ya el edit método
  EditMecament(Form:any){
    this.StateForm = true;
  }
}
