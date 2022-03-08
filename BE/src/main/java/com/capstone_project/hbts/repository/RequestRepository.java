package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface RequestRepository extends JpaRepository<Request, Integer> {

    @Modifying
    @Query(value = "insert into capstone.request(request_date, status, hotel_id, provider_id) " +
            "values (:requestDate, :status, :hotelId, :providerId)",
            nativeQuery = true)
    void addNewRequest(
            @Param("requestDate") Timestamp requestDate,
            @Param("status") int status,
            @Param("hotelId") int hotelId,
            @Param("providerId") int providerId);

}
