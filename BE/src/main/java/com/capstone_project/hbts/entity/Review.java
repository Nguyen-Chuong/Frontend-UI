package com.capstone_project.hbts.entity;

import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "service")
    private float service;

    @Column(name = "value_money")
    private float valueForMoney;

    @Column(name = "review_title")
    private String reviewTitle;

    @Column(name = "review_detail")
    private String reviewDetail;

    @Column(name = "cleanliness")
    private float cleanliness;

    @Column(name = "location")
    private float location;

    @Column(name = "facilities")
    private float facilities;

    @ManyToOne
    @JoinColumn(name = "userBooking_Id")
    private UserBooking userBooking_id;

}

