package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface ResponseRepository extends JpaRepository<Response, Integer> {

    @Modifying
    @Query(value = "insert into capstone.response(type, sender_id, message, modify_date, is_completed) " +
            "values (:type, :senderId, :message, :modifyDate, :isCompleted);",
            nativeQuery = true)
    void sendFeedback(
            @Param("type") int type,
            @Param("senderId") int senderId,
            @Param("message") String message,
            @Param("modifyDate") Timestamp modifyDate,
            @Param("isCompleted") int isCompleted);

}
