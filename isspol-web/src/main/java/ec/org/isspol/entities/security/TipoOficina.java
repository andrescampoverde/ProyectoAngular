package ec.org.isspol.entities.security;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

/**
 * Created by mauchilan on 20/3/17.
 */
@Entity
@Table(name = "Seguridad.TipoOficina")
public class TipoOficina implements Serializable {
    private int idTipoOficina;
    private String tipoOficina;
    private String nombre;
    private Collection<Oficina> oficinasByIdTipoOficina;

    @Id
    @Column(name = "IdTipoOficina", nullable = false)
    public int getIdTipoOficina() {
        return idTipoOficina;
    }

    public void setIdTipoOficina(int idTipoOficina) {
        this.idTipoOficina = idTipoOficina;
    }

    @Basic
    @Column(name = "TipoOficina", nullable = false, length = 2)
    public String getTipoOficina() {
        return tipoOficina;
    }

    public void setTipoOficina(String tipoOficina) {
        this.tipoOficina = tipoOficina;
    }

    @Basic
    @Column(name = "Nombre", nullable = true, length = 50)
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        TipoOficina that = (TipoOficina) o;

        if (idTipoOficina != that.idTipoOficina) return false;
        if (tipoOficina != null ? !tipoOficina.equals(that.tipoOficina) : that.tipoOficina != null) return false;
        if (nombre != null ? !nombre.equals(that.nombre) : that.nombre != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idTipoOficina;
        result = 31 * result + (tipoOficina != null ? tipoOficina.hashCode() : 0);
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "tipoOficinaByIdTipoOficina")
    public Collection<Oficina> getOficinasByIdTipoOficina() {
        return oficinasByIdTipoOficina;
    }

    public void setOficinasByIdTipoOficina(Collection<Oficina> oficinasByIdTipoOficina) {
        this.oficinasByIdTipoOficina = oficinasByIdTipoOficina;
    }
}
