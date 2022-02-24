package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.UserBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<UserBooking, Integer> {

    @Query(value = "SELECT * from capstone.user_booking WHERE user_id = :userId", nativeQuery = true)
    List<UserBooking> findAllByUserId(@Param("userId") int userId);

    @Query(value = "SELECT * from capstone.user_booking WHERE review_status = :reviewStatus", nativeQuery = true)
    List<UserBooking> findBookingsReview(@Param("reviewStatus") int reviewStatus);

    @Query(value = "SELECT * from capstone.user_booking WHERE hotel_id = :hotelId", nativeQuery = true)
    List<UserBooking> findUserBookingByHotelId(@Param("hotelId") int hotelId);

    // status user booking: cancelled, completed, when check vip status, only get number of booking that
    // have been completed, conditionally status = 1 for completed, may change later
    @Query(value = "SELECT count(id) from capstone.user_booking WHERE user_id = :userId and status = 1", nativeQuery = true)
    int numberBookingCompleted(@Param("userId") int userId);

}
