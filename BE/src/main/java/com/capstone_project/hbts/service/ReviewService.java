package com.capstone_project.hbts.service;

import com.capstone_project.hbts.dto.ReviewDTO;
import com.capstone_project.hbts.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService {
    /**
     * Load Review by hotelId
     * @param hotelId
     * @param pageable
     */
    Page<ReviewDTO> loadReview(int hotelId, Pageable pageable);
}
