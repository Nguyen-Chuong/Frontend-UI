package com.capstone_project.hbts.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "hotel")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "address")
    private String address;
    @Column(name = "avatar")
    private String avatar;
    @Column(name = "description")
    private String description;
    @Column(name = "lowest_price")
    private BigDecimal lowestPrice;
    @Column(name = "status")
    private int status;
    @ManyToOne
    @JoinColumn(name = "district_id")
    private District district;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hotel")
    private Set<UserBooking> listUserBooking = new HashSet<UserBooking>();
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hotel")
    private Set<RoomType> listRoomType = new HashSet<RoomType>();
}
