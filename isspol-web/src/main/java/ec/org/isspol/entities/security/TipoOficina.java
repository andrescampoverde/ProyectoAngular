package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.util.Collection;

/**
 * Created by mauchilan on 20/3/17.
 */

public class TipoOficina implements Serializable {
    private int idTipoOficina;
    private String tipoOficina;
    private String nombre;
    private Collection<Oficina> oficinasByIdTipoOficina;


    public int getIdTipoOficina() {
        return idTipoOficina;
    }

    public void setIdTipoOficina(int idTipoOficina) {
        this.idTipoOficina = idTipoOficina;
    }


    public String getTipoOficina() {
        return tipoOficina;
    }

    public void setTipoOficina(String tipoOficina) {
        this.tipoOficina = tipoOficina;
    }


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }


    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TipoOficina that = (TipoOficina) o;

        if (idTipoOficina != that.idTipoOficina) return false;
        if (tipoOficina != null ? !tipoOficina.equals(that.tipoOficina) : that.tipoOficina != null) return false;
        if (nombre != null ? !nombre.equals(that.nombre) : that.nombre != null) return false;

        return true;
    }


    public int hashCode() {
        int result = idTipoOficina;
        result = 31 * result + (tipoOficina != null ? tipoOficina.hashCode() : 0);
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        return result;
    }


    public Collection<Oficina> getOficinasByIdTipoOficina() {
        return oficinasByIdTipoOficina;
    }

    public void setOficinasByIdTipoOficina(Collection<Oficina> oficinasByIdTipoOficina) {
        this.oficinasByIdTipoOficina = oficinasByIdTipoOficina;
    }
}
