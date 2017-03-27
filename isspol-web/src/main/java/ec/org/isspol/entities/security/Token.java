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
public class Token implements Serializable {
    private int idToken;
    private String estado;
    private String dato;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;

    @Id
    @Column(name = "IdToken", nullable = false)
    public int getIdToken() {
        return idToken;
    }

    public void setIdToken(int idToken) {
        this.idToken = idToken;
    }

    @Basic
    @Column(name = "Estado", nullable = false, length = -1)
    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Basic
    @Column(name = "Dato", nullable = true, length = 4000)
    public String getDato() {
        return dato;
    }

    public void setDato(String dato) {
        this.dato = dato;
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

        Token token = (Token) o;

        if (idToken != token.idToken) return false;
        if (estado != null ? !estado.equals(token.estado) : token.estado != null) return false;
        if (dato != null ? !dato.equals(token.dato) : token.dato != null) return false;
        if (creacionUsuario != null ? !creacionUsuario.equals(token.creacionUsuario) : token.creacionUsuario != null)
            return false;
        if (creacionFecha != null ? !creacionFecha.equals(token.creacionFecha) : token.creacionFecha != null)
            return false;
        if (modificaUsuario != null ? !modificaUsuario.equals(token.modificaUsuario) : token.modificaUsuario != null)
            return false;
        if (modificaFecha != null ? !modificaFecha.equals(token.modificaFecha) : token.modificaFecha != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idToken;
        result = 31 * result + (estado != null ? estado.hashCode() : 0);
        result = 31 * result + (dato != null ? dato.hashCode() : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }
}
