package ec.org.isspol.entities.security;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by mauchilan on 20/3/17.
 */
@Entity
public class MotivoCierreSesion implements Serializable {
    private int idMotivo;
    private String motivo;
    private boolean vigente;
    private boolean esLunch;
    private boolean esSalidaDefinitiva;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;

    @Id
    @Column(name = "IdMotivo", nullable = false)
    public int getIdMotivo() {
        return idMotivo;
    }

    public void setIdMotivo(int idMotivo) {
        this.idMotivo = idMotivo;
    }

    @Basic
    @Column(name = "Motivo", nullable = false, length = 100)
    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    @Basic
    @Column(name = "Vigente", nullable = false)
    public boolean isVigente() {
        return vigente;
    }

    public void setVigente(boolean vigente) {
        this.vigente = vigente;
    }

    @Basic
    @Column(name = "EsLunch", nullable = false)
    public boolean isEsLunch() {
        return esLunch;
    }

    public void setEsLunch(boolean esLunch) {
        this.esLunch = esLunch;
    }

    @Basic
    @Column(name = "EsSalidaDefinitiva", nullable = false)
    public boolean isEsSalidaDefinitiva() {
        return esSalidaDefinitiva;
    }

    public void setEsSalidaDefinitiva(boolean esSalidaDefinitiva) {
        this.esSalidaDefinitiva = esSalidaDefinitiva;
    }

    @Basic
    @Column(name = "CreacionUsuario", nullable = true, length = 15)
    public String getCreacionUsuario() {
        return creacionUsuario;
    }

    public void setCreacionUsuario(String creacionUsuario) {
        this.creacionUsuario = creacionUsuario;
    }

    @Basic
    @Column(name = "CreacionFecha", nullable = true)
    public Timestamp getCreacionFecha() {
        return creacionFecha;
    }

    public void setCreacionFecha(Timestamp creacionFecha) {
        this.creacionFecha = creacionFecha;
    }

    @Basic
    @Column(name = "ModificaUsuario", nullable = true, length = 15)
    public String getModificaUsuario() {
        return modificaUsuario;
    }

    public void setModificaUsuario(String modificaUsuario) {
        this.modificaUsuario = modificaUsuario;
    }

    @Basic
    @Column(name = "ModificaFecha", nullable = true)
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

        MotivoCierreSesion that = (MotivoCierreSesion) o;

        if (idMotivo != that.idMotivo) return false;
        if (vigente != that.vigente) return false;
        if (esLunch != that.esLunch) return false;
        if (esSalidaDefinitiva != that.esSalidaDefinitiva) return false;
        if (motivo != null ? !motivo.equals(that.motivo) : that.motivo != null) return false;
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
        int result = idMotivo;
        result = 31 * result + (motivo != null ? motivo.hashCode() : 0);
        result = 31 * result + (vigente ? 1 : 0);
        result = 31 * result + (esLunch ? 1 : 0);
        result = 31 * result + (esSalidaDefinitiva ? 1 : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }
}
