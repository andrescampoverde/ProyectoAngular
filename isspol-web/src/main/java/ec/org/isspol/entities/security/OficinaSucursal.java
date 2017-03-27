package ec.org.isspol.entities.security;

import java.io.Serializable;

/**
 * Created by mauchilan on 21/3/17.
 */
public class OficinaSucursal implements Serializable {

    private String oficina;
    private String nombre;
    private String sucursal;
    private String sucursalNombre;

    public OficinaSucursal(String oficina, String nombre, String sucursal, String sucursalNombre){
        this.oficina = oficina.trim();
        this.nombre = nombre;
        this.sucursal = sucursal;
        this.sucursalNombre = sucursalNombre;
    }

    public String getOficina() {
        return oficina;
    }

    public void setOficina(String oficina) {
        this.oficina = oficina;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getSucursal() {
        return sucursal;
    }

    public void setSucursal(String sucursal) {
        this.sucursal = sucursal;
    }


    public String getSucursalNombre() {
        return sucursalNombre;
    }

    public void setSucursalNombre(String sucursalNombre) {
        this.sucursalNombre = sucursalNombre;
    }
}
