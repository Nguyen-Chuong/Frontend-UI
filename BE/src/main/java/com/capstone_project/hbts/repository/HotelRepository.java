package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;

public interface HotelRepository extends JpaRepository<Hotel, String> {

    // check date in, date out to make sure that room is available (not booked in this time),
    // consider a new table db/ modify
    @Query(value = "=: district_id", nativeQuery = true)
    Page<Hotel> searchHotel(
            @Param("districtId") int districtId,
            @Param("dateIn") Date dateIn,
            @Param("dateOut") Date dateOut,
            @Param("numberOfPeople") int numberOfPeople,
            // number room available, if required more -> won't allow & return
            @Param("numberOfRoom") int numberOfRoom,
            Pageable pageable);

}
