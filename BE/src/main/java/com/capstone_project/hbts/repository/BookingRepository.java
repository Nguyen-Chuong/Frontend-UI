package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.UserBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<UserBooking, String> {

    @Query(value = "SELECT * from capstone.user_booking WHERE user_id = :userId", nativeQuery = true)
    List<UserBooking> findAllByUserId(@Param("userId") int userId);

}
