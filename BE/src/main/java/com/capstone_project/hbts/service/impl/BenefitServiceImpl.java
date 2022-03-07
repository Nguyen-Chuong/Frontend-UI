package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.Benefit.BenefitDTO;
import com.capstone_project.hbts.entity.Benefit;
import com.capstone_project.hbts.entity.RoomType;
import com.capstone_project.hbts.repository.BenefitRepository;
import com.capstone_project.hbts.repository.HotelRepository;
import com.capstone_project.hbts.service.BenefitService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Log4j2
public class BenefitServiceImpl implements BenefitService {

    private final HotelRepository hotelRepository;

    private final ModelMapper modelMapper;

    private final BenefitRepository benefitRepository;

    public BenefitServiceImpl(HotelRepository hotelRepository, ModelMapper modelMapper,
                              BenefitRepository benefitRepository) {
        this.hotelRepository = hotelRepository;
        this.modelMapper = modelMapper;
        this.benefitRepository = benefitRepository;
    }

    @Override
    public List<BenefitDTO> getListBenefitByHotelId(int hotelId) {
        log.info("Request to get all room's benefit by hotel id");
        // get set room type
        Set<RoomType> roomTypeSet = hotelRepository.getHotelById(hotelId).getListRoomType();
        // list benefit id from these room
        List<Integer> benefitId = new ArrayList<>();

        // add each item get benefitId into list benefit id
        for (RoomType roomType : roomTypeSet) {
            roomType.getListRoomBenefit().forEach(item -> benefitId.add(item.getBenefit().getId()));
        }
        // remove duplicate id from list id above
        List<Integer> benefitIdUnique = new ArrayList<>(new LinkedHashSet<>(benefitId));

        // get list benefit from list ids
        List<Benefit> benefitList = benefitRepository.findAllById(benefitIdUnique);

        return benefitList.stream()
                .map(item -> modelMapper.map(item, BenefitDTO.class))
                .collect(Collectors.toList());
    }

}
