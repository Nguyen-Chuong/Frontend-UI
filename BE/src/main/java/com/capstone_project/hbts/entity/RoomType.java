package com.capstone_project.hbts.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "RoomType")
public class RoomType {
    @Id
    @NotNull
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "number_of_people")
    private int numberOfPeople;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "availableRooms")
    private int availableRooms;

    @Column(name = "dealPercentage")
    private int dealPercentage;

    @Column(name = "dealExpire")
    private Timestamp dealExpire;

    @ManyToOne
    @JoinColumn(name = "hotelId")
    private Hotel hotel;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "roomType")
    private Set<UserBookingDetail> listUserBookingDetail = new HashSet<UserBookingDetail>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "roomType")
    private Set<Image> listImage = new HashSet<Image>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "roomType")
    private Set<RoomFacility> listRoomFacility = new HashSet<RoomFacility>();

}
