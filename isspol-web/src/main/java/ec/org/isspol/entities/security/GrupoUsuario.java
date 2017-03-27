package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Created by mauchilan on 20/3/17.
 */
public class GrupoUsuario implements Serializable {
    private int idGrupoUsuario;
    //private Integer idUsuario;
    private String usuario;
    //private String grupo;
    private String estado;
    private boolean tieneVenc;
    private Timestamp fechaVenc;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Usuario usuarioByIdUsuario;
    private Grupo grupoByGrupo;

    public int getIdGrupoUsuario() {
        return idGrupoUsuario;
    }

    public void setIdGrupoUsuario(int idGrupoUsuario) {
        this.idGrupoUsuario = idGrupoUsuario;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public boolean isTieneVenc() {
        return tieneVenc;
    }

    public void setTieneVenc(boolean tieneVenc) {
        this.tieneVenc = tieneVenc;
    }

    public Timestamp getFechaVenc() {
        return fechaVenc;
    }

    public void setFechaVenc(Timestamp fechaVenc) {
        this.fechaVenc = fechaVenc;
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

    public Usuario getUsuarioByIdUsuario() {
        return usuarioByIdUsuario;
    }

    public void setUsuarioByIdUsuario(Usuario usuarioByIdUsuario) {
        this.usuarioByIdUsuario = usuarioByIdUsuario;
    }

    public Grupo getGrupoByGrupo() {
        return grupoByGrupo;
    }

    public void setGrupoByGrupo(Grupo grupoByGrupo) {
        this.grupoByGrupo = grupoByGrupo;
    }
}
