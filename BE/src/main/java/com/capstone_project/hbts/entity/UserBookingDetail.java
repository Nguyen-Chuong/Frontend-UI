package com.capstone_project.hbts.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@Entity
@Table(name = "UserBookingDetail")
public class UserBookingDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "paid")
    private BigDecimal paid;
    @ManyToOne
    @JoinColumn(name = "booking_id")
    private UserBooking userBooking;
    @ManyToOne
    @JoinColumn(name = "room_type_id")
    private RoomType roomType;

}
