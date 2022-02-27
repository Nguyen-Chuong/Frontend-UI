package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.UserBookingDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBookingDetailRepository extends JpaRepository<UserBookingDetail, Integer> {

    // select when user click to view detail of a booking

}
