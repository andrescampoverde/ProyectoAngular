package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by mauchilan on 20/3/17.
 */

public class Estacion implements Serializable {
    private int idEstacion;
    private String hostname;
    private String ip;
    private String descripcion;
    private String ubicacion;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Collection<EstacionUsuario> estacionUsuariosByIdEstacion;
    private Collection<ImpEstacion> impEstacionsByIdEstacion;

    public int getIdEstacion() {
        return idEstacion;
    }

    public void setIdEstacion(int idEstacion) {
        this.idEstacion = idEstacion;
    }


    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }


    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }


    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
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
    public int hashCode() {
        int result = idEstacion;
        result = 31 * result + (hostname != null ? hostname.hashCode() : 0);
        result = 31 * result + (ip != null ? ip.hashCode() : 0);
        result = 31 * result + (descripcion != null ? descripcion.hashCode() : 0);
        result = 31 * result + (ubicacion != null ? ubicacion.hashCode() : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }


    public Collection<EstacionUsuario> getEstacionUsuariosByIdEstacion() {
        return estacionUsuariosByIdEstacion;
    }

    public void setEstacionUsuariosByIdEstacion(Collection<EstacionUsuario> estacionUsuariosByIdEstacion) {
        this.estacionUsuariosByIdEstacion = estacionUsuariosByIdEstacion;
    }


    public Collection<ImpEstacion> getImpEstacionsByIdEstacion() {
        return impEstacionsByIdEstacion;
    }

    public void setImpEstacionsByIdEstacion(Collection<ImpEstacion> impEstacionsByIdEstacion) {
        this.impEstacionsByIdEstacion = impEstacionsByIdEstacion;
    }
}
