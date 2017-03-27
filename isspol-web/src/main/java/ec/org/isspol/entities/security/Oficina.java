package ec.org.isspol.entities.security;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by mauchilan on 20/3/17.
 */

public class Oficina implements Serializable {
    private int idOficina;
    private String oficina;
    //private Integer idSucursal;
    private String sucursal;
    //private Integer idTipoOficina;
    private String tipoOficina;
    private String nombre;
    private String codigo;
    private String direccion;
    private String telefono;
    private String ciudad;
    private String estado;
    private String codigoCamara;
    private String codigo2;
    private String supervisor;
    private String telCodigoArea;
    private String telCodigoRegion;
    private String otroTelefono;
    private Integer provincia;
    private boolean esAdministracionCartera;
    private String codigo3;
    private int empresa;
    private Double lat;
    private Double lon;
    private String codigoRepOrg;
    private String codigoSep;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Sucursal sucursalByIdSucursal;
    private TipoOficina tipoOficinaByIdTipoOficina;
    private Collection<Usuario> usuariosByIdOficina;
    private Collection<UsuarioOficina> usuarioOficinasByIdOficina;


    public int getIdOficina() {
        return idOficina;
    }

    public void setIdOficina(int idOficina) {
        this.idOficina = idOficina;
    }


    public String getOficina() {
        return oficina;
    }

    public void setOficina(String oficina) {
        this.oficina = oficina;
    }

    /*@Basic
    @Column(name = "IdSucursal", nullable = true)
    public Integer getIdSucursal() {
        return idSucursal;
    }

    public void setIdSucursal(Integer idSucursal) {
        this.idSucursal = idSucursal;
    }*/


    public String getSucursal() {
        return sucursal;
    }

    public void setSucursal(String sucursal) {
        this.sucursal = sucursal;
    }

    /*@Basic
    @Column(name = "IdTipoOficina", nullable = true)
    public Integer getIdTipoOficina() {
        return idTipoOficina;
    }

    public void setIdTipoOficina(Integer idTipoOficina) {
        this.idTipoOficina = idTipoOficina;
    }*/


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


    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }


    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }


    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }


    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }


    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }


    public String getCodigoCamara() {
        return codigoCamara;
    }

    public void setCodigoCamara(String codigoCamara) {
        this.codigoCamara = codigoCamara;
    }


    public String getCodigo2() {
        return codigo2;
    }

    public void setCodigo2(String codigo2) {
        this.codigo2 = codigo2;
    }


    public String getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(String supervisor) {
        this.supervisor = supervisor;
    }


    public String getTelCodigoArea() {
        return telCodigoArea;
    }

    public void setTelCodigoArea(String telCodigoArea) {
        this.telCodigoArea = telCodigoArea;
    }


    public String getTelCodigoRegion() {
        return telCodigoRegion;
    }

    public void setTelCodigoRegion(String telCodigoRegion) {
        this.telCodigoRegion = telCodigoRegion;
    }


    public String getOtroTelefono() {
        return otroTelefono;
    }

    public void setOtroTelefono(String otroTelefono) {
        this.otroTelefono = otroTelefono;
    }


    public Integer getProvincia() {
        return provincia;
    }

    public void setProvincia(Integer provincia) {
        this.provincia = provincia;
    }


    public boolean isEsAdministracionCartera() {
        return esAdministracionCartera;
    }

    public void setEsAdministracionCartera(boolean esAdministracionCartera) {
        this.esAdministracionCartera = esAdministracionCartera;
    }


    public String getCodigo3() {
        return codigo3;
    }

    public void setCodigo3(String codigo3) {
        this.codigo3 = codigo3;
    }


    public int getEmpresa() {
        return empresa;
    }

    public void setEmpresa(int empresa) {
        this.empresa = empresa;
    }


    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }


    public Double getLon() {
        return lon;
    }

    public void setLon(Double lon) {
        this.lon = lon;
    }


    public String getCodigoRepOrg() {
        return codigoRepOrg;
    }

    public void setCodigoRepOrg(String codigoRepOrg) {
        this.codigoRepOrg = codigoRepOrg;
    }


    public String getCodigoSep() {
        return codigoSep;
    }

    public void setCodigoSep(String codigoSep) {
        this.codigoSep = codigoSep;
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

        Oficina oficina1 = (Oficina) o;

        if (idOficina != oficina1.idOficina) return false;
        if (esAdministracionCartera != oficina1.esAdministracionCartera) return false;
        if (empresa != oficina1.empresa) return false;
        if (oficina != null ? !oficina.equals(oficina1.oficina) : oficina1.oficina != null) return false;
        //if (idSucursal != null ? !idSucursal.equals(oficina1.idSucursal) : oficina1.idSucursal != null) return false;
        if (sucursal != null ? !sucursal.equals(oficina1.sucursal) : oficina1.sucursal != null) return false;
        //if (idTipoOficina != null ? !idTipoOficina.equals(oficina1.idTipoOficina) : oficina1.idTipoOficina != null)
            //return false;
        if (tipoOficina != null ? !tipoOficina.equals(oficina1.tipoOficina) : oficina1.tipoOficina != null)
            return false;
        if (nombre != null ? !nombre.equals(oficina1.nombre) : oficina1.nombre != null) return false;
        if (codigo != null ? !codigo.equals(oficina1.codigo) : oficina1.codigo != null) return false;
        if (direccion != null ? !direccion.equals(oficina1.direccion) : oficina1.direccion != null) return false;
        if (telefono != null ? !telefono.equals(oficina1.telefono) : oficina1.telefono != null) return false;
        if (ciudad != null ? !ciudad.equals(oficina1.ciudad) : oficina1.ciudad != null) return false;
        if (estado != null ? !estado.equals(oficina1.estado) : oficina1.estado != null) return false;
        if (codigoCamara != null ? !codigoCamara.equals(oficina1.codigoCamara) : oficina1.codigoCamara != null)
            return false;
        if (codigo2 != null ? !codigo2.equals(oficina1.codigo2) : oficina1.codigo2 != null) return false;
        if (supervisor != null ? !supervisor.equals(oficina1.supervisor) : oficina1.supervisor != null) return false;
        if (telCodigoArea != null ? !telCodigoArea.equals(oficina1.telCodigoArea) : oficina1.telCodigoArea != null)
            return false;
        if (telCodigoRegion != null ? !telCodigoRegion.equals(oficina1.telCodigoRegion) : oficina1.telCodigoRegion != null)
            return false;
        if (otroTelefono != null ? !otroTelefono.equals(oficina1.otroTelefono) : oficina1.otroTelefono != null)
            return false;
        if (provincia != null ? !provincia.equals(oficina1.provincia) : oficina1.provincia != null) return false;
        if (codigo3 != null ? !codigo3.equals(oficina1.codigo3) : oficina1.codigo3 != null) return false;
        if (lat != null ? !lat.equals(oficina1.lat) : oficina1.lat != null) return false;
        if (lon != null ? !lon.equals(oficina1.lon) : oficina1.lon != null) return false;
        if (codigoRepOrg != null ? !codigoRepOrg.equals(oficina1.codigoRepOrg) : oficina1.codigoRepOrg != null)
            return false;
        if (codigoSep != null ? !codigoSep.equals(oficina1.codigoSep) : oficina1.codigoSep != null) return false;
        if (creacionUsuario != null ? !creacionUsuario.equals(oficina1.creacionUsuario) : oficina1.creacionUsuario != null)
            return false;
        if (creacionFecha != null ? !creacionFecha.equals(oficina1.creacionFecha) : oficina1.creacionFecha != null)
            return false;
        if (modificaUsuario != null ? !modificaUsuario.equals(oficina1.modificaUsuario) : oficina1.modificaUsuario != null)
            return false;
        if (modificaFecha != null ? !modificaFecha.equals(oficina1.modificaFecha) : oficina1.modificaFecha != null)
            return false;

        return true;
    }


    public int hashCode() {
        int result = idOficina;
        result = 31 * result + (oficina != null ? oficina.hashCode() : 0);
        //result = 31 * result + (idSucursal != null ? idSucursal.hashCode() : 0);
        result = 31 * result + (sucursal != null ? sucursal.hashCode() : 0);
        //result = 31 * result + (idTipoOficina != null ? idTipoOficina.hashCode() : 0);
        result = 31 * result + (tipoOficina != null ? tipoOficina.hashCode() : 0);
        result = 31 * result + (nombre != null ? nombre.hashCode() : 0);
        result = 31 * result + (codigo != null ? codigo.hashCode() : 0);
        result = 31 * result + (direccion != null ? direccion.hashCode() : 0);
        result = 31 * result + (telefono != null ? telefono.hashCode() : 0);
        result = 31 * result + (ciudad != null ? ciudad.hashCode() : 0);
        result = 31 * result + (estado != null ? estado.hashCode() : 0);
        result = 31 * result + (codigoCamara != null ? codigoCamara.hashCode() : 0);
        result = 31 * result + (codigo2 != null ? codigo2.hashCode() : 0);
        result = 31 * result + (supervisor != null ? supervisor.hashCode() : 0);
        result = 31 * result + (telCodigoArea != null ? telCodigoArea.hashCode() : 0);
        result = 31 * result + (telCodigoRegion != null ? telCodigoRegion.hashCode() : 0);
        result = 31 * result + (otroTelefono != null ? otroTelefono.hashCode() : 0);
        result = 31 * result + (provincia != null ? provincia.hashCode() : 0);
        result = 31 * result + (esAdministracionCartera ? 1 : 0);
        result = 31 * result + (codigo3 != null ? codigo3.hashCode() : 0);
        result = 31 * result + empresa;
        result = 31 * result + (lat != null ? lat.hashCode() : 0);
        result = 31 * result + (lon != null ? lon.hashCode() : 0);
        result = 31 * result + (codigoRepOrg != null ? codigoRepOrg.hashCode() : 0);
        result = 31 * result + (codigoSep != null ? codigoSep.hashCode() : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }


    public Sucursal getSucursalByIdSucursal() {
        return sucursalByIdSucursal;
    }

    public void setSucursalByIdSucursal(Sucursal sucursalByIdSucursal) {
        this.sucursalByIdSucursal = sucursalByIdSucursal;
    }


    public TipoOficina getTipoOficinaByIdTipoOficina() {
        return tipoOficinaByIdTipoOficina;
    }

    public void setTipoOficinaByIdTipoOficina(TipoOficina tipoOficinaByIdTipoOficina) {
        this.tipoOficinaByIdTipoOficina = tipoOficinaByIdTipoOficina;
    }


    public Collection<Usuario> getUsuariosByIdOficina() {
        return usuariosByIdOficina;
    }

    public void setUsuariosByIdOficina(Collection<Usuario> usuariosByIdOficina) {
        this.usuariosByIdOficina = usuariosByIdOficina;
    }


    public Collection<UsuarioOficina> getUsuarioOficinasByIdOficina() {
        return usuarioOficinasByIdOficina;
    }

    public void setUsuarioOficinasByIdOficina(Collection<UsuarioOficina> usuarioOficinasByIdOficina) {
        this.usuarioOficinasByIdOficina = usuarioOficinasByIdOficina;
    }
}
