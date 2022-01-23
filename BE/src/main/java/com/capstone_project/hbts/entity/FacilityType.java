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
@Table(name = "facility_type")
public class FacilityType {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name_facility_type")
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "facility")
    private Set<Facility> listFacility = new HashSet<Facility>();

}
