package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by mauchilan on 20/3/17.
 */

public class Token implements Serializable {
    private int idToken;
    private String estado;
    private String dato;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;


    public int getIdToken() {
        return idToken;
    }

    public void setIdToken(int idToken) {
        this.idToken = idToken;
    }


    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }


    public String getDato() {
        return dato;
    }

    public void setDato(String dato) {
        this.dato = dato;
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
