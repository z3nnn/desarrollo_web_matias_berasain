package com.tarea4.tarea4.services;

import com.tarea4.tarea4.models.Actividad;
import com.tarea4.tarea4.repositories.ActividadRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
public class ActividadService {
    private final ActividadRepository repo;
    public ActividadService(ActividadRepository repo) { this.repo = repo; }

    public List<Actividad> findAll() { return repo.findAll(); }
    public Actividad save(Actividad a) { return repo.save(a); }
    public List<Actividad> findPasadas(LocalDateTime now) {
        return repo.findByDiaHoraTerminoBefore(now);
    }
    public Optional<Actividad> findById(Integer id) {
        return repo.findById(id);
    }

}

