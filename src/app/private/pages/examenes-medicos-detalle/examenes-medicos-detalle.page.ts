import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ExamenesMedicoService } from '../../services/examenes-medico.service';


@Component({
  selector: 'app-examenes-medicos-detalle',
  templateUrl: './examenes-medicos-detalle.page.html',
  styleUrls: ['./examenes-medicos-detalle.page.scss'],
})
export class ExamenesMedicosDetallePage implements OnInit {

  FormularioExamenMedicoDetalle!:FormGroup;

  idExamenMedicamento!:number;

  ExamenMedicoDetalle:any;

  // Atributo para el estado del formulario

  StateForm:boolean = false;

  constructor(private formBuilder:FormBuilder, private router:Router, private toastController:ToastController, private activatedRouter:ActivatedRoute,private  examenesMedicoService:ExamenesMedicoService) { 
    this.FormularioExamenMedicoDetalle = this.formBuilder.group({
      
      'nombre' : new FormControl('',[Validators.required,Validators.minLength(3)]),
      'fecha' : new FormControl('',[Validators.required,Validators.minLength(3)]),
      'resultado' : new FormControl('',[Validators.required,Validators.minLength(3)]),
      
    })
  }

  ngOnInit() {
    this.idExamenMedicamento =  Number(this.activatedRouter.snapshot.paramMap.get('id'));
    this.Ver_ExamenMedico();
  }
  

  // Método creado para hacer el delete del medicamento
  deleteExamen(){
    this.examenesMedicoService.Eliminar_ExamenMedico(this.idExamenMedicamento).subscribe({
      next: (s) =>{
        this.router.navigate(['examenes-medicos'])
        // Toast de ionic
        this.presentToast('bottom');
      }
    })
  }


  // Se podría mejorar el toast con un diseño mejor

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Examen Médico, Eliminado Correctamente!',
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
  UpdateExamenMedico(Form:any){
    this.examenesMedicoService.Actualizar_ExamenMedico(this.idExamenMedicamento,Form).subscribe({
      next: (s) =>{
        this.router.navigate(['examenes-medicos'])
      }
    })
  }

  // Método para ver el examen medico

  Ver_ExamenMedico(){
    this.examenesMedicoService.Ver_ExamenMedico(this.idExamenMedicamento).subscribe({
      next: (s:any) =>{
        this.ExamenMedicoDetalle = s.examenes_medicos;
        this.FormularioExamenMedicoDetalle.patchValue({
          nombre : this.ExamenMedicoDetalle.nombre,
          fecha : this.ExamenMedicoDetalle.fecha,
          resultado : this.ExamenMedicoDetalle.resultado
        })
      }
    })
  }
}
