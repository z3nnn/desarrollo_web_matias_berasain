package com.tarea4.tarea4.controllers;

import com.tarea4.tarea4.models.Actividad;
import com.tarea4.tarea4.services.EvaluacionService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ViewController {

    private final EvaluacionService evaluacionService;

    public ViewController(EvaluacionService evaluacionService) {
        this.evaluacionService = evaluacionService;
    }

    @GetMapping("/evaluaciones")
    public String mostrarEvaluaciones(Model model) {
        List<Actividad> actividades = evaluacionService.listarActividadesTerminadas();
        model.addAttribute("actividades", actividades);
        return "evaluaciones";
    }
}
