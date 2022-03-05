package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.Report.ReviewDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ReviewService {

    /**
     * Load Review by hotelId
     * @param hotelId
     * @param pageable
     */
    Page<ReviewDTO> loadReview(int hotelId, Pageable pageable);

}
