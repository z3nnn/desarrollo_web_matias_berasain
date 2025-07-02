package com.tarea4.tarea4.services;

import com.tarea4.tarea4.models.Nota;
import com.tarea4.tarea4.repositories.NotaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotaService {
    private final NotaRepository repo;
    public NotaService(NotaRepository repo) { this.repo = repo; }

    public Nota save(Nota n) { return repo.save(n); }
    public List<Nota> findByActividad(Long actividadId) {
        return repo.findByActividadId(actividadId);
    }
}
