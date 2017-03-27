package ec.org.isspol.entities.security;


import java.io.Serializable;

/**
 * Created by mauchilan on 20/3/17.
 */

public class Favorito implements Serializable {
    private int idFavorito;
    private Integer idUsuario;
    //private Integer idOpcion;
    private String usuario;
    private int opcion;
    private Opcion opcionByIdOpcion;

    public int getIdFavorito() {
        return idFavorito;
    }

    public void setIdFavorito(int idFavorito) {
        this.idFavorito = idFavorito;
    }

    public Integer getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Integer idUsuario) {
        this.idUsuario = idUsuario;
    }

   public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public int getOpcion() {
        return opcion;
    }

    public void setOpcion(int opcion) {
        this.opcion = opcion;
    }


    public Opcion getOpcionByIdOpcion() {
        return opcionByIdOpcion;
    }

    public void setOpcionByIdOpcion(Opcion opcionByIdOpcion) {
        this.opcionByIdOpcion = opcionByIdOpcion;
    }
}
