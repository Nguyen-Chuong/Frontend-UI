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
@Table(name = "city")
public class City {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCity;

    @Column(name = "name",unique = true)
    @NotNull
    private String nameCity;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cityFK")
    private Set<District> listDistrict = new HashSet<District>();

}
