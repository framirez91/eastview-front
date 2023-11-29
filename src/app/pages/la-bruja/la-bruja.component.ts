import { Component } from '@angular/core';
import { TareaService } from 'src/app/services/tarea.service';
import { Tarea } from '../../interfaces/tarea';
import { Semana } from '../../interfaces/Semana';
import { SemanaService } from 'src/app/services/semana.service';

@Component({
  selector: 'app-la-bruja',
  templateUrl: './la-bruja.component.html',
  styleUrls: ['./la-bruja.component.css'],
})
export class LaBrujaComponent {
  tareas: Tarea[] = []; // Asumiendo que Tarea es la interfaz o clase de tus tareas
  selectedDia: number | undefined;
  nombre_dia: Semana[] = [];
  tareasSeleccionadas: Tarea[] = []; // Array de tareas seleccionadas
  filtroDiaSemana: number | null = null;
  constructor(
    private tareaService: TareaService,
    private semanaService: SemanaService
  ) {}

  obtenerDiasSemana(): void {
    this.semanaService.getSemana().subscribe(
      (dias: Semana[]) => {
        this.nombre_dia = dias;
      },
      (error) => {
        console.error('Error al obtener los días de la semana:', error);
      }
    );
  }
  obtenerNombreDia(idDia: number): string {
    const diaEncontrado = this.nombre_dia.find((dia) => dia.id_dia === idDia);
    return diaEncontrado ? diaEncontrado.nombre_dia : 'No encontrado';
  }

  ngOnInit(): void {
    // Llama a la función para cargar las tareas al inicializar el componente
    this.obtenerTareas();
    this.obtenerDiasSemana();

    // Llama a la función para cargar los días de la semana al inicializar el componente
  }

  obtenerTareas(): void {
    // Lógica para obtener las tareas desde tu servicio de tareas
    // Por ejemplo:
    this.tareaService.getTareas().subscribe((tareas) => {
      this.tareas = tareas;
    });
  }

  ejecutarTarea(tarea: Tarea): void {
    if (tarea && tarea.id_tarea) {
      // Cambiar el estado de la tarea a "Completada"
      tarea.estado = 'Completada';
  
      // Llamar al servicio para actualizar el estado de la tarea en la base de datos
      this.tareaService.actualizarTarea(tarea.id_tarea, tarea).subscribe(
        () => {
          alert(`Tarea con ID ${tarea.id_tarea} marcada como Completada`);
          // Aquí podrías realizar alguna acción adicional si la actualización tiene éxito
        },
        error => {
          alert("Error al marcar como Completada la tarea ");
          // Aquí puedes manejar el error en caso de que falle la actualización
        }
      );
    }
  }

  // Método para aplicar el filtro
  aplicarFiltro(dia: number | null): void {
    this.filtroDiaSemana = dia;
  }

  // Método para limpiar el filtro
  limpiarFiltro(): void {
    this.filtroDiaSemana = null;
  }
}
