package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by mauchilan on 20/3/17.
 */

public class Horario implements Serializable {
    private int idHorario;
    private String descripcion;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Collection<HorarioDetalle> horarioDetallesByIdHorario;
    private Collection<Usuario> usuariosByIdHorario;

    public int getIdHorario() {
        return idHorario;
    }

    public void setIdHorario(int idHorario) {
        this.idHorario = idHorario;
    }


    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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

        Horario horario = (Horario) o;

        if (idHorario != horario.idHorario) return false;
        if (descripcion != null ? !descripcion.equals(horario.descripcion) : horario.descripcion != null) return false;
        if (creacionUsuario != null ? !creacionUsuario.equals(horario.creacionUsuario) : horario.creacionUsuario != null)
            return false;
        if (creacionFecha != null ? !creacionFecha.equals(horario.creacionFecha) : horario.creacionFecha != null)
            return false;
        if (modificaUsuario != null ? !modificaUsuario.equals(horario.modificaUsuario) : horario.modificaUsuario != null)
            return false;
        if (modificaFecha != null ? !modificaFecha.equals(horario.modificaFecha) : horario.modificaFecha != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idHorario;
        result = 31 * result + (descripcion != null ? descripcion.hashCode() : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }

    public Collection<HorarioDetalle> getHorarioDetallesByIdHorario() {
        return horarioDetallesByIdHorario;
    }

    public void setHorarioDetallesByIdHorario(Collection<HorarioDetalle> horarioDetallesByIdHorario) {
        this.horarioDetallesByIdHorario = horarioDetallesByIdHorario;
    }

    public Collection<Usuario> getUsuariosByIdHorario() {
        return usuariosByIdHorario;
    }

    public void setUsuariosByIdHorario(Collection<Usuario> usuariosByIdHorario) {
        this.usuariosByIdHorario = usuariosByIdHorario;
    }
}
