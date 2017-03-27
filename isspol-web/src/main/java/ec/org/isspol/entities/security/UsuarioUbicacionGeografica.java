package ec.org.isspol.entities.security;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by mauchilan on 20/3/17.
 */

public class UsuarioUbicacionGeografica implements Serializable {
    private int idUsuarioUbicacionGeografica;
    //private Integer idUsuario;
    private String usuario;
    private int idUbicacion;
    private String estado;
    private Integer idDiaMes;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Usuario usuarioByIdUsuario;


    public int getIdUsuarioUbicacionGeografica() {
        return idUsuarioUbicacionGeografica;
    }

    public void setIdUsuarioUbicacionGeografica(int idUsuarioUbicacionGeografica) {
        this.idUsuarioUbicacionGeografica = idUsuarioUbicacionGeografica;
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


    public int getIdUbicacion() {
        return idUbicacion;
    }

    public void setIdUbicacion(int idUbicacion) {
        this.idUbicacion = idUbicacion;
    }


    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }


    public Integer getIdDiaMes() {
        return idDiaMes;
    }

    public void setIdDiaMes(Integer idDiaMes) {
        this.idDiaMes = idDiaMes;
    }


    public String getCreacionUsuario() {
        return creacionUsuario;
    }

    public void setCreacionUsuario(String creacionUsuario) {
        this.creacionUsuario = creacionUsuario;
    }


    public Timestamp getCreacionFecha() {
        return creacionFecha;
    }

    public void setCreacionFecha(Timestamp creacionFecha) {
        this.creacionFecha = creacionFecha;
    }


    public String getModificaUsuario() {
        return modificaUsuario;
    }

    public void setModificaUsuario(String modificaUsuario) {
        this.modificaUsuario = modificaUsuario;
    }


    public Timestamp getModificaFecha() {
        return modificaFecha;
    }

    public void setModificaFecha(Timestamp modificaFecha) {
        this.modificaFecha = modificaFecha;
    }


    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UsuarioUbicacionGeografica that = (UsuarioUbicacionGeografica) o;

        if (idUsuarioUbicacionGeografica != that.idUsuarioUbicacionGeografica) return false;
        if (idUbicacion != that.idUbicacion) return false;
        //if (idUsuario != null ? !idUsuario.equals(that.idUsuario) : that.idUsuario != null) return false;
        if (usuario != null ? !usuario.equals(that.usuario) : that.usuario != null) return false;
        if (estado != null ? !estado.equals(that.estado) : that.estado != null) return false;
        if (idDiaMes != null ? !idDiaMes.equals(that.idDiaMes) : that.idDiaMes != null) return false;
        if (creacionUsuario != null ? !creacionUsuario.equals(that.creacionUsuario) : that.creacionUsuario != null)
            return false;
        if (creacionFecha != null ? !creacionFecha.equals(that.creacionFecha) : that.creacionFecha != null)
            return false;
        if (modificaUsuario != null ? !modificaUsuario.equals(that.modificaUsuario) : that.modificaUsuario != null)
            return false;
        if (modificaFecha != null ? !modificaFecha.equals(that.modificaFecha) : that.modificaFecha != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idUsuarioUbicacionGeografica;
        //result = 31 * result + (idUsuario != null ? idUsuario.hashCode() : 0);
        result = 31 * result + (usuario != null ? usuario.hashCode() : 0);
        result = 31 * result + idUbicacion;
        result = 31 * result + (estado != null ? estado.hashCode() : 0);
        result = 31 * result + (idDiaMes != null ? idDiaMes.hashCode() : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }


    public Usuario getUsuarioByIdUsuario() {
        return usuarioByIdUsuario;
    }

    public void setUsuarioByIdUsuario(Usuario usuarioByIdUsuario) {
        this.usuarioByIdUsuario = usuarioByIdUsuario;
    }
}
