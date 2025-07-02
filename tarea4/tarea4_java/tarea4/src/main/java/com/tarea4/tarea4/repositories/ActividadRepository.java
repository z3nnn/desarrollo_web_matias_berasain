package com.tarea4.tarea4.repositories;

import com.tarea4.tarea4.models.Actividad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;               
import org.springframework.data.repository.query.Param;          
import java.time.LocalDateTime;
import java.util.List;

public interface ActividadRepository extends JpaRepository<Actividad, Integer> {

    List<Actividad> findByDiaHoraTerminoBefore(LocalDateTime fecha);

    @Query("SELECT a FROM Actividad a LEFT JOIN FETCH a.actividadTema WHERE a.diaHoraTermino < :ahora")
    List<Actividad> findTerminadasConTema(@Param("ahora") LocalDateTime ahora);

}
