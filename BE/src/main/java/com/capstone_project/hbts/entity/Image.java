package com.capstone_project.hbts.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
