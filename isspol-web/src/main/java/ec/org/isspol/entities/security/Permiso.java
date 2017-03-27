package ec.org.isspol.entities.security;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by mauchilan on 20/3/17.
 */
@Entity
public class Permiso implements Serializable {
    private int idPermiso;
    private String tipo;
    //private String grupo;
    //private Integer idUsuario;
    private String usuario;
    //private Integer idProceso;
    private Integer proceso;
    //private Integer idOpcion;
    private Integer opcion;
    private boolean permiso;
    private String estado;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Grupo grupoByGrupo;
    private Usuario usuarioByIdUsuario;
    private Proceso procesoByIdProceso;
    private Opcion opcionByIdOpcion;

    @Id
    @Column(name = "IdPermiso", nullable = false)
    public int getIdPermiso() {
        return idPermiso;
    }

    public void setIdPermiso(int idPermiso) {
        this.idPermiso = idPermiso;
    }

    @Basic
    @Column(name = "Tipo", nullable = false, length = -1)
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    /*@Basic
    @Column(name = "Grupo", nullable = true, length = 3)
    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }*/

    /*@Basic
    @Column(name = "IdUsuario", nullable = true)
    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }*/

    @Basic
    @Column(name = "Usuario", nullable = true, length = 15)
    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    /*@Basic
    @Column(name = "IdProceso", nullable = true)
    public Integer getIdProceso() {
        return idProceso;
    }

    public void setIdProceso(Integer idProceso) {
        this.idProceso = idProceso;
    }*/

    @Basic
    @Column(name = "Proceso", nullable = true)
    public Integer getProceso() {
        return proceso;
    }

    public void setProceso(Integer proceso) {
        this.proceso = proceso;
    }

    /*@Basic
    @Column(name = "IdOpcion", nullable = true)
    public Integer getIdOpcion() {
        return idOpcion;
    }

    public void setIdOpcion(Integer idOpcion) {
        this.idOpcion = idOpcion;
    }*/

    @Basic
    @Column(name = "Opcion", nullable = true)
    public Integer getOpcion() {
        return opcion;
    }

    public void setOpcion(Integer opcion) {
        this.opcion = opcion;
    }

    @Basic
    @Column(name = "Permiso", nullable = false)
    public boolean isPermiso() {
        return permiso;
    }

    public void setPermiso(boolean permiso) {
        this.permiso = permiso;
    }

    @Basic
    @Column(name = "Estado", nullable = false, length = -1)
    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Basic
    @Column(name = "CreacionUsuario", nullable = true, length = 15)
    public String getCreacionUsuario() {
        return creacionUsuario;
    }

    public void setCreacionUsuario(String creacionUsuario) {
        this.creacionUsuario = creacionUsuario;
    }

    @Basic
    @Column(name = "CreacionFecha", nullable = true)
    public Timestamp getCreacionFecha() {
        return creacionFecha;
    }

    public void setCreacionFecha(Timestamp creacionFecha) {
        this.creacionFecha = creacionFecha;
    }

    @Basic
    @Column(name = "ModificaUsuario", nullable = true, length = 15)
    public String getModificaUsuario() {
        return modificaUsuario;
    }

    public void setModificaUsuario(String modificaUsuario) {
        this.modificaUsuario = modificaUsuario;
    }

    @Basic
    @Column(name = "ModificaFecha", nullable = true)
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

        Permiso permiso1 = (Permiso) o;

        if (idPermiso != permiso1.idPermiso) return false;
        if (permiso != permiso1.permiso) return false;
        if (tipo != null ? !tipo.equals(permiso1.tipo) : permiso1.tipo != null) return false;
        //if (grupo != null ? !grupo.equals(permiso1.grupo) : permiso1.grupo != null) return false;
        //if (idUsuario != null ? !idUsuario.equals(permiso1.idUsuario) : permiso1.idUsuario != null) return false;
        if (usuario != null ? !usuario.equals(permiso1.usuario) : permiso1.usuario != null) return false;
        //if (idProceso != null ? !idProceso.equals(permiso1.idProceso) : permiso1.idProceso != null) return false;
        if (proceso != null ? !proceso.equals(permiso1.proceso) : permiso1.proceso != null) return false;
        //if (idOpcion != null ? !idOpcion.equals(permiso1.idOpcion) : permiso1.idOpcion != null) return false;
        if (opcion != null ? !opcion.equals(permiso1.opcion) : permiso1.opcion != null) return false;
        if (estado != null ? !estado.equals(permiso1.estado) : permiso1.estado != null) return false;
        if (creacionUsuario != null ? !creacionUsuario.equals(permiso1.creacionUsuario) : permiso1.creacionUsuario != null)
            return false;
        if (creacionFecha != null ? !creacionFecha.equals(permiso1.creacionFecha) : permiso1.creacionFecha != null)
            return false;
        if (modificaUsuario != null ? !modificaUsuario.equals(permiso1.modificaUsuario) : permiso1.modificaUsuario != null)
            return false;
        if (modificaFecha != null ? !modificaFecha.equals(permiso1.modificaFecha) : permiso1.modificaFecha != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idPermiso;
        result = 31 * result + (tipo != null ? tipo.hashCode() : 0);
        //result = 31 * result + (grupo != null ? grupo.hashCode() : 0);
        //result = 31 * result + (idUsuario != null ? idUsuario.hashCode() : 0);
        result = 31 * result + (usuario != null ? usuario.hashCode() : 0);
        //result = 31 * result + (idProceso != null ? idProceso.hashCode() : 0);
        result = 31 * result + (proceso != null ? proceso.hashCode() : 0);
        //result = 31 * result + (idOpcion != null ? idOpcion.hashCode() : 0);
        result = 31 * result + (opcion != null ? opcion.hashCode() : 0);
        result = 31 * result + (permiso ? 1 : 0);
        result = 31 * result + (estado != null ? estado.hashCode() : 0);
        result = 31 * result + (creacionUsuario != null ? creacionUsuario.hashCode() : 0);
        result = 31 * result + (creacionFecha != null ? creacionFecha.hashCode() : 0);
        result = 31 * result + (modificaUsuario != null ? modificaUsuario.hashCode() : 0);
        result = 31 * result + (modificaFecha != null ? modificaFecha.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "Grupo", referencedColumnName = "Grupo")
    public Grupo getGrupoByGrupo() {
        return grupoByGrupo;
    }

    public void setGrupoByGrupo(Grupo grupoByGrupo) {
        this.grupoByGrupo = grupoByGrupo;
    }

    @ManyToOne
    @JoinColumn(name = "IdUsuario", referencedColumnName = "IdUsuario")
    public Usuario getUsuarioByIdUsuario() {
        return usuarioByIdUsuario;
    }

    public void setUsuarioByIdUsuario(Usuario usuarioByIdUsuario) {
        this.usuarioByIdUsuario = usuarioByIdUsuario;
    }

    @ManyToOne
    @JoinColumn(name = "IdProceso", referencedColumnName = "IdProceso")
    public Proceso getProcesoByIdProceso() {
        return procesoByIdProceso;
    }

    public void setProcesoByIdProceso(Proceso procesoByIdProceso) {
        this.procesoByIdProceso = procesoByIdProceso;
    }

    @ManyToOne
    @JoinColumn(name = "IdOpcion", referencedColumnName = "IdOpcion")
    public Opcion getOpcionByIdOpcion() {
        return opcionByIdOpcion;
    }

    public void setOpcionByIdOpcion(Opcion opcionByIdOpcion) {
        this.opcionByIdOpcion = opcionByIdOpcion;
    }
}
