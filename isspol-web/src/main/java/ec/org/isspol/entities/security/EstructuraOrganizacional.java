package ec.org.isspol.entities.security;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Collection;


public class EstructuraOrganizacional implements Serializable {
    private int idEstructuraOrganizacional;
    private Integer idEstructura;
    private String codigo;
    private String codigoAlterno;
    private String descripcion;
    private int orden;
    //private int idNivelEstrcuturaOrg;
    private Integer nivel;
    //private Integer idEstructuraPadre;
    private String estado;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private NivelEstructuraOrg nivelEstructuraOrgByIdNivelEstrcuturaOrg;
    private EstructuraOrganizacional estructuraOrganizacionalByIdEstructuraPadre;
    private Collection<EstructuraOrganizacional> estructuraOrganizacionalsByIdEstructuraOrganizacional;
    private Collection<Usuario> usuariosByIdEstructuraOrganizacional;


    public int getIdEstructuraOrganizacional() {
        return idEstructuraOrganizacional;
    }

    public void setIdEstructuraOrganizacional(int idEstructuraOrganizacional) {
        this.idEstructuraOrganizacional = idEstructuraOrganizacional;
    }


    public Integer getIdEstructura() {
        return idEstructura;
    }

    public void setIdEstructura(Integer idEstructura) {
        this.idEstructura = idEstructura;
    }


    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getCodigoAlterno() {
        return codigoAlterno;
    }

    public void setCodigoAlterno(String codigoAlterno) {
        this.codigoAlterno = codigoAlterno;
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



    public Integer getNivel() {
        return nivel;
    }

    public void setNivel(Integer nivel) {
        this.nivel = nivel;
    }


    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
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
        int result = idEstructuraOrganizacional;
        result = 31 * result + (idEstructura != null ? idEstructura.hashCode() : 0);
        result = 31 * result + (codigo != null ? codigo.hashCode() : 0);
        result = 31 * result + (codigoAlterno != null ? codigoAlterno.hashCode() : 0);
        result = 31 * result + (descripcion != null ? descripcion.hashCode() : 0);
        result = 31 * result + orden;
        //result = 31 * result + idNivelEstrcuturaOrg;
        result = 31 * result + (nivel != null ? nivel.hashCode() : 0);
        //result = 31 * result + (idEstructuraPadre != null ? idEstructuraPadre.hashCode() : 0);
        result = 31 * result + (estado != null ? estado.hashCode() : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }

    public NivelEstructuraOrg getNivelEstructuraOrgByIdNivelEstrcuturaOrg() {
        return nivelEstructuraOrgByIdNivelEstrcuturaOrg;
    }

    public void setNivelEstructuraOrgByIdNivelEstrcuturaOrg(NivelEstructuraOrg nivelEstructuraOrgByIdNivelEstrcuturaOrg) {
        this.nivelEstructuraOrgByIdNivelEstrcuturaOrg = nivelEstructuraOrgByIdNivelEstrcuturaOrg;
    }

      public EstructuraOrganizacional getEstructuraOrganizacionalByIdEstructuraPadre() {
        return estructuraOrganizacionalByIdEstructuraPadre;
    }

    public void setEstructuraOrganizacionalByIdEstructuraPadre(EstructuraOrganizacional estructuraOrganizacionalByIdEstructuraPadre) {
        this.estructuraOrganizacionalByIdEstructuraPadre = estructuraOrganizacionalByIdEstructuraPadre;
    }

      public Collection<EstructuraOrganizacional> getEstructuraOrganizacionalsByIdEstructuraOrganizacional() {
        return estructuraOrganizacionalsByIdEstructuraOrganizacional;
    }

    public void setEstructuraOrganizacionalsByIdEstructuraOrganizacional(Collection<EstructuraOrganizacional> estructuraOrganizacionalsByIdEstructuraOrganizacional) {
        this.estructuraOrganizacionalsByIdEstructuraOrganizacional = estructuraOrganizacionalsByIdEstructuraOrganizacional;
    }


    public Collection<Usuario> getUsuariosByIdEstructuraOrganizacional() {
        return usuariosByIdEstructuraOrganizacional;
    }

    public void setUsuariosByIdEstructuraOrganizacional(Collection<Usuario> usuariosByIdEstructuraOrganizacional) {
        this.usuariosByIdEstructuraOrganizacional = usuariosByIdEstructuraOrganizacional;
    }
}
