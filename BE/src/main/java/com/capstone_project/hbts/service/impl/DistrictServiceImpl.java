package com.capstone_project.hbts.service.impl;

import com.capstone_project.hbts.dto.Location.DistrictSearchDTO;
import com.capstone_project.hbts.repository.DistrictRepository;
import com.capstone_project.hbts.service.DistrictService;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Log4j2
public class DistrictServiceImpl implements DistrictService {

    private final DistrictRepository districtRepository;

    private final ModelMapper modelMapper;

    public DistrictServiceImpl(DistrictRepository districtRepository, ModelMapper modelMapper) {
        this.districtRepository = districtRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public List<DistrictSearchDTO> searchDistrict(String text) {
        log.info("Request to search district by text");
        return districtRepository.searchDistrict(text)
                .stream()
                .map(item -> modelMapper.map(item, DistrictSearchDTO.class))
                .collect(Collectors.toList());
    }

}
