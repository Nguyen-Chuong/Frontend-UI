package com.capstone_project.hbts.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "district")
public class District {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name_district")
    @NotNull
    private String nameDistrict;

    @ManyToOne
    @JoinColumn(name = "cityId")
    private City cityFK;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "district")
    private Set<Hotel> listHotel = new HashSet<Hotel>();

}
