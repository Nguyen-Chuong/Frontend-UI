package com.capstone_project.hbts.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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
