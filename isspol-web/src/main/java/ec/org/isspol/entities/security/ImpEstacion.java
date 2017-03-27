package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;


public class ImpEstacion implements Serializable {
    private int idImpEstacion;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Estacion estacionByIdEstacion;
    private Impresora impresoraByIdImpresora;

    public int getIdImpEstacion() {
        return idImpEstacion;
    }

    public void setIdImpEstacion(int idImpEstacion) {
        this.idImpEstacion = idImpEstacion;
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


    public Estacion getEstacionByIdEstacion() {
        return estacionByIdEstacion;
    }

    public void setEstacionByIdEstacion(Estacion estacionByIdEstacion) {
        this.estacionByIdEstacion = estacionByIdEstacion;
    }

    public Impresora getImpresoraByIdImpresora() {
        return impresoraByIdImpresora;
    }

    public void setImpresoraByIdImpresora(Impresora impresoraByIdImpresora) {
        this.impresoraByIdImpresora = impresoraByIdImpresora;
    }
}
