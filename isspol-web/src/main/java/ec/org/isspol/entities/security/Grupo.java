package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by mauchilan on 20/3/17.
 */
public class Grupo implements Serializable {
    private int idGrupo;
    private String grupo;
    private String nombre;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Collection<GrupoUsuario> grupoUsuariosByGrupo;
    private Collection<Permiso> permisosByGrupo;


    public int getIdGrupo() {
        return idGrupo;
    }

    public void setIdGrupo(int idGrupo) {
        this.idGrupo = idGrupo;
    }


    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }


    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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



    public Collection<GrupoUsuario> getGrupoUsuariosByGrupo() {
        return grupoUsuariosByGrupo;
    }

    public void setGrupoUsuariosByGrupo(Collection<GrupoUsuario> grupoUsuariosByGrupo) {
        this.grupoUsuariosByGrupo = grupoUsuariosByGrupo;
    }

    public Collection<Permiso> getPermisosByGrupo() {
        return permisosByGrupo;
    }

    public void setPermisosByGrupo(Collection<Permiso> permisosByGrupo) {
        this.permisosByGrupo = permisosByGrupo;
    }
}
