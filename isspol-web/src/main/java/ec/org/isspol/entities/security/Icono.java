package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by mauchilan on 20/3/17.
 */

public class Icono implements Serializable {
    private int idIcono;
    private String icono;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Collection<CarpetaOpcion> carpetaOpcionsByIdIcono;
    private Collection<Opcion> opcionsByIdIcono;

    public int getIdIcono() {
        return idIcono;
    }

    public void setIdIcono(int idIcono) {
        this.idIcono = idIcono;
    }

    public String getIcono() {
        return icono;
    }

    public void setIcono(String icono) {
        this.icono = icono;
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

    public Collection<CarpetaOpcion> getCarpetaOpcionsByIdIcono() {
        return carpetaOpcionsByIdIcono;
    }

    public void setCarpetaOpcionsByIdIcono(Collection<CarpetaOpcion> carpetaOpcionsByIdIcono) {
        this.carpetaOpcionsByIdIcono = carpetaOpcionsByIdIcono;
    }

    public Collection<Opcion> getOpcionsByIdIcono() {
        return opcionsByIdIcono;
    }

    public void setOpcionsByIdIcono(Collection<Opcion> opcionsByIdIcono) {
        this.opcionsByIdIcono = opcionsByIdIcono;
    }
}
