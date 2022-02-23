package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomTypeRepository extends JpaRepository<RoomType, Integer> {

    @Query(value = "SELECT * FROM capstone.room_type where hotel_id = :hotelId", nativeQuery = true)
    List<RoomType> findRoomTypeByHotelId(@Param("hotelId") int hotelId);

}
