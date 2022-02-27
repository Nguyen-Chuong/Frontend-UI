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
import java.sql.Timestamp;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "user_booking")
public class UserBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "checkIn")
    private Timestamp checkIn;

    @Column(name = "checkOut")
    private Timestamp checkOut;

    @Column(name = "status")
    private int status;

    @Column(name = "review_status")
    private int reviewStatus;

    @Column(name = "booking_date")
    private Timestamp bookingDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userBooking_id")
    private Set<Review> listReview;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userBooking")
    private Set<UserBookingDetail> listUserBookingDetail;

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "hotelId")
    private Hotel hotel;

}
