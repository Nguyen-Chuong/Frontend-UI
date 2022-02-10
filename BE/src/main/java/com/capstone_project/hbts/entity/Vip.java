package com.capstone_project.hbts.entity;

import lombok.*;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Vip")
public class Vip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name_vip")
    private String nameVip;

    @Column(name = "range_start")
    private BigDecimal rangeStart;

    @Column(name = "range_end")
    private BigDecimal rangeEnd;

    @Column(name = "discount")
    private int discount;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "idVip")
    private Set<Users> listUsers = new HashSet<Users>();

}
