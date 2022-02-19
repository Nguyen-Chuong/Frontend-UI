package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface HotelRepository extends JpaRepository<Hotel, String> {

    // check date in, date out to make sure that room is available (not booked in this time)
    @Query(value = "select * from capstone.hotel where district_id =: districtId", nativeQuery = true)
    Page<Hotel> searchHotelByDistrict(
            @Param("districtId") int districtId,
            Pageable pageable);

}
