package com.capstone_project.hbts.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user_booking")
public class UserBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "bookDate")
    private Timestamp bookDate;

    @Column(name = "status")
    private int status;

    @Column(name = "review_status")
    private int reviewStatus;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "review")
    private Set<Review> listReview = new HashSet<Review>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "userBooking")
    private Set<UserBookingDetail> listUserBookingDetail = new HashSet<UserBookingDetail>();

    @ManyToOne
    @JoinColumn(name = "userId")
    private Users users;

    @ManyToOne
    @JoinColumn(name = "hotelId")
    private Hotel hotel;

}