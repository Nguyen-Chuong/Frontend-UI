package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.entity.Facility;
import com.capstone_project.hbts.entity.RoomFacility;
import com.capstone_project.hbts.entity.RoomType;
import com.capstone_project.hbts.repository.RoomFacilityRepository;
import com.capstone_project.hbts.request.FacilityRequest;
import com.capstone_project.hbts.service.RoomFacilityService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class RoomFacilityServiceImpl implements RoomFacilityService {

    private final RoomFacilityRepository roomFacilityRepository;

    public RoomFacilityServiceImpl(RoomFacilityRepository roomFacilityRepository) {
        this.roomFacilityRepository = roomFacilityRepository;
    }

    @Override
    public void addListFacilityToRoomType(FacilityRequest facilityRequest) {
        log.info("Request to add list facility to room type");
        List<RoomFacility> roomFacilityList = new ArrayList<>();
        for(int i = 0 ; i < facilityRequest.getFacilityIds().size(); i++){
            // create a new room facility to save
            RoomFacility roomFacility = new RoomFacility();
            // create new room type and set id
            RoomType roomType = new RoomType();
            roomType.setId(facilityRequest.getRoomTypeId());
            // create new facility and set id
            Facility facility = new Facility();
            facility.setId(facilityRequest.getFacilityIds().get(i));
            // set prop for room facility
            roomFacility.setFacility(facility);
            roomFacility.setRoomType(roomType);
            // add them to list
            roomFacilityList.add(roomFacility);
        }
        // batch processing with max size 10
        roomFacilityRepository.saveAll(roomFacilityList);
    }

}
