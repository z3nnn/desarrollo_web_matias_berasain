package com.tarea4.tarea4.models;

import jakarta.persistence.*;

@Entity
@Table(name="actividad_tema")
public class ActividadTema {
    @Id
    @Column(name="actividad_id")
    private Integer actividadId;

    @OneToOne
    @MapsId
    @JoinColumn(name="actividad_id")
    private Actividad actividad;

    @Column(nullable=false)
    private String tema;

    // getters/setters

    public String getTema() {
        return tema;
    }
}
