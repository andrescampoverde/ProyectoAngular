package ec.org.isspol.entities.security;


import java.io.Serializable;
import java.sql.Timestamp;


public class HorarioDetalle implements Serializable {
    private int idHorarioDetalle;
    //private int idHorario;
    private byte dia;
    private Timestamp desde;
    private Timestamp hasta;
    private boolean permitido;
    private String creacionUsuario;
    private Timestamp creacionFecha;
    private String modificaUsuario;
    private Timestamp modificaFecha;
    private Horario horarioByIdHorario;

    public int getIdHorarioDetalle() {
        return idHorarioDetalle;
    }

    public void setIdHorarioDetalle(int idHorarioDetalle) {
        this.idHorarioDetalle = idHorarioDetalle;
    }

    public byte getDia() {
        return dia;
    }

    public void setDia(byte dia) {
        this.dia = dia;
    }

    public Timestamp getDesde() {
        return desde;
    }

    public void setDesde(Timestamp desde) {
        this.desde = desde;
    }

    public Timestamp getHasta() {
        return hasta;
    }

    public void setHasta(Timestamp hasta) {
        this.hasta = hasta;
    }

    public boolean isPermitido() {
        return permitido;
    }

    public void setPermitido(boolean permitido) {
        this.permitido = permitido;
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

    public Horario getHorarioByIdHorario() {
        return horarioByIdHorario;
    }

    public void setHorarioByIdHorario(Horario horarioByIdHorario) {
        this.horarioByIdHorario = horarioByIdHorario;
    }
}
