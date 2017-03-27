package ec.org.isspol.entities.security;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by mauchilan on 20/3/17.
 */
public class Modulo implements Serializable {
    private int idModulo;
    private String modulo;
    private String nombre;
    private int orden;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Collection<GrupoModulo> grupoModulosByIdModulo;

    public int getIdModulo() {
        return idModulo;
    }

    public void setIdModulo(int idModulo) {
        this.idModulo = idModulo;
    }

    public String getModulo() {
        return modulo;
    }

    public void setModulo(String modulo) {
        this.modulo = modulo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getOrden() {
        return orden;
    }

    public void setOrden(int orden) {
        this.orden = orden;
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

        Modulo modulo1 = (Modulo) o;

        if (idModulo != modulo1.idModulo) return false;
        if (orden != modulo1.orden) return false;
        if (modulo != null ? !modulo.equals(modulo1.modulo) : modulo1.modulo != null) return false;
        if (nombre != null ? !nombre.equals(modulo1.nombre) : modulo1.nombre != null) return false;
        if (creacionUsuario != null ? !creacionUsuario.equals(modulo1.creacionUsuario) : modulo1.creacionUsuario != null)
            return false;
        if (creacionFecha != null ? !creacionFecha.equals(modulo1.creacionFecha) : modulo1.creacionFecha != null)
            return false;
        if (modificaUsuario != null ? !modificaUsuario.equals(modulo1.modificaUsuario) : modulo1.modificaUsuario != null)
            return false;
        if (modificaFecha != null ? !modificaFecha.equals(modulo1.modificaFecha) : modulo1.modificaFecha != null)
            return false;

        return true;
    }

    public int hashCode() {
        int result = idModulo;
        result = 31 * result + (modulo != null ? modulo.hashCode() : 0);
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        result = 31 * result + orden;
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }

    public Collection<GrupoModulo> getGrupoModulosByIdModulo() {
        return grupoModulosByIdModulo;
    }

    public void setGrupoModulosByIdModulo(Collection<GrupoModulo> grupoModulosByIdModulo) {
        this.grupoModulosByIdModulo = grupoModulosByIdModulo;
    }
}
