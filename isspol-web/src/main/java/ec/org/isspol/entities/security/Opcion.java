package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by mauchilan on 20/3/17.
 */

public class Opcion implements Serializable {
    private int idOpcion;
    private int opcion;
    private String modulo;
    private String grupoMod;
    private String nombre;
    private String objeto;
    private int orden;
    private String descripcion;
    private String parametro;
    private String tipoAbrir;
    //private int idCarpetaOpcion;
    //private int idIcono;
    private boolean visible;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Collection<Favorito> favoritosByIdOpcion;
    private CarpetaOpcion carpetaOpcionByIdCarpetaOpcion;
    private Icono iconoByIdIcono;
    private Collection<OpcionUso> opcionUsosByIdOpcion;
    private Collection<Permiso> permisosByIdOpcion;


    public int getIdOpcion() {
        return idOpcion;
    }

    public void setIdOpcion(int idOpcion) {
        this.idOpcion = idOpcion;
    }


    public int getOpcion() {
        return opcion;
    }

    public void setOpcion(int opcion) {
        this.opcion = opcion;
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


    public String getObjeto() {
        return objeto;
    }

    public void setObjeto(String objeto) {
        this.objeto = objeto;
    }


    public int getOrden() {
        return orden;
    }

    public void setOrden(int orden) {
        this.orden = orden;
    }


    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


    public String getParametro() {
        return parametro;
    }

    public void setParametro(String parametro) {
        this.parametro = parametro;
    }


    public String getTipoAbrir() {
        return tipoAbrir;
    }

    public void setTipoAbrir(String tipoAbrir) {
        this.tipoAbrir = tipoAbrir;
    }

    /*@Basic
    @Column(name = "IdCarpetaOpcion", nullable = false)
    public int getIdCarpetaOpcion() {
        return idCarpetaOpcion;
    }

    public void setIdCarpetaOpcion(int idCarpetaOpcion) {
        this.idCarpetaOpcion = idCarpetaOpcion;
    }*/

    /*@Basic
    @Column(name = "IdIcono", nullable = false)
    public int getIdIcono() {
        return idIcono;
    }

    public void setIdIcono(int idIcono) {
        this.idIcono = idIcono;
    }*/


    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
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


    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Opcion opcion1 = (Opcion) o;

        if (idOpcion != opcion1.idOpcion) return false;
        if (opcion != opcion1.opcion) return false;
        if (orden != opcion1.orden) return false;
        //if (idCarpetaOpcion != opcion1.idCarpetaOpcion) return false;
        //if (idIcono != opcion1.idIcono) return false;
        if (visible != opcion1.visible) return false;
        if (modulo != null ? !modulo.equals(opcion1.modulo) : opcion1.modulo != null) return false;
        if (grupoMod != null ? !grupoMod.equals(opcion1.grupoMod) : opcion1.grupoMod != null) return false;
        if (nombre != null ? !nombre.equals(opcion1.nombre) : opcion1.nombre != null) return false;
        if (objeto != null ? !objeto.equals(opcion1.objeto) : opcion1.objeto != null) return false;
        if (descripcion != null ? !descripcion.equals(opcion1.descripcion) : opcion1.descripcion != null) return false;
        if (parametro != null ? !parametro.equals(opcion1.parametro) : opcion1.parametro != null) return false;
        if (tipoAbrir != null ? !tipoAbrir.equals(opcion1.tipoAbrir) : opcion1.tipoAbrir != null) return false;
        if (creacionUsuario != null ? !creacionUsuario.equals(opcion1.creacionUsuario) : opcion1.creacionUsuario != null)
            return false;
        if (creacionFecha != null ? !creacionFecha.equals(opcion1.creacionFecha) : opcion1.creacionFecha != null)
            return false;
        if (modificaUsuario != null ? !modificaUsuario.equals(opcion1.modificaUsuario) : opcion1.modificaUsuario != null)
            return false;
        if (modificaFecha != null ? !modificaFecha.equals(opcion1.modificaFecha) : opcion1.modificaFecha != null)
            return false;

        return true;
    }


    public int hashCode() {
        int result = idOpcion;
        result = 31 * result + opcion;
        result = 31 * result + (modulo != null ? modulo.hashCode() : 0);
        result = 31 * result + (grupoMod != null ? grupoMod.hashCode() : 0);
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        result = 31 * result + (objeto != null ? objeto.hashCode() : 0);
        result = 31 * result + orden;
        result = 31 * result + (descripcion != null ? descripcion.hashCode() : 0);
        result = 31 * result + (parametro != null ? parametro.hashCode() : 0);
        result = 31 * result + (tipoAbrir != null ? tipoAbrir.hashCode() : 0);
        //result = 31 * result + idCarpetaOpcion;
        //result = 31 * result + idIcono;
        result = 31 * result + (visible ? 1 : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }


    public Collection<Favorito> getFavoritosByIdOpcion() {
        return favoritosByIdOpcion;
    }

    public void setFavoritosByIdOpcion(Collection<Favorito> favoritosByIdOpcion) {
        this.favoritosByIdOpcion = favoritosByIdOpcion;
    }


    public CarpetaOpcion getCarpetaOpcionByIdCarpetaOpcion() {
        return carpetaOpcionByIdCarpetaOpcion;
    }

    public void setCarpetaOpcionByIdCarpetaOpcion(CarpetaOpcion carpetaOpcionByIdCarpetaOpcion) {
        this.carpetaOpcionByIdCarpetaOpcion = carpetaOpcionByIdCarpetaOpcion;
    }


    public Icono getIconoByIdIcono() {
        return iconoByIdIcono;
    }

    public void setIconoByIdIcono(Icono iconoByIdIcono) {
        this.iconoByIdIcono = iconoByIdIcono;
    }


    public Collection<OpcionUso> getOpcionUsosByIdOpcion() {
        return opcionUsosByIdOpcion;
    }

    public void setOpcionUsosByIdOpcion(Collection<OpcionUso> opcionUsosByIdOpcion) {
        this.opcionUsosByIdOpcion = opcionUsosByIdOpcion;
    }


    public Collection<Permiso> getPermisosByIdOpcion() {
        return permisosByIdOpcion;
    }

    public void setPermisosByIdOpcion(Collection<Permiso> permisosByIdOpcion) {
        this.permisosByIdOpcion = permisosByIdOpcion;
    }
}
