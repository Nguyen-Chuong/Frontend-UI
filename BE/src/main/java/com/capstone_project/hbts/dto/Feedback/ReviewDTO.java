package com.capstone_project.hbts.dto.Feedback;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewDTO {

    private Integer id;

    private float service;

    private float valueForMoney;

    private String reviewTitle;

    private String reviewDetail;

    private float cleanliness;

    private float location;

    private float facilities;

    private int review;

}
