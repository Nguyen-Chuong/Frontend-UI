package com.capstone_project.hbts.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
public class UserBookingDTO {

    private Integer id;

    private Timestamp bookDate;

    private int status;

    private int reviewStatus;

    private List<ReviewDTO> listReview;

    private List<UserBookingDetailDTO> listUserBookingDetail;

}
