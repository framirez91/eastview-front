import { Component } from '@angular/core';
import { Ciudadano } from 'src/app/interfaces/ciudadano';
import { CiudadanoService } from 'src/app/services/ciudadano.service';
import { Semana } from '../../in../../interfaces/Semana';
import { SemanaService } from 'src/app/services/semana.service';
import { Tarea } from 'src/app/interfaces/tarea';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-el-ojo',
  templateUrl: './el-ojo.component.html',
  styleUrls: ['./el-ojo.component.css'],
})
export class ElOjoComponent {
  nuevaTarea: Tarea = {
    id_ciudadano: 0, // Puedes cambiar este valor inicial por defecto
    id_dia_semana: 0, // Puedes cambiar este valor inicial por defecto
    tarea: '',
    estado: 'No Completada',
  };

  nuevoCiudadano: Ciudadano = { nombre: '' };
  ciudadanos: Ciudadano[] = [];
  nombre_dia: Semana[] = [];
  tareas: Tarea[] = [];
  nombreCiudadano: string = '';
  nombreCiudadanoEditado: string = '';
  showModal: boolean = false;
  ciudadanoIdEditado: number | undefined;
  selectedDia: string = '';
 

  constructor(
    private ciudadanoService: CiudadanoService,
    private semanaservice: SemanaService,
    private tareaService: TareaService
  ) {}

  ngOnInit(): void {
    this.obtenerCiudadanos();
    this.obtenerDiasSemana();
    this.ObtenerTareas();
  }
  obtenerNombreDia(idDia: number): string {
    const diaEncontrado = this.nombre_dia.find((dia) => dia.id_dia === idDia);
    return diaEncontrado ? diaEncontrado.nombre_dia : 'No encontrado';
  }

  obtenerDiasSemana(): void {
    this.semanaservice.getSemana().subscribe(
      (data: Semana[]) => {
        this.nombre_dia = data;
      },
      (error) => {
        console.error('Error al obtener los días de la semana:', error);
      }
    );
  }
  obtenerCiudadanos(): void {
    this.ciudadanoService.getCiudadano().subscribe((ciudadanos) => {
      this.ciudadanos = ciudadanos;
    });
  }

  ObtenerTareas(): void {
    this.tareaService.getTareas().subscribe((tarea) => {
      this.tareas = tarea;
    });
  }

  editarPopup(ciudadano: Ciudadano): void {
    this.nombreCiudadanoEditado = ciudadano.nombre; // Mostrar el nombre actual en el input
    this.showModal = true; // Mostrar el pop-up
    this.ciudadanoIdEditado = ciudadano.id_ciudadano; // Guardar el ID del ciudadano a editar
  }

  cerrarPopup(): void {
    this.showModal = false; // Ocultar el pop-up
  }

  // CREAR USUARIO
  crearCiudadano(): void {
    if (this.nuevoCiudadano.nombre.trim()) {
      this.ciudadanoService.createCiudadano(this.nuevoCiudadano).subscribe(
        (response) => {
          alert('Ciudadano creado exitosamente');

          this.nuevoCiudadano.nombre = ''; // Borra el nombre del formulario
          location.reload(); // Recarga la página para actualizar los datos mostrados
        },
        (error) => {
          console.error('Error al crear ciudadano', error);
          // Manejo de errores
        }
      );
    } else {
      console.error('Nombre de ciudadano requerido');
      // Manejo si el nombre del ciudadano está vacío
    }
  }
  // ELIMINAR USUARIO
  eliminarCiudadano(id: number | undefined): void {
    if (id === undefined) {
      console.error('ID de ciudadano no válido');
      return;
    }

    this.ciudadanoService.deleteCiudadano(id).subscribe(
      (response) => {
        alert('Ciudadano eliminado exitosamente');
        this.ciudadanos = this.ciudadanos.filter((c) => c.id_ciudadano !== id);
      },
      (error) => {
        console.error('Error al eliminar ciudadano', error);
        // Manejo de errores
      }
    );
  }

  // EDITAR USUARIO
  guardarEdicion(): void {
    if (
      this.ciudadanoIdEditado === undefined ||
      this.nombreCiudadanoEditado.trim() === ''
    ) {
      console.error('ID de ciudadano o nombre no válido');
      return;
    }

    const ciudadanoEditado: Ciudadano = {
      id_ciudadano: this.ciudadanoIdEditado,
      nombre: this.nombreCiudadanoEditado.trim(), // Nombre editado
    };

    this.ciudadanoService
      .updateCiudadano(this.ciudadanoIdEditado, ciudadanoEditado)
      .subscribe(
        (response) => {
          alert('Ciudadano editado exitosamente');
          this.obtenerCiudadanos(); // Actualizar lista de ciudadanos
          this.showModal = false; // Cerrar pop-up después de editar
          this.nombreCiudadanoEditado = ''; // Limpiar el campo de edición del nombre
        },
        (error) => {
          console.error('Error al editar ciudadano', error);
          // Manejo de errores
        }
      );
  }

  async crearNuevaTarea(): Promise<void> {
    try {
      if (!this.validarTarea(this.nuevaTarea)) {
        throw new Error('Por favor, complete todos los campos');
      }

      const response = await this.tareaService
        .crearTarea(this.nuevaTarea)
        .toPromise();
      alert('Tarea creada exitosamente');
      this.ObtenerTareas();

      // Limpiar el formulario después de crear la tarea
      this.limpiarFormulario();

      // Lógica adicional después de crear la tarea, si es necesaria
    } catch (error) {
      console.error('Error al crear tarea', error);
      // Manejo de errores
    }
  }

  limpiarFormulario(): void {
    this.nuevaTarea.id_ciudadano = 0;
    this.nuevaTarea.id_dia_semana = 0;
    this.nuevaTarea.tarea = '';
  }

  validarTarea(tarea: Tarea): boolean {
    return (
      tarea.id_ciudadano !== 0 &&
      tarea.id_dia_semana !== 0 &&
      tarea.tarea.trim() !== ''
    );
  }

  eliminarTarea(idTarea: number | undefined): void {
    if (idTarea === undefined) {
      console.error('ID de tarea no válido');
      return;
    }

    this.tareaService.eliminarTarea(idTarea).subscribe(
      () => {
        alert('Tarea eliminada correctamente');
        this.ObtenerTareas(); // Actualizar lista de tareas
        // Aquí puedes realizar otras acciones después de eliminar la tarea si es necesario
      },
      (error) => {
        console.error('Error al eliminar la tarea', error);
        // Manejo de errores
      }
    );
  }
  tareaSeleccionada: Tarea | null = null;

  editarTarea(tarea: Tarea): void {
  if (!tarea) {
    console.error('La tarea seleccionada es nula o indefinida');
    return;
  }

  this.tareaSeleccionada = tarea;

  const modal = document.getElementById('editarTareaModal');
  if (modal) {
    modal.classList.add('show');
  }
}


  cerrarModal(): void {
    const modal = document.getElementById('editarTareaModal');
    if (modal) {
      modal.classList.remove('show');
    }
  
 
  }
  guardarCambios(): void {
    if (this.tareaSeleccionada && this.tareaSeleccionada.id_tarea) {
      this.tareaService.actualizarTarea(this.tareaSeleccionada.id_tarea, this.tareaSeleccionada).subscribe(
        (response) => {
          // Manejo de la respuesta después de actualizar la tarea
          alert('Cambios guardados exitosamente');
          const modal = document.getElementById('editarTareaModal');
          if (modal) {
            modal.classList.remove('show');
          }
          this.tareaSeleccionada = null; // Limpiar la tarea seleccionada al cerrar el modal
        },
        (error) => {
          console.error('Error al guardar los cambios de la tarea', error);
          // Manejo de errores
        }
      );
    } else {
      console.error('La tarea seleccionada o su ID son nulos');
    }
  }
  
  

  
}
