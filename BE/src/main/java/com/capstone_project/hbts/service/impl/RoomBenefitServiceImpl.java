package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.entity.Benefit;
import com.capstone_project.hbts.entity.RoomBenefit;
import com.capstone_project.hbts.entity.RoomType;
import com.capstone_project.hbts.repository.RoomBenefitRepository;
import com.capstone_project.hbts.request.BenefitRequest;
import com.capstone_project.hbts.service.RoomBenefitService;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Log4j2
public class RoomBenefitServiceImpl implements RoomBenefitService {

    private final RoomBenefitRepository roomBenefitRepository;

    public RoomBenefitServiceImpl(RoomBenefitRepository roomBenefitRepository) {
        this.roomBenefitRepository = roomBenefitRepository;
    }

    @Override
    public void addListBenefitToRoomType(BenefitRequest benefitRequest) {
        log.info("Request to add list benefit to room type");
        List<RoomBenefit> roomBenefitList = new ArrayList<>();
        for(int i = 0 ; i < benefitRequest.getBenefitIds().size(); i++){
            // create a new room benefit to save
            RoomBenefit roomBenefit = new RoomBenefit();
            // create new room type and set id
            RoomType roomType = new RoomType();
            roomType.setId(benefitRequest.getRoomTypeId());
            // create new benefit and set id
            Benefit benefit = new Benefit();
            benefit.setId(benefitRequest.getBenefitIds().get(i));
            // set prop for room benefit
            roomBenefit.setBenefit(benefit);
            roomBenefit.setRoomType(roomType);
            // add them to list
            roomBenefitList.add(roomBenefit);
        }
        // batch processing with max size 10
        roomBenefitRepository.saveAll(roomBenefitList);
    }

}
