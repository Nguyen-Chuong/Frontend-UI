package com.capstone_project.hbts.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@Entity
@Table(name = "room_facility")
public class RoomFacility {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JoinColumn(name = "room_type_id")
    private RoomType roomType;
    @ManyToOne
    @JoinColumn(name = "facility_id")
    private Facility facility;
}
