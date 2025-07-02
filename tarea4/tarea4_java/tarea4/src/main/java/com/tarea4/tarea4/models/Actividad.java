package com.tarea4.tarea4.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "actividad")
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "dia_hora_termino", nullable = false)
    private LocalDateTime diaHoraTermino;

    @Column(name = "dia_hora_inicio", nullable = false)
    private LocalDateTime diaHoraInicio;

    @Column(nullable = false)
    private String sector;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String tema;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Nota> notas;

    @OneToOne(mappedBy="actividad", fetch=FetchType.LAZY)
    private ActividadTema actividadTema;


    // constructor
    public Actividad() { }

    // getters y setters
    public Integer getId() {
        return id;
    }

    public String getTema() {
        return actividadTema != null ? actividadTema.getTema() : "";
    }

    public LocalDateTime getDiaHoraTermino() {
        return diaHoraTermino;
    }

    public void setDiaHoraTermino(LocalDateTime diaHoraTermino) {
        this.diaHoraTermino = diaHoraTermino;
    }

    public LocalDateTime getDiaHoraInicio() {
        return diaHoraInicio;
    }

    public void setDiaHoraInicio(LocalDateTime diaHoraInicio) {
        this.diaHoraInicio = diaHoraInicio;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Nota> getNotas() {
        return notas;
    }

    public void setNotas(List<Nota> notas) {
        this.notas = notas;
    }

    @Transient
    public Double getPromedio() {
        if (notas == null || notas.isEmpty()) return null;
        return notas.stream()
                    .mapToInt(Nota::getNota)
                    .average()
                    .orElse(Double.NaN);
    }
}
