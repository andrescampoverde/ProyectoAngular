package ec.org.isspol.entities.security;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by mauchilan on 20/3/17.
 */

public class CarpetaOpcion implements Serializable{
    private int idCarpetaOpcion;
    private String nombre;
    private String descripcion;
    private int orden;
    private String codigo;
    private Integer nivel;
    private String objeto;
    private String parametro;
    private String tipoAbrir;
    private boolean visible;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private CarpetaOpcion carpetaOpcionByIdCarpeta;

    private Collection<CarpetaOpcion> carpetaOpcionsByIdCarpetaOpcion;
    private Icono iconoByIcono;
    private Collection<Opcion> opcionsByIdCarpetaOpcion;

    public int getIdCarpetaOpcion() {
        return idCarpetaOpcion;
    }

    public void setIdCarpetaOpcion(int idCarpetaOpcion) {
        this.idCarpetaOpcion = idCarpetaOpcion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getOrden() {
        return orden;
    }

    public void setOrden(int orden) {
        this.orden = orden;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Integer getNivel() {
        return nivel;
    }

    public void setNivel(Integer nivel) {
        this.nivel = nivel;
    }

    public String getObjeto() {
        return objeto;
    }

    public void setObjeto(String objeto) {
        this.objeto = objeto;
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



    @Override
    public int hashCode() {
        int result = idCarpetaOpcion;
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        result = 31 * result + (descripcion != null ? descripcion.hashCode() : 0);
        result = 31 * result + orden;
        result = 31 * result + (codigo != null ? codigo.hashCode() : 0);
        result = 31 * result + (nivel != null ? nivel.hashCode() : 0);
        result = 31 * result + (objeto != null ? objeto.hashCode() : 0);
        result = 31 * result + (parametro != null ? parametro.hashCode() : 0);
        result = 31 * result + (tipoAbrir != null ? tipoAbrir.hashCode() : 0);
        result = 31 * result + (visible ? 1 : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }

    public CarpetaOpcion getCarpetaOpcionByIdCarpeta() {
        return carpetaOpcionByIdCarpeta;
    }

    public void setCarpetaOpcionByIdCarpeta(CarpetaOpcion carpetaOpcionByIdCarpeta) {
        this.carpetaOpcionByIdCarpeta = carpetaOpcionByIdCarpeta;
    }


    public Collection<CarpetaOpcion> getCarpetaOpcionsByIdCarpetaOpcion() {
        return carpetaOpcionsByIdCarpetaOpcion;
    }

    public void setCarpetaOpcionsByIdCarpetaOpcion(Collection<CarpetaOpcion> carpetaOpcionsByIdCarpetaOpcion) {
        this.carpetaOpcionsByIdCarpetaOpcion = carpetaOpcionsByIdCarpetaOpcion;
    }

    public Icono getIconoByIcono() {
        return iconoByIcono;
    }

    public void setIconoByIcono(Icono iconoByIcono) {
        this.iconoByIcono = iconoByIcono;
    }

    public Collection<Opcion> getOpcionsByIdCarpetaOpcion() {
        return opcionsByIdCarpetaOpcion;
    }

    public void setOpcionsByIdCarpetaOpcion(Collection<Opcion> opcionsByIdCarpetaOpcion) {
        this.opcionsByIdCarpetaOpcion = opcionsByIdCarpetaOpcion;
    }
}
