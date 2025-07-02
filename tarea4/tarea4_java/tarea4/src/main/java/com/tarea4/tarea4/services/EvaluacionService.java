package com.tarea4.tarea4.services;

import com.tarea4.tarea4.models.Actividad;
import com.tarea4.tarea4.models.Nota;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class EvaluacionService {

    private final ActividadService actividadService;
    private final NotaService notaService;

    public EvaluacionService(ActividadService actividadService,
                             NotaService notaService) {
        this.actividadService = actividadService;
        this.notaService = notaService;
    }

    public List<Actividad> listarActividadesTerminadas() {
        return actividadService.findPasadas(LocalDateTime.now());
    }

    public Nota agregarNota(Integer actividadId, Integer valor) {
        Actividad act = actividadService.findById(actividadId)
            .orElseThrow(() -> new IllegalArgumentException("Actividad no encontrada"));
        Nota nota = new Nota(valor, act);
        return notaService.save(nota);
    }
}
