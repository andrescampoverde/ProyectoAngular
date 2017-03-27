package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by mauchilan on 20/3/17.
 */

public class SesionUsuario implements Serializable {
    private int idSesion;
    private String usuario;
    private Timestamp fechaInicio;
    private Timestamp fechaFin;
    private Integer motivoCierre;
    private String estado;
    private String host;
    private String comentario;


    public int getIdSesion() {
        return idSesion;
    }

    public void setIdSesion(int idSesion) {
        this.idSesion = idSesion;
    }


    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }


    public Timestamp getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Timestamp fechaInicio) {
        this.fechaInicio = fechaInicio;
    }



    public Timestamp getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(Timestamp fechaFin) {
        this.fechaFin = fechaFin;
    }


    public Integer getMotivoCierre() {
        return motivoCierre;
    }

    public void setMotivoCierre(Integer motivoCierre) {
        this.motivoCierre = motivoCierre;
    }


    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }


    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }


    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SesionUsuario that = (SesionUsuario) o;

        if (idSesion != that.idSesion) return false;
        if (usuario != null ? !usuario.equals(that.usuario) : that.usuario != null) return false;
        if (fechaInicio != null ? !fechaInicio.equals(that.fechaInicio) : that.fechaInicio != null) return false;
        if (fechaFin != null ? !fechaFin.equals(that.fechaFin) : that.fechaFin != null) return false;
        if (motivoCierre != null ? !motivoCierre.equals(that.motivoCierre) : that.motivoCierre != null) return false;
        if (estado != null ? !estado.equals(that.estado) : that.estado != null) return false;
        if (host != null ? !host.equals(that.host) : that.host != null) return false;
        if (comentario != null ? !comentario.equals(that.comentario) : that.comentario != null) return false;

        return true;
    }


    public int hashCode() {
        int result = idSesion;
        result = 31 * result + (usuario != null ? usuario.hashCode() : 0);
        result = 31 * result + (fechaInicio != null ? fechaInicio.hashCode() : 0);
        result = 31 * result + (fechaFin != null ? fechaFin.hashCode() : 0);
        result = 31 * result + (motivoCierre != null ? motivoCierre.hashCode() : 0);
        result = 31 * result + (estado != null ? estado.hashCode() : 0);
        result = 31 * result + (host != null ? host.hashCode() : 0);
        result = 31 * result + (comentario != null ? comentario.hashCode() : 0);
        return result;
    }
}
