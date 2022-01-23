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
@Table(name = "facility")
public class Facility {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFacility;

    @Column(name = "name_facility")
    private String name;

    @ManyToOne
    @JoinColumn(name = "facility")
    private FacilityType facility;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "facility")
    private Set<RoomFacility> listRoomFacility = new HashSet<RoomFacility>();

}
