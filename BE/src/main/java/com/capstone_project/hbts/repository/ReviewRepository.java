package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {

    @Query(value = "select * from capstone.review where user_booking_id in :userBookingIds", nativeQuery = true)
    Page<Review> loadReviewByBookingId(
            @Param("userBookingIds") ArrayList<Integer> userBookingIds,
            Pageable pageable);

}
