package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by mauchilan on 20/3/17.
 */

public class OpcionUso implements Serializable {
    private int idOpcionUso;
    //private Integer idUsuario;
    private String usuario;
    //private Integer idOpcion;
    private int opcion;
    private int numeroUso;
    private Timestamp fechaUltimoUso;
    private Usuario usuarioByIdUsuario;
    private Opcion opcionByIdOpcion;


    public int getIdOpcionUso() {
        return idOpcionUso;
    }

    public void setIdOpcionUso(int idOpcionUso) {
        this.idOpcionUso = idOpcionUso;
    }

    /*@Basic
    @Column(name = "IdUsuario", nullable = true)
    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }*/


    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    /*@Basic
    @Column(name = "IdOpcion", nullable = true)
    public Integer getIdOpcion() {
        return idOpcion;
    }

    public void setIdOpcion(Integer idOpcion) {
        this.idOpcion = idOpcion;
    }*/


    public int getOpcion() {
        return opcion;
    }

    public void setOpcion(int opcion) {
        this.opcion = opcion;
    }


    public int getNumeroUso() {
        return numeroUso;
    }

    public void setNumeroUso(int numeroUso) {
        this.numeroUso = numeroUso;
    }


    public Timestamp getFechaUltimoUso() {
        return fechaUltimoUso;
    }

    public void setFechaUltimoUso(Timestamp fechaUltimoUso) {
        this.fechaUltimoUso = fechaUltimoUso;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OpcionUso opcionUso = (OpcionUso) o;

        if (idOpcionUso != opcionUso.idOpcionUso) return false;
        if (opcion != opcionUso.opcion) return false;
        if (numeroUso != opcionUso.numeroUso) return false;
        //if (idUsuario != null ? !idUsuario.equals(opcionUso.idUsuario) : opcionUso.idUsuario != null) return false;
        if (usuario != null ? !usuario.equals(opcionUso.usuario) : opcionUso.usuario != null) return false;
        //if (idOpcion != null ? !idOpcion.equals(opcionUso.idOpcion) : opcionUso.idOpcion != null) return false;
        if (fechaUltimoUso != null ? !fechaUltimoUso.equals(opcionUso.fechaUltimoUso) : opcionUso.fechaUltimoUso != null)
            return false;

        return true;
    }


    public int hashCode() {
        int result = idOpcionUso;
        //result = 31 * result + (idUsuario != null ? idUsuario.hashCode() : 0);
        result = 31 * result + (usuario != null ? usuario.hashCode() : 0);
        //result = 31 * result + (idOpcion != null ? idOpcion.hashCode() : 0);
        result = 31 * result + opcion;
        result = 31 * result + numeroUso;
        result = 31 * result + (fechaUltimoUso != null ? fechaUltimoUso.hashCode() : 0);
        return result;
    }


    public Usuario getUsuarioByIdUsuario() {
        return usuarioByIdUsuario;
    }

    public void setUsuarioByIdUsuario(Usuario usuarioByIdUsuario) {
        this.usuarioByIdUsuario = usuarioByIdUsuario;
    }


    public Opcion getOpcionByIdOpcion() {
        return opcionByIdOpcion;
    }

    public void setOpcionByIdOpcion(Opcion opcionByIdOpcion) {
        this.opcionByIdOpcion = opcionByIdOpcion;
    }
}
