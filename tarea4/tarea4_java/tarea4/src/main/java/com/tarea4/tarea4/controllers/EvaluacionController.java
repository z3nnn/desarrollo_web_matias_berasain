package com.tarea4.tarea4.controllers;

import com.tarea4.tarea4.models.Actividad;
import com.tarea4.tarea4.services.EvaluacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/evaluar")
public class EvaluacionController {

    private final EvaluacionService service;
    public EvaluacionController(EvaluacionService service) { this.service = service; }

    @GetMapping
    public List<Actividad> getParaEvaluar() {
        return service.listarActividadesTerminadas();
    }

    @PostMapping("/{id}/nota")
    public ResponseEntity<?> postNota(
        @PathVariable Integer id,
        @RequestParam Integer valor
    ) {
        if (valor < 1 || valor > 7) {
            return ResponseEntity.badRequest().body("La nota debe estar entre 1 y 7");
        }
        try {
            service.agregarNota(id, valor);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error interno: " + e.getMessage());
        }
    }

}
