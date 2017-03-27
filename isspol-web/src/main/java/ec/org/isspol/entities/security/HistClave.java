package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Arrays;

/**
 * Created by mauchilan on 20/3/17.
 */
public class HistClave implements Serializable {
    private int idHistClave;
    private String usuario;
    private byte[] clave;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private Usuario usuarioByIdUsuario;

    public int getIdHistClave() {
        return idHistClave;
    }

    public void setIdHistClave(int idHistClave) {
        this.idHistClave = idHistClave;
    }

    /*@Basic
    @Column(name = "IdUsuario", nullable = true)
    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }*/

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public byte[] getClave() {
        return clave;
    }

    public void setClave(byte[] clave) {
        this.clave = clave;
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

    public Usuario getUsuarioByIdUsuario() {
        return usuarioByIdUsuario;
    }

    public void setUsuarioByIdUsuario(Usuario usuarioByIdUsuario) {
        this.usuarioByIdUsuario = usuarioByIdUsuario;
    }
}
