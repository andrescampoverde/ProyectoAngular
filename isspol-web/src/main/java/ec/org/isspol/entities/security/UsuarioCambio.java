package ec.org.isspol.entities.security;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by mauchilan on 20/3/17.
 */

public class UsuarioCambio implements Serializable {
    private int idUsuarioCambio;
    //private Integer idUsuario;
    private String usuario;
    private String tipo;
    private String anterior;
    private String nuevo;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private Usuario usuarioByIdUsuario;


    public int getIdUsuarioCambio() {
        return idUsuarioCambio;
    }

    public void setIdUsuarioCambio(int idUsuarioCambio) {
        this.idUsuarioCambio = idUsuarioCambio;
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


    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }


    public String getAnterior() {
        return anterior;
    }

    public void setAnterior(String anterior) {
        this.anterior = anterior;
    }


    public String getNuevo() {
        return nuevo;
    }

    public void setNuevo(String nuevo) {
        this.nuevo = nuevo;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UsuarioCambio that = (UsuarioCambio) o;

        if (idUsuarioCambio != that.idUsuarioCambio) return false;
        //if (idUsuario != null ? !idUsuario.equals(that.idUsuario) : that.idUsuario != null) return false;
        if (usuario != null ? !usuario.equals(that.usuario) : that.usuario != null) return false;
        if (tipo != null ? !tipo.equals(that.tipo) : that.tipo != null) return false;
        if (anterior != null ? !anterior.equals(that.anterior) : that.anterior != null) return false;
        if (nuevo != null ? !nuevo.equals(that.nuevo) : that.nuevo != null) return false;
        if (creacionUsuario != null ? !creacionUsuario.equals(that.creacionUsuario) : that.creacionUsuario != null)
            return false;
        if (creacionFecha != null ? !creacionFecha.equals(that.creacionFecha) : that.creacionFecha != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idUsuarioCambio;
        //result = 31 * result + (idUsuario != null ? idUsuario.hashCode() : 0);
        result = 31 * result + (usuario != null ? usuario.hashCode() : 0);
        result = 31 * result + (tipo != null ? tipo.hashCode() : 0);
        result = 31 * result + (anterior != null ? anterior.hashCode() : 0);
        result = 31 * result + (nuevo != null ? nuevo.hashCode() : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        return result;
    }


    public Usuario getUsuarioByIdUsuario() {
        return usuarioByIdUsuario;
    }

    public void setUsuarioByIdUsuario(Usuario usuarioByIdUsuario) {
        this.usuarioByIdUsuario = usuarioByIdUsuario;
    }
}
