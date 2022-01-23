package com.capstone_project.hbts.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "Vip")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idU;

    @Column(name = "username" , unique = true)
    @Size(max = 30)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "firstname")
    private String firstname;

    @Column(name = "lastname")
    private String lastname;

    @Column(name = "email", unique = true)
    @Email
    @Size(min = 5, max = 50, message = "{casa.nomatch.size}")
    private String email;

    @Column(name = "phone")
    @Size(min = 5, max = 20, message = "{casa.nomatch.size}")
    @Pattern(regexp = "(09|03|01|05|08)+([0-9]{7,10})\\b")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "type")
    private int type;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "spend")
    private BigDecimal spend;

    @ManyToOne
    @JoinColumn(name = "id_vip")
    private Vip idVip;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "users")
    private Set<UserBooking> listUserBooking = new HashSet<UserBooking>() ;
}
