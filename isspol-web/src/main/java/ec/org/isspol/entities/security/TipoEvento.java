package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by mauchilan on 20/3/17.
 */

public class TipoEvento implements Serializable {
    private int idTipoEvento;
    private String descripcion;
    private String codigo;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;


    public int getIdTipoEvento() {
        return idTipoEvento;
    }

    public void setIdTipoEvento(int idTipoEvento) {
        this.idTipoEvento = idTipoEvento;
    }


    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
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

        TipoEvento that = (TipoEvento) o;

        if (idTipoEvento != that.idTipoEvento) return false;
        if (descripcion != null ? !descripcion.equals(that.descripcion) : that.descripcion != null) return false;
        if (codigo != null ? !codigo.equals(that.codigo) : that.codigo != null) return false;
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


    public int hashCode() {
        int result = idTipoEvento;
        result = 31 * result + (descripcion != null ? descripcion.hashCode() : 0);
        result = 31 * result + (codigo != null ? codigo.hashCode() : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }
}
