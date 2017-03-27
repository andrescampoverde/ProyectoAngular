package ec.org.isspol.entities.security;


import java.io.Serializable;

/**
 * Created by mauchilan on 20/3/17.
 */

public class GrupoModuloPK implements Serializable {

    private int idGrupoModulo;
    private int idModulo;

    public int getIdGrupoModulo() {
        return idGrupoModulo;
    }

    public void setIdGrupoModulo(int idGrupoModulo) {
        this.idGrupoModulo = idGrupoModulo;
    }

    public int getIdModulo() {
        return idModulo;
    }

    public void setIdModulo(int idModulo) {
        this.idModulo = idModulo;
    }

}
