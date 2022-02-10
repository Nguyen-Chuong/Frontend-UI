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
@Table(name = "facility")
public class Facility {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name_facility")
    private String name;

    @ManyToOne
    @JoinColumn(name = "facility")
    private FacilityType facility;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "facility")
    private Set<RoomFacility> listRoomFacility = new HashSet<RoomFacility>();

}
