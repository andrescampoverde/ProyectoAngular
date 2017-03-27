package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by mauchilan on 20/3/17.
 */

public class Proceso implements Serializable {
    private int idProceso;
    private String nombre;
    private String modulo;
    private String tipo;
    private Integer opcion;
    private String proceso;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Collection<Permiso> permisosByIdProceso;


    public int getIdProceso() {
        return idProceso;
    }

    public void setIdProceso(int idProceso) {
        this.idProceso = idProceso;
    }


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public String getModulo() {
        return modulo;
    }

    public void setModulo(String modulo) {
        this.modulo = modulo;
    }


    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }


    public Integer getOpcion() {
        return opcion;
    }

    public void setOpcion(Integer opcion) {
        this.opcion = opcion;
    }


    public String getProceso() {
        return proceso;
    }

    public void setProceso(String proceso) {
        this.proceso = proceso;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Proceso proceso1 = (Proceso) o;

        if (idProceso != proceso1.idProceso) return false;
        if (nombre != null ? !nombre.equals(proceso1.nombre) : proceso1.nombre != null) return false;
        if (modulo != null ? !modulo.equals(proceso1.modulo) : proceso1.modulo != null) return false;
        if (tipo != null ? !tipo.equals(proceso1.tipo) : proceso1.tipo != null) return false;
        if (opcion != null ? !opcion.equals(proceso1.opcion) : proceso1.opcion != null) return false;
        if (proceso != null ? !proceso.equals(proceso1.proceso) : proceso1.proceso != null) return false;
        if (creacionUsuario != null ? !creacionUsuario.equals(proceso1.creacionUsuario) : proceso1.creacionUsuario != null)
            return false;
        if (creacionFecha != null ? !creacionFecha.equals(proceso1.creacionFecha) : proceso1.creacionFecha != null)
            return false;
        if (modificaUsuario != null ? !modificaUsuario.equals(proceso1.modificaUsuario) : proceso1.modificaUsuario != null)
            return false;
        if (modificaFecha != null ? !modificaFecha.equals(proceso1.modificaFecha) : proceso1.modificaFecha != null)
            return false;

        return true;
    }


    public int hashCode() {
        int result = idProceso;
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        result = 31 * result + (modulo != null ? modulo.hashCode() : 0);
        result = 31 * result + (tipo != null ? tipo.hashCode() : 0);
        result = 31 * result + (opcion != null ? opcion.hashCode() : 0);
        result = 31 * result + (proceso != null ? proceso.hashCode() : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }


    public Collection<Permiso> getPermisosByIdProceso() {
        return permisosByIdProceso;
    }

    public void setPermisosByIdProceso(Collection<Permiso> permisosByIdProceso) {
        this.permisosByIdProceso = permisosByIdProceso;
    }
}
