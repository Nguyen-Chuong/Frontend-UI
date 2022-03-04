package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    @Modifying
    @Query(value = "insert into capstone.feedback(type, sender_id, message, modify_date) " +
            "values (:type, :senderId, :message, :modifyDate);",
            nativeQuery = true)
    void sendFeedback(
            @Param("type") int type,
            @Param("senderId") int senderId,
            @Param("message") String message,
            @Param("modifyDate") Timestamp modifyDate);

}
