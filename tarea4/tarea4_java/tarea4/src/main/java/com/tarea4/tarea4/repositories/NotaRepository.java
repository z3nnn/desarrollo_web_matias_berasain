package com.tarea4.tarea4.repositories;

import com.tarea4.tarea4.models.Nota;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotaRepository extends JpaRepository<Nota, Integer> {
    List<Nota> findByActividadId(Long actividadId);
}
