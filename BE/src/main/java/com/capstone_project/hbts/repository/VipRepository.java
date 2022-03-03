package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.Vip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;

@Repository
public interface VipRepository extends JpaRepository<Vip, Integer> {

    @Modifying
    @Query(value = "UPDATE capstone.vip SET discount = :discount, range_start = :rangeStart, range_end = :rangeEnd " +
            " WHERE capstone.vip.id = :id",
            nativeQuery = true)
    void updateVipClass(
            @Param("discount") int discount,
            @Param("rangeStart") BigDecimal rangeStart,
            @Param("rangeEnd") BigDecimal rangeEnd,
            @Param("id") Integer id);

}
