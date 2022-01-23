package com.capstone_project.hbts.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@Entity
@Table(name = "image")
public class Image {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "src")
    private String src;

    @ManyToOne
    @JoinColumn(name = "room_type_id")
    private RoomType roomType;

}
