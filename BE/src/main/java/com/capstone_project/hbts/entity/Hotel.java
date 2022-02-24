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
import java.math.BigDecimal;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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
    private Set<UserBooking> listUserBooking;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "hotel")
    private Set<RoomType> listRoomType;

    @ManyToOne
    @JoinColumn(name = "provider_id", nullable = false)
    private Provider provider;

}
