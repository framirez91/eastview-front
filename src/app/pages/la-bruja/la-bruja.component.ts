import { Component } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import { Tarea } from '../../interfaces/tarea';
import { Semana } from '../../interfaces/Semana';
import { SemanaService } from 'src/app/services/semana.service';

@Component({
  selector: 'app-la-bruja',
  templateUrl: './la-bruja.component.html',
  styleUrls: ['./la-bruja.component.css']
})
export class LaBrujaComponent  {
  tareas: Tarea[] = []; // Asumiendo que Tarea es la interfaz o clase de tus tareas
  selectedDia: number | undefined;
  diasSemana: any[] = []; // Asumiendo que aquí almacenarás tus días de la semana
  semanas: Semana[] = [];

  constructor(private tareaService: TareaService,private semanaService: SemanaService) {}

  ngOnInit(): void {
    // Llama a la función para cargar las tareas al inicializar el componente
    this.obtenerTareas();
    // Llama a la función para cargar los días de la semana al inicializar el componente
    this.obtenerDiasSemana();
  }

  obtenerTareas(): void {
    // Lógica para obtener las tareas desde tu servicio de tareas
    // Por ejemplo:
    this.tareaService.getTareas().subscribe((tareas) => {
      this.tareas = tareas;
    });
  }

  obtenerDiasSemana(): void {
    // Lógica para obtener los días de la semana desde tu servicio correspondiente
    // Por ejemplo:
    this.semanaService.getSemana().subscribe((dias) => {
      this.diasSemana = dias;
    });
  }

  ejecutarTareas(): void {
    // if (this.selectedDia === undefined) {
    //   console.error('Por favor, selecciona un día de la semana');
    //   return;
    // }

    // // Lógica para ejecutar las tareas correspondientes al día seleccionado
    // // Por ejemplo:
    // this.tareaService.ejecutarTareas(this.selectedDia).subscribe(
    //   (response) => {
    //     // Actualiza las tareas después de ejecutarlas si es necesario
    //     this.obtenerTareas();
    //     console.log('Tareas ejecutadas correctamente');
    //   },
    //   (error) => {
    //     console.error('Error al ejecutar las tareas', error);
    //     // Manejo de errores
    //   }
    // );
  }

  editarTarea(tarea: Tarea): void {
    // Lógica para editar una tarea específica
    // Por ejemplo:
    // this.tareaService.editarTarea(tarea).subscribe(...);
  }

  eliminarTarea(idTarea: number): void {
    // Lógica para eliminar una tarea específica
    // Por ejemplo:
    // this.tareaService.eliminarTarea(idTarea).subscribe(...);
  }
}