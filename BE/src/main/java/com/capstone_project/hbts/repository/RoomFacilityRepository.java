package com.capstone_project.hbts.repository;

import com.capstone_project.hbts.entity.RoomFacility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomFacilityRepository extends JpaRepository<RoomFacility, Integer> {

}
