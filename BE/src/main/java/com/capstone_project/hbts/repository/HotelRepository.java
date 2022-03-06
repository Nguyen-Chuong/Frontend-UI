package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Integer> {

    @Query(value = "select * from capstone.hotel where district_id = :districtId", nativeQuery = true)
    Page<Hotel> searchHotelByDistrict(
            @Param("districtId") int districtId,
            Pageable pageable);

    Page<Hotel> findAllByStatus(int status, Pageable pageable);

    @Query(value = "select * from capstone.hotel where id = :id limit 1", nativeQuery = true)
    Hotel getHotelById(@Param("id") int id);

    @Query(value = "select * from capstone.hotel", nativeQuery = true)
    Page<Hotel> findAllHotel(Pageable pageable);

    @Modifying
    @Query(value = "UPDATE capstone.hotel set status = 4 WHERE id = :hotelId",
            nativeQuery = true)
    void banHotelById(@Param("hotelId") int hotelId);

    @Modifying
    @Query(value = "UPDATE capstone.hotel set status = 4 WHERE provider_id = :providerId",
            nativeQuery = true)
    void banHotelByProviderId(@Param("providerId") int providerId);

}
