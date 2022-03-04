package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DistrictRepository extends JpaRepository<District, Integer> {

    @Query(value = "SELECT * from capstone.district WHERE name_district like lower(concat('%',:text,'%')) ",
            nativeQuery = true)
    List<District> searchDistrict(@Param("text") String text);


}
