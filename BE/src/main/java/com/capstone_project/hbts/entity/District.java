package com.capstone_project.hbts.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "district")
public class District {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idDistrict;

    @Column(name = "name_district",unique = true)
    @NotNull
    private String nameDistrict;

    @ManyToOne
    @JoinColumn(name = "cityId")
    private City cityFK;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "district")
    private Set<Hotel> listHotel = new HashSet<Hotel>();

}
