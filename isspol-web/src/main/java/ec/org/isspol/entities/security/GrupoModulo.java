package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by mauchilan on 20/3/17.
 */
public class GrupoModulo implements Serializable {
    private int idGrupoModulo;
    //private int idModulo;
    private String modulo;
    private String grupoMod;
    private String nombre;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Modulo moduloByIdModulo;

    public int getIdGrupoModulo() {
        return idGrupoModulo;
    }

    public void setIdGrupoModulo(int idGrupoModulo) {
        this.idGrupoModulo = idGrupoModulo;
    }


    public String getModulo() {
        return modulo;
    }

    public void setModulo(String modulo) {
        this.modulo = modulo;
    }

    public String getGrupoMod() {
        return grupoMod;
    }

    public void setGrupoMod(String grupoMod) {
        this.grupoMod = grupoMod;
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

    public Modulo getModuloByIdModulo() {
        return moduloByIdModulo;
    }

    public void setModuloByIdModulo(Modulo moduloByIdModulo) {
        this.moduloByIdModulo = moduloByIdModulo;
    }
}
